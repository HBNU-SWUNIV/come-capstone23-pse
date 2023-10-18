const header = document.querySelector("header")

window.addEventListener ("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 200)
});
// 메뉴바 스크롤 애니메이션

const sr = ScrollReveal ({
    distance: '40px',
    duration: 2050,
    delay: 200,
    reset: true
});

//스크롤 내리면 나타나는 효과
sr.reveal('.hero-text, .egg,.team-center',{origin:'top'})
sr.reveal('.about-image, .service-item,.team-content',{origin:'bottom'});
sr.reveal('.about-text, .text-center, right-concat h2',{origin:'top'});
sr.reveal('.left-concat',{origin:'right'});
sr.reveal('.right-concat',{origin:'left'});
sr.reveal('.end-section',{origin:'top'});


  

  