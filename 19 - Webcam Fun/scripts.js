const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => {
      console.error(err);
    });
}


function paintToCanvas() {
  const height = video.videoHeight;
  const width = video.videoWidth;
  canvas.height = height;
  canvas.width = width;
  
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    
    //pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    
    ctx.globalAlpha = 0.2;
    ctx.putImageData(pixels, 0, 0);
  }, 100)
}


function takePhoto() {
  snap.currentTime = 0;
  snap.play();
  
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firsChild);
}


function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.3; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 15] = pixels.data[i + 0]; // RED
    pixels.data[i + 50] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 55] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);