export default class Poster {
  constructor(options) {
      const { target, width, height,ratio=1 } = options;
      this.checkDom(target);
      this.target = target;
      this.width = width ? width : this.target.width;
      this.height = height ? height : this.target.height;
      this.ratio=ratio;
      this.initDom()
  }

  /**
   * 设置比例
   */
  initDom(){
      this.target.setAttribute('width',this.width*this.ratio);
      this.target.setAttribute('height',this.height*this.ratio);
  }
  /**
   * 判断是否是Dom元素
   * @param {*} dom  dom元素
   * @returns
   */
  isDom(dom) {
      return dom instanceof HTMLElement;
  }

  /**
   * 是否存在dom，不存在抛出错误
   * @param {dom} target  dom元素
   */
  checkDom(target) {
      if (!target || !this.isDom(target)) {
          throw new Error("canvas dom is not defind");
      }
  }

  /**
   *绘制矩形
   * @param {object} param
   */
  drawRect({ x = 0, y = 0, width, height, color = "#ffffff" }) {
      this.checkDom(this.target);
      const ctx = this.target.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(x*this.ratio, y*this.ratio, width*this.ratio, height*this.ratio);
  }

  /**
   *绘制线条
   * @param {object} param
   */
  drawLine({ startX = 0, startY, endX = 0, endY = 0, color = "#000" }) {
      this.checkDom(this.target);
      const ctx = this.target.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(startX*this.ratio, startY*this.ratio);
      ctx.lineTo(endX*this.ratio, endY*this.ratio);
      ctx.strokeStyle = color;
      ctx.stroke();
  }
  /**
   * 绘制多个文字
   * @param {array} list
   * @returns
   */
  drawTextList(list) {
      if (!Array.isArray(list)) {
          console.error("params is error");
          return;
      }
      list.forEach(item => {
          this.drawText(item);
      });
  }

  /**
   * 绘制文字
   * @param {Object} options
   */
  drawText(options) {
      const {
          value = "测试文字",
          x = 0,
          y = 0,
          color = "black",
          size = 16,
          fontFamily = "Arial"
      } = options;
      this.checkDom(this.target);
      const ctx = this.target.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.font = `${size}px ${fontFamily}`;
      ctx.fillText(value, x*this.ratio, y*this.ratio);
  }

  /**
   * 绘制单张图片
   * @param {path} imgData
   */
  async drawSingleImage(imgData) {
      this.checkDom(this.target);
      await this.drawImage(imgData);
      return true
  }

  /**
   * 绘制多张图片
   * @param {Array} imgDataList
   * @returns
   */
  async drawImageList(imgDataList, call) {
      this.checkDom(this.target);
      if (Array.isArray(imgDataList)) {
          const arr = [];
          imgDataList.forEach(item => {
              arr.push(this.drawImage(item));
          });
         return await Promise.all(arr)
          
      }
      return await this.drawImage(imgDataList, call);
  }

  /**
   * 画图
   * @param {Object} item
   * @returns
   */
  async drawImage(item) {
      const ctx = this.target.getContext("2d");
      const { x, y, imgData, width, height } = item;
      if (imgData.constructor === String) {
          var data = await this.createPosterImg(imgData);
      } else {
          var data = imgData
      }
      ctx.drawImage(data, x*this.ratio, y*this.ratio, width*this.ratio, height*this.ratio);
      return true
  }

  /**
   * 创建img
   * @param {*} url
   * @returns
   */
  createPosterImg(url) {
      return new Promise((resolve, reject) => {
          const imgObj = new Image();
          imgObj.crossOrigin = "Anonymous";
          imgObj.src = url;
          imgObj.onload = () => {
              resolve(imgObj)
          };
          imgObj.onerror = () => {
              reject("img load fail");
          };
      });
  }

  /**
   * 保存图片
   * @param {*} param
   * @returns
   */
  saveImg() {
      this.checkDom(this.target);
      const base64 = this.target.toDataURL("image/png", 1);
      return base64;
  }
}
