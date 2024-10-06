/**
 * inviewを使用して要素が表示領域に入った時にアニメーションを付与する
 */
function handleInView(selector, animationClass, once = false) {
  $(selector).on("inview", function (event, isInView) {
    if (isInView) {
      //表示領域に入った時
      $(this).addClass(animationClass);
    } else {
      if (!once) {
        //表示領域から出た時
        //クラス名除去
        $(this).removeClass(animationClass);
      }
    }
  });
}
// アニメーションの設定
handleInView(".fadeUpTrigger", "fadeUp", true);
handleInView(".flipLeftTopTrigger", "flipLeftTop", true);
handleInView(".zoomInTrigger", "zoomIn", true);
