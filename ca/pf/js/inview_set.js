$(function () {
  $(".transform1").on("inview", function () {
    $(this).addClass("transform1style");
  });
  $(".transform2").on("inview", function () {
    $(this).addClass("transform2style");
  });
  $(".up").on("inview", function () {
    $(this).addClass("upstyle");
  });
  $(".left").on("inview", function () {
    $(this).addClass("leftstyle");
  });
  $(".right").on("inview", function () {
    $(this).addClass("rightstyle");
  });
});
