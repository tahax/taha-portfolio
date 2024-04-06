// document.documentElement.style.setProperty('--black', '#ff0000');
const sectionOne = document.querySelector('#section-one');
let scrollDiv = document.querySelector('.scroll-down-parent');
const logo = document.querySelector('a.navbar-brand img');
const cursor = document.querySelector('.custom-cursor');
const navLinks = document.querySelectorAll('.nav-link');
let winScroll = document.querySelector('footer').getBoundingClientRect().top;
const mandatorySec = document.querySelector('.mandatory-example');

/********************** clac the padding bottom ********************* */

paddingChecker();

function paddingChecker(){
  let heightProfileCart = document.querySelector('.taha-rezome-cart').offsetHeight;
  let heightTitlePf = document.querySelector('#section-three-half .taha-rezome-one>div').offsetHeight;
  document.documentElement.style.setProperty('--padding-checker', `${heightProfileCart}px`);
  document.documentElement.style.setProperty('--top-sticky-cheker', `${heightTitlePf + 100}px`);
}

/******************************************* */

function reload() {
  location.reload();
}

document.querySelector('.fullscreen-button').addEventListener('click',fullscreen);
document.querySelector('.cancel-button').addEventListener('click',removeFullscreenRequest);

function removeFullscreenRequest() {
  document.querySelector('body').style.overflow = 'unset';
  document.querySelector('.request-for-fullscreen-parent').style.opacity = '0';
  setTimeout(()=>{
    document.querySelector('.request-for-fullscreen-parent').style.display = 'none';
  },300)
}

function forceToFullscreenRequest() {
  document.querySelector('.request-for-fullscreen-parent').style.opacity = '1';
  setTimeout(()=>{
    document.querySelector('.request-for-fullscreen-parent').style.display = 'block';
  },300)
}

function fullscreen() {
  document.querySelector('body').style.overflow = 'unset';
  document.documentElement.requestFullscreen();
  removeFullscreenRequest();
}

window.addEventListener('load',()=>{
  if (document.fullscreenElement) {
    removeFullscreenRequest();
  }
  
  if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
      // کاربر با موبایل وارد شده است
  } else {
      // کاربر با کامپیوتر وارد شده است
      if (window.innerHeight < 700) {
        forceToFullscreenRequest();
      }
  }
})

/**********************swiper js********************* */

var swiper = new Swiper(".taha", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 5,
    mousewheel: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
});

var swiper = new Swiper(".taha-silder-two", {
    speed: 600,
    parallax: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

/**********************backgroundMask*********************/

  document.querySelector('body').addEventListener("mousemove", function(e) {
    let x = e.pageX;
    let y = e.pageY;
    document.querySelector(".page-grid-mask").style.setProperty('--mouse-y', `${y}px`);
    document.querySelector(".page-grid-mask").style.setProperty('--mouse-x', `${x}px`);
  });

/**********************Header*********************/
  /* check the header color & transparensy */
  navColorChecker();

  function navColorChecker() {
    let topOfSecThree = document.querySelector('#section-three .container').getBoundingClientRect().top;
    if(topOfSecThree >= 0){
      sectionOne.style.backgroundColor = "transparent";
      sectionOne.style.borderBottom = "unset"
    }else if(topOfSecThree <= 200){
      sectionOne.style.backgroundColor = "var(--black)";
      sectionOne.style.borderBottom = "1px solid var(--border-color)"
    }
  }

  /**********************scroll down , bottom page arrow*********************/
  
  /* after loading the page */
  scrollDownChecker();

  function scrollDownChecker() {

    setTimeout(() => {

      var topOfSecSevenTimeOut = document.querySelector('#section-seven').getBoundingClientRect().top;

      if(topOfSecSevenTimeOut >= window.innerHeight - 100){
        scrollDiv.style.opacity = "1";
      }
      if(topOfSecSevenTimeOut < window.innerHeight - 100){
        scrollDiv.style.opacity = "0";
      }
      
    }, 300);
    
  }
  

  /**********************onscroll event*********************/

  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
      
      navColorChecker();
      scrollDownChecker();

      let currentScroll = window.scrollY;
      if (currentScroll > lastScrollTop) {
        /* user scroll up */
        /* last section can see the header */
        setTimeout(() => {
          var topOfSecSevenTimeOut = document.querySelector('#section-seven').getBoundingClientRect().top;
          if(topOfSecSevenTimeOut < window.innerHeight - 100){
            sectionOne.style.transform = "translateY(0px)";
          }else{
            sectionOne.style.transform = "translateY(-80px)";
          }
        }, 100);
      } else {
        /* user scroll down */
        sectionOne.style.transform = "translateY(0px)";
      }
      
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

/**********************DarkMode*********************/

document.querySelector('#light-dark-mode').addEventListener('click',()=>{
  if(logo.src.split('/').pop() == "tahakasramehr.png"){
    logo.src = './public/images/tahakasramehr-logo-black.png';
    document.querySelector('#light-dark-mode .fa-sun-o').style.display = 'none';
    document.querySelector('#light-dark-mode .fa-moon-o').style.display = 'block';

  }else{
    logo.src = './public/images/tahakasramehr.png';
    document.querySelector('#light-dark-mode .fa-sun-o').style.display = 'block';
    document.querySelector('#light-dark-mode .fa-moon-o').style.display = 'none';
  }
  document.body.classList.toggle('dark-mode');
})

/**********************Mouse convas*********************/

document.documentElement.style.cursor = 'none';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

// for intro motion
let mouseMoved = false;

const pointer = {
    x: .5 * window.innerWidth,
    y: .5 * window.innerHeight,
}
const params = {
    pointsNumber: 40,
    widthFactor: .3,
    mouseThreshold: .6,
    spring: .4,
    friction: .5
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
    trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
    }
}

window.addEventListener("click", e => {
    updateMousePosition(e.clientX, e.clientY);
});
window.addEventListener("mousemove", e => {
    mouseMoved = true;
    updateMousePosition(e.clientX, e.clientY);
});
window.addEventListener("touchmove", e => {
    mouseMoved = true;
    updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
});

function updateMousePosition(eX, eY) {
    pointer.x = eX;
    pointer.y = eY;
}

setupCanvas();
update(0);

window.addEventListener("resize", function(){
  setupCanvas();
  paddingChecker();
});


function update(t) {

    // for intro motion
    if (!mouseMoved) {
        pointer.x = (.5 + .3 * Math.cos(.002 * t) * (Math.sin(.005 * t))) * window.innerWidth;
        pointer.y = (.5 + .2 * (Math.cos(.005 * t)) + .1 * Math.cos(.01 * t)) * window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? .4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
    });

    ctx.lineCap = "round";
	 ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length - 1; i++) {
        const xc = .5 * (trail[i].x + trail[i + 1].x);
        const yc = .5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.strokeStyle = '#1fdbbf';
        ctx.stroke();
    }
    ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
    ctx.stroke();
    
    window.requestAnimationFrame(update);
}

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/******************************************* */

