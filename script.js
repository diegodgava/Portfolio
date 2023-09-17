
const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);


const about = document.getElementById('about')
const imagens = document.querySelectorAll(".image")
const projetos = document.getElementById('projects')
const sobreText = document.getElementById('sobre-content')
const sobre = document.getElementById('about-text')
const intervalo = 300;

imagens.forEach((imagem, index) => {
  setTimeout(() => {
    imagem.style.opacity = '1';
    imagem.style.transition = 'all 0.5s ease-in-out';
  }, intervalo * index);
});


about.addEventListener('click', () => {
  const overlays = document.getElementsByClassName('overlay');
  
  for (let overlay of overlays) {
    overlay.classList.remove('image-overlay');
    overlay.innerHTML = ''
  }
  imagens.forEach((imagem, index) => {
    const translateY = -(index + 1) * 100 - 100; 
    setTimeout(() => {
      imagem.style.transition = `transform 0.5s ease-in-out`;
      imagem.style.transform = `translateY(${translateY}%)`;
    }, index * 300); 
  });

  setTimeout(() => {
    window.location.href = 'about.html';
  }, imagens.length * 200);  
});

const dragMessage = document.getElementById('drag-message');

function showMessage() {
  dragMessage.classList.add('animate__animated', 'animate__fadeIn');
  dragMessage.style.opacity = 1;
}

function hideMessage() {
  dragMessage.classList.add('animate__animated', 'animate__fadeOut');
  setTimeout(() => {
    dragMessage.style.opacity = 0;
    dragMessage.classList.remove('animate__animated', 'animate__fadeIn', 'animate__fadeOut');
  }, 500);
}

setTimeout(showMessage, 1000); 
setTimeout(hideMessage, 3000); 


function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function disableMobileScroll() {
  if (isMobileDevice()) {
    document.addEventListener('touchmove', function(event) {
      event.preventDefault();
    }, { passive: false });
  }
};

window.addEventListener('load', disableMobileScroll);

