## canvas-draw-poster.js

+ canvas-draw-poster.js 是一个基于canvas生成海报的插件，支持导出海报图片。


## install
```js
 npm i canvas-draw-poster
```

## use
```js
import CanvasPoster from "canvas-draw-poster"
const poster=new CanvasPoster({
    target:xxx,
    width:xxx,
    height:xxx,
})
```


## api

|  事件   | 说明  | 参数 |
|  ----  | ----  | ---- |
| options  | 初始化参数 |  一个对象{target,width,height,ratio}  |
| drawRect  | 绘制矩形 |  一个对象{x,y,width,height,color}  |
| drawLine  | 绘制线条 | 一个对象{startX,startY,endX,endY,color}   |
| drawTextList  | 绘制多个文字 | 一个数组，数组元素是对象， 对象包含{value,x,y,color,size,fontFamily}   |
| drawText  | 绘制文字 |  一个对象，对象包含{value,x,y,color,size,fontFamily}  |
| drawSingleImage  | 绘制单张图片 | 一个对象，对象包含{x,y,imageData,width,height}    |
| drawImageList  | 绘制多张图片 |  一个数组，数组元素是一个对象，对象包含{x,y,imageData,width,height}  |
| saveImg  | 导出图片数据 |    |