let stack;
let comparison = brightness;
let pixelDistance = 4; // Makes interesting visual effects (4 is correct value)
let sorted;

function brightness(array, index) {
  return array[index] + array[index + 1] + array[index + 2];
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
var abrePopUp = function() {
  modal.style.display = "block";
};

// // When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function setup() {
}

var buscarImg = function (linkDaImg) {

  abrePopUp();
  abreOriginal();

  stack = undefined;
  sorted = false;
  var img = new Image();
  var original = new Image();
  img.crossOrigin = "Anonymous";
  original.crossOrigin = "Anonymous";

  img.src = linkDaImg;
  original.src = linkDaImg;

  var canvas = document.getElementById("canvas");
  canvas.width = 400;
  canvas.height = 400;

  var canvasOriginal = document.getElementById("original");
  canvasOriginal.width = 400;
  canvasOriginal.height = 400;

  window.ctx = canvas.getContext("2d");
  
  var contexto = canvasOriginal.getContext("2d");

  img.onload = function () {

    contexto.drawImage(original,0,0);
    ctx.clearRect(0, 0, 400, 400);
    ctx.drawImage(img, 0, 0);
    window.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    bubbleSort();
    render();

  };

};


function quickSortHelper(array, qStack) {
  if (!qStack) {
    var qStack = [];
    let splitPoint = separar(array, 0, array.length - pixelDistance);

    qStack.push({
      split: splitPoint,
      begin: 0,
      end: splitPoint - pixelDistance
    })
    qStack.push({
      split: splitPoint,
      begin: splitPoint + pixelDistance,
      end: array.length - pixelDistance
    })
  }
  return qStack;
}

function quickSort(array, qStack) {
  for (let i = qStack.length - 1; i >= 0; i--) {
    let q = qStack[i];
    if (q.begin < q.end && q.begin !== q.split && q.end !== q.split) {
      let splitPoint = separar(array, q.begin, q.end);
      if (q.begin < splitPoint - pixelDistance)
        qStack.push({
          split: splitPoint,
          begin: q.begin,
          end: splitPoint - pixelDistance
        })
      if (q.begin + pixelDistance < q.end)
        qStack.push({
          split: splitPoint,
          begin: splitPoint + pixelDistance,
          end: q.end
        })
    }
    qStack.splice(i, 1);
  }
  if (!qStack.length && sorted) keepSorting = false;
  if (!qStack.length && !sorted) {
    sorted = true;
    stack = undefined;
  }
  return qStack;
}

function separar(array, start, end) {
  let done = false,
    left = start + pixelDistance,
    right = end,
    pivot = comparison(array, start);

  while (!done) {
    while (left <= right && comparison(array, left) <= pivot) left += pixelDistance;
    while (comparison(array, right) >= pivot && right >= left) right -= pixelDistance;
    if (left >= right) done = true;
    else swapPixel(array, left, right);
  }
  swapPixel(array, start, right);
  return right;
}

function swapPixel(array, i1, i2) {
  for (let i = 0; i < 3; i++) {
    let t = array[i1 + i];
    array[i1 + i] = array[i2 + i];
    array[i2 + i] = t;
  }
  return array;
}

var bubbleSort = function () {

  if (!stack) stack = quickSortHelper(imageData.data);

  quickSort(imageData.data, stack);

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

$( document ).ajaxError(function( event, request, settings ) {
  //$( "#msg" ).append( "<li>MENSAGEM PERSONALIZADA DE ERRO " + settings.url + "</li>" );
  alert("Este usuário não existe!");
});

// Make the DIV element draggable:
dragElement(document.getElementById("myModal"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}



//POPUP IMAGEM ORIGINAL
// Get the modal
var modalOriginalPU = document.getElementById("Original");

// Get the <span> element that closes the modal
var fechar = document.getElementsByClassName("fecharOriginal")[0];

// When the user clicks the button, open the modal 
var abreOriginal = function() {
  modalOriginalPU.style.display = "block";
};

// // When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modalOriginalPU.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modalOriginalPU) {
    modalOriginalPU.style.display = "none";
  }
}

// Make the DIV element draggable:
dragElement(document.getElementById("Original"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "Header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}












