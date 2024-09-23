/**
 * DrawWave.
 */
class DrawWave {
  // コンストラクタ
  constructor(
    // パラメータsample
    args = {
      unit: 100, // 波の大きさ
      waveCanvas: "waveCanvas", // 波を描画する要素
      height: 200, // 波の高さ
      speed: 0.015, // 波のスピード
      waveInfoList: [
        {
          color: "#00f", // 波の色
          opacity: 0.5, // 波の透明度
          zoom: 1.0, // 波の幅のzoom  数字が大きいほど波がなだらか
          delay: 100, // 波の開始位置の遅れ
        },
      ],
    }
  ) {
    this.canvasList = []; // キャンバスの配列
    this.info = {}; // 全キャンバス共通の描画情報
    this.colorList = []; // 各キャンバスの色情報

    this.waveInfoList = args.waveInfoList;

    this.unit = args.unit; // 波の大きさ
    this.height = args.height;
    this.speed = args.speed;
    this.canvasList.push(document.getElementById(args.waveCanvas));

    const _colorList = [];
    for (const _color of args.waveInfoList) {
      _colorList.push(_color.color);
    }
    this.colorList.push(_colorList); // 各キャンバスの色情報

    // 初期化
    this.init();
    // 共通の更新処理呼び出し
    this.update();
  }

  /**
   * Init function.
   *
   * Initialize variables and begin the animation.
   */
  init() {
    this.info.seconds = 0;
    this.info.t = 0;

    // 各キャンバスの初期化
    for (let _canvas of this.canvasList) {
      const canvas = _canvas;
      canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
      canvas.height = this.height; // ★ edit 波の高さ
      canvas.contextCache = canvas.getContext("2d");
    }

    // 共通の更新処理呼び出し
    // this.update();
  }

  /**
   * Update function.
   *
   * Update the animation frame.
   */
  update() {
    for (let canvasIndex in this.canvasList) {
      const canvas = this.canvasList[canvasIndex];
      // 各キャンバスの描画
      this.draw(canvas, this.colorList[canvasIndex]);
    }
    // 共通の描画情報の更新
    this.info.seconds = this.info.seconds + this.speed; // ★ edit 波のスピード
    this.info.t = this.info.seconds * Math.PI;
    // 自身の再起呼び出し
    setTimeout(() => this.update(), 35);
  }

  /**
   * Draw animation function.
   *
   * This function draws one frame of the animation, waits 20ms, and then calls
   * itself again.
   */
  draw(canvas, color) {
    // 対象のcanvasのコンテキストを取得
    let context = canvas.contextCache;
    // キャンバスの描画をクリア
    context.clearRect(0, 0, canvas.width, canvas.height);

    //波の重なりを描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
    // ★ edit 0.5⇒透過具合50%、3⇒数字が大きいほど波がなだらか
    for (const _waveInfo of this.waveInfoList) {
      this.drawWave(
        canvas,
        _waveInfo.color,
        _waveInfo.opacity,
        _waveInfo.zoom,
        _waveInfo.delay
      );
    }
  }

  /**
   * 波を描画
   * drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
   */
  drawWave(canvas, color, alpha, zoom, delay) {
    let context = canvas.contextCache;
    context.fillStyle = color; //塗りの色
    context.globalAlpha = alpha;
    context.beginPath(); //パスの開始
    this.drawSine(canvas, this.info.t / 0.5, zoom, delay);
    context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
    context.lineTo(0, canvas.height); //パスをCanvasの左下へ
    context.closePath(); //パスを閉じる
    context.fill(); //波を塗りつぶす
  }

  /**
   * Function to draw sine
   *
   * The sine curve is drawn in 10px segments starting at the origin.
   * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
   */
  drawSine(canvas, t, zoom, delay) {
    const xAxis = Math.floor(canvas.height / 2);
    const yAxis = 0;
    const context = canvas.contextCache;
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    let x = t; //時間を横の位置とする
    let y = Math.sin(x) / zoom;
    context.moveTo(yAxis, this.unit * y + xAxis); //スタート位置にパスを置く

    // Loop to draw segments (横幅の分、波を描画)
    for (let i = yAxis; i <= canvas.width + 10; i += 10) {
      x = t + (-yAxis + i) / this.unit / zoom;
      y = Math.sin(x - delay) / 3;
      context.lineTo(i, this.unit * y + xAxis);
    }
  }
}
