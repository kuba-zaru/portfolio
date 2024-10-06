$(function () {
  $('a[href^="#"]').click(function () {
    var speed = 300;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top;
    $("body,html").animate(
      {
        scrollTop: position,
      },
      speed,
      "swing"
    );
    return false;
  });

  // 特定のaタグを無効化する
  $("a.disabled").click(function () {
    return false;
  });
});

/**
 * 星のhtmlを生成して返却する
 * @param {*} star_num
 * @returns
 */
function generateStar(star_num) {
  const star_offset = 5 - star_num;
  let result = "";
  for (let i = 0; i < star_num; i++) {
    result += '<i class="fa-solid fa-star"></i>';
  }
  for (let i = 0; i < star_offset; i++) {
    result += '<i class="fa-regular fa-star"></i>';
  }
  return result;
}

/**
 * クエリ文字列をオブジェクトに変換して返却する
 * @returns
 */
function getUrlQueries() {
  var queryStr = window.location.search.slice(1); // 文頭?を除外
  queries = {};
  // クエリがない場合は空のオブジェクトを返す
  if (!queryStr) {
    return queries;
  }
  // クエリ文字列を & で分割して処理
  queryStr.split("&").forEach(function (queryStr) {
    // = で分割してkey,valueをオブジェクトに格納
    var queryArr = queryStr.split("=");
    queries[queryArr[0]] = queryArr[1];
  });
  return queries;
}

/**
 * jsonファイルを同期通信で読み込む
 */
function readJsonSynchronize(fileName) {
  let result_list = "";
  $.ajaxSetup({
    async: false,
  }); //同期通信(json取ってくるまで待つ)
  $.getJSON(fileName, function (data) {
    result_list = data;
  });
  $.ajaxSetup({
    async: true,
  });
  return result_list;
}

/**
 * ポイントバックを出力する
 * TODO: ポイントの数値に応じてアイキャッチの色を変更したい
 */
function generateEyeCatchPointBack(point_back_ratio) {
  if (!point_back_ratio) {
    return "";
  }
  let result = `
          <div class="eye-catch-point-back" >
            <p class="point">${point_back_ratio}%</p>
            <p class="">ポイント<br>バック</p>
          </div>
        `;
  return result;
}

/**
 * 重複しないランダムな値を生成する
 */
function generateUniqueRandomNumbers(count, max) {
  if (count > max) {
    throw new Error("maxよりもcountが大きいです");
  }
  const randoms = [];
  while (randoms.length < count) {
    const random = Math.floor(Math.random() * max);
    if (!randoms.includes(random)) {
      // 重複しない場合は配列に追加
      randoms.push(random);
    }
  }
  return randoms;
}
