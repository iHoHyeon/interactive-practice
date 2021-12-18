export default class Text {
  constructor() {
    this.canvas = document.createElement('canvas');

    this.ctx = this.canvas.getContext('2d');
  }

  setText(str, density, stageWidth, stageHeight) {
    this.canvas.width = stageWidth;
    this.canvas.height = stageHeight;

    const myText = str;
    const fontWidth = 500;
    const fontSize = 600;
    const fontName = 'Hind';

    this.ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    this.ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
    this.ctx.textBaseline = `middle`;

    const fontPos = this.ctx.measureText(myText); // The CanvasRenderingContext2D.measureText() method returns a TextMetrics object that contains information about the measured text => width 등 을 property로 갖는 object를 return
    this.ctx.fillText(
      myText,
      (stageWidth - fontPos.width) / 2,
      fontPos.actualBoundingBoxAscent + // textBaseline의 CSS 픽셀에 텍스트를 렌더링하는 데 사용되는 경계 사각형의 상단 속성
        fontPos.actualBoundingBoxDescent + // textBaseline의 CSS 픽셀에 텍스트를 렌더링하는 데 사용되는 경계 사각형의 바닥 속성
        (stageHeight - fontSize) / 2
    );

    return this.dotPos(density, stageWidth, stageHeight);
  }

  dotPos(density, stageWidth, stageHeight) {
    const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data; // getImageData: 지정된 직사각형 캔버스 화소 데이터의 복사 => 각 픽셀에 대한 RGBA 값을 오브젝트로 반환. 즉, 픽셀 당 4개의 값을 반환받는다

    const particles = [];
    let i = 0;
    let width = 0;
    let pixel;

    for (let height = 0; height < stageHeight; height += density) {
      ++i;
      const slide = i % 2 == 0;
      width = 0;
      if (slide) {
        width += 6;
      }

      for (width; width < stageWidth; width += density) {
        pixel = imageData[(width + height * stageWidth) * 4 - 1];
        if (pixel != 0 && width > 0 && width < stageWidth && height > 0 && height < stageHeight) {
          particles.push({
            x: width,
            y: height,
          });
        }
      }
    }

    return particles;
  }
}
