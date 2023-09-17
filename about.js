window.addEventListener('load', () => {
  const section = document.getElementById('sobre-content');
  const paragraphs = section.getElementsByTagName('p');

  Array.from(paragraphs).forEach((paragraph, index) => {
    const lines = paragraph.innerHTML.split('<br>');
    paragraph.innerHTML = '';

    lines.forEach((line, lineIndex) => {
      const lineElement = document.createElement('span');
      lineElement.innerHTML = line;
      lineElement.style.opacity = '0';
      lineElement.style.transition = 'opacity 0.5s ease-in-out, color 0.5s ease-in-out';

      setTimeout(() => {
        lineElement.style.opacity = '1';
        lineElement.style.color = 'white';
      }, (index * 200) + (lineIndex * 100)); 

      paragraph.appendChild(lineElement);
      paragraph.appendChild(document.createElement('br'));
    });
  });
});

window.addEventListener('load', () => {
  const menu = document.getElementById('nav-menu');
  const spans = menu.getElementsByTagName('span');

  Array.from(spans).forEach((span, index) => {
    span.style.opacity = '0';
    span.style.transition = 'opacity 0.5s ease-in-out, color 0.5s ease-in-out';

    setTimeout(() => {
      span.style.opacity = '1';
      span.style.color = 'white';
      
    }, index * 400);
  });
});

window.addEventListener('load', () => {

  setTimeout(() => {
    const profilePic = document.getElementById('profile-pic');
    profilePic.classList.add('visible');
    
  }, 1000);

});

const projetos = document.getElementById('projects');

projetos.addEventListener('click', () => {
const spans = document.querySelectorAll('p span');

const navItems = document.querySelectorAll('#nav-menu span');

navItems.forEach((item, index) => {
  const delay = index * 200;
  setTimeout(() => {
    item.style.transition = 'color 0.5s ease-in-out, opacity 0.5s ease-in-out';
    item.style.color = '#000000';
    item.style.opacity = '0';
  }, delay);
});
  spans.forEach((span, index) => {
    const delay = index * 200;
    setTimeout(() => {
      span.style.transition = `color 0.5s ease-in-out, opacity 0.5s ease-in-out`;
      span.style.color = '#000000'; 
      span.style.opacity = '0'; 
    }, delay);
  });

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
});


  
  
const scrollContent = document.getElementById("sobre-content");

let startY = 0;
let currentY = 0;
let isAnimating = false;

const handleOnDown = e => {
  startY = e.clientY || e.touches[0]?.clientY;
  currentY = parseInt(scrollContent.dataset.percentage) || 0;
};

const handleOnUp = () => {
  startY = 0;
};

const handleOnMove = e => {
  if (startY === 0) return;

  const mouseDelta = (e.clientY || e.touches[0]?.clientY) - startY;
  const maxDelta = window.innerHeight;

  const percentage = ((mouseDelta / maxDelta) * 100) + currentY;
  const nextPercentage = Math.max(Math.min(percentage, 0), -100);

  scrollContent.dataset.percentage = nextPercentage;

  if (!isAnimating) {
    requestAnimationFrame(updateScrollPosition);
    isAnimating = true;
  }
};

const handleOnScroll = e => {
  const delta = Math.sign(e.deltaY);
  const currentPercentage = parseFloat(scrollContent.style.transform.replace("translateY(", "").replace("%)", "")) || 0;
  const scrollStep = 10;

  const nextPercentage = currentPercentage + (delta * scrollStep);

  scrollContent.dataset.percentage = nextPercentage;

  if (!isAnimating) {
    requestAnimationFrame(updateScrollPosition);
    isAnimating = true;
  }

  e.preventDefault();
};

const updateScrollPosition = () => {
  const currentPercentage = parseFloat(scrollContent.style.transform.replace("translateY(", "").replace("%)", "")) || 0;
  const targetPercentage = parseFloat(scrollContent.dataset.percentage) || 0;

  const targetElement = document.querySelector('[data-target][data-target="' + targetPercentage + '"]');
  if (targetElement) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const scrollTarget = targetPosition - window.innerHeight / 2; 

    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth'
    });

    isAnimating = false;
    return;
  }

  const distance = targetPercentage - currentPercentage;
  const easing = 0.1;

  const nextPercentage = currentPercentage + (distance * easing);

  scrollContent.style.transform = `translateY(${nextPercentage}%)`;

  if (Math.abs(distance) > 0.1) {
    requestAnimationFrame(updateScrollPosition);
  } else {
    isAnimating = false;
  }
};

window.addEventListener("mousedown", handleOnDown);
window.addEventListener("touchstart", handleOnDown);
window.addEventListener("mouseup", handleOnUp);
window.addEventListener("touchend", handleOnUp);
window.addEventListener("mousemove", handleOnMove);
window.addEventListener("touchmove", handleOnMove);
window.addEventListener("wheel", handleOnScroll, { passive: false });



const menuItems = document.querySelectorAll('#nav-menu span');
const sections = document.querySelectorAll('[data-section]');

sections.forEach((section, index) => {
  if (index !== 0) {
    section.style.display = 'none';
  }
});

const fadeInParagraphs = (section) => {
  const paragraphs = section.querySelectorAll('p');
  
  Array.from(paragraphs).forEach((paragraph, index) => {
    const lines = paragraph.innerHTML.split('<br>');
    paragraph.innerHTML = '';

    lines.forEach((line, lineIndex) => {
      const lineElement = document.createElement('span');
      lineElement.innerHTML = line;
      lineElement.style.opacity = '0';
      lineElement.style.transition = 'opacity 0.5s ease-in-out, color 0.5s ease-in-out';

      setTimeout(() => {
        lineElement.style.opacity = '1';
        lineElement.style.color = 'white';
      }, (index * 200) + (lineIndex * 100)); 

      paragraph.appendChild(lineElement);
    });
  });
};

const showSection = (targetSection) => {
  sections.forEach((section) => {
    if (section.getAttribute('id') === targetSection) {
      section.style.display = 'block';
      fadeInParagraphs(section);
    } else {
      section.style.display = 'none';
    }
  });
};

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    const targetSection = item.getAttribute('data-target').replace('#', '');
    showSection(targetSection);
  });
});


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




