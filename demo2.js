
var i = 0;

let sorted;
let index = 0;

function setup() {
}

var buscarImg = function (linkDaImg) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = linkDaImg;

  //sorted = createImage(img.width, img.height);
  //sorted = img.get();

  var canvas = document.getElementById("canvas");
  canvas.width = 400;
  canvas.height = 400;

  window.ctx = canvas.getContext("2d");

  img.onload = function () {

    ctx.drawImage(img, 0, 0);

    window.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    bubbleSort();
    render();

  };

};

var bubbleSort = function () {

  //sorted.loadPixels();

    // Selection sort!
    for (let n = 0; n < 1; n++) {
        let record = -1;
        let selectedPixel = index;
        for (let j = index; j < imageData.data.length; j += 4) {
            let pix = color(imageData.data[j], imageData.data[j + 1], imageData.data[j + 2], imageData.data[j + 3]);
            let b = hue(pix);
            if (b > record) {
                selectedPixel = j;
                record = b;
            }
        }

        // Swap selectedPixel with i
        let temp = [];
        temp[0] = imageData.data[index];
        temp[1] = imageData.data[index + 1];
        temp[2] = imageData.data[index + 2];
        temp[3] = imageData.data[index + 3];
        imageData.data[index] = imageData.data[selectedPixel];
        imageData.data[index + 1] = imageData.data[selectedPixel + 1];
        imageData.data[index + 2] = imageData.data[selectedPixel + 2];
        imageData.data[index + 3] = imageData.data[selectedPixel + 3];
        imageData.data[selectedPixel] = temp[0];
        imageData.data[selectedPixel + 1] = temp[1];
        imageData.data[selectedPixel + 2] = temp[2];
        imageData.data[selectedPixel + 3] = temp[3];

        if (index < imageData.data.length - 1) {
            index += 4;
        }
    }

  // if (n < imageData.data.length) {
  //   if (i < imageData.data.length - n - 4) {
  //     var curRed = imageData.data[i];
  //     var curGreen = imageData.data[i + 1];
  //     var curBlue = imageData.data[i + 2];
  //     var curBright = (curRed + curGreen + curBlue) / 3;

  //     var nextRed = imageData.data[i + 4];
  //     var nextGreen = imageData.data[i + 5];
  //     var nextBlue = imageData.data[i + 6];
  //     var nextBright = (nextRed + nextGreen + nextBlue) / 3;

  //     if (curBright < nextBright) {
  //       imageData.data[i] = nextRed;
  //       imageData.data[i + 1] = nextGreen;
  //       imageData.data[i + 2] = nextBlue;
  //       imageData.data[i + 4] = curRed;
  //       imageData.data[i + 5] = curGreen;
  //       imageData.data[i + 6] = curBlue;
  //     }

  //     i += 4;
  //   } else {
  //     i = 0;
  //     n += 4;
  //   }
  // }

  setTimeout(bubbleSort, 0);
};




var render = function () {
  ctx.putImageData(imageData, 0, 0);
  setTimeout(render, 1000 / 30);
};




function processFormData() {
  var twitterLink = 'https://twitter.com/';
  var name_element = document.getElementById('nome');
  var name = name_element.value;
  twitterLink += name;

  proxyurl = "https://cors-anywhere.herokuapp.com/"; //CORS proxy


    $.get(proxyurl + twitterLink, function (data) {
      //The local variable 'data' now has example.com stored inside of it here.
      var twitter_html = data;
      //alert(twitter_html);

      //procura por trecho com o link para a img
      var indexProfilePicture = twitter_html.indexOf("profile-picture");

      //faz uma nova string cortando tudo antes do trecho procurado
      var cortaInicio = twitter_html.substring(indexProfilePicture, twitter_html.length - 1);

      //procura pelo index de title
      var indexTitle = cortaInicio.indexOf("title");

      //utilizando as distâncias, fixas em todos os código, entre o inicio do trecho "https" e a palavra "title" do trecho do link da img
      // pega o link da imagem
      var indexInicioLink = cortaInicio.indexOf("https");
      var indexFimLink = indexTitle - 10;
      var endereco = cortaInicio.substring(indexInicioLink, indexFimLink);

      alert(endereco);

      //faz o pixel sorting com a imagem
      buscarImg(endereco);
    });


}

function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}










