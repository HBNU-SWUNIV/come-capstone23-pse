const header = document.querySelector("header")

window.addEventListener ("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 80)
});
//이거는 뭐시냐면은 그 메인페이지 스크롤 내릴때 메뉴는 안없어지고 그대로 유지되는 고것 근데 쫌 간지나게 유지돼..

