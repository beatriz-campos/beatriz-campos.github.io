function processFormData() 
{

  var name_element = document.getElementById('nome');
  var data = 'You entered the following information: \n\n';
  var name = name_element.value;

  data += 'Name: ' + name + '\n';
	
	
	var img = new Image();
  img.src = "flor.jpg";
    
  var canvas = document.getElementById("canvas");
  canvas.width = 400;
  canvas.height = 400;
    
  ctx = canvas.getContext("2d");
  ctx.drawImage(img,0,0);
  imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
  
  for(var n = 0; n < imageData.data.length; n+=4) {
    for(var i = 0; i < imageData.data.length - n - 4; i+=4) {
      var curRed = imageData.data[i];
      var curGreen = imageData.data[i+1];
      var curBlue = imageData.data[i+2];
      var curBright = (curRed + curGreen + curBlue) / 3;

      var nextRed = imageData.data[i+4];
      var nextGreen = imageData.data[i+5];
      var nextBlue = imageData.data[i+6];
      var nextBright = (nextRed + nextGreen + nextBlue) / 3;  
      
      if (curBright < nextBright) {
        imageData.data[i] = nextRed;
        imageData.data[i+1] = nextGreen;
        imageData.data[i+2] = nextBlue;
        imageData.data[i+4] = curRed;
        imageData.data[i+5] = curGreen;
        imageData.data[i+6] = curBlue;
      }
    }
  }
  
  ctx.putImageData(imageData,0,0);
  
  alert(data);
}


function testeAlerta() {
  alert("teste");
}







