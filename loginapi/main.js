// 로그인 버튼 모달
const logInBtn = document.querySelector('.menu-login');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modalCloseBtn = document.querySelector('.modal-close');

logInBtn.addEventListener('click', modalWork);
overlay.addEventListener('click', modalclose)
modalCloseBtn.addEventListener('click', modalclose)

// 알림
// window.onload = () =>{
//     window.alert('헤더 메뉴에서 LOGIN 버튼을 누르시면 로그인 기능을 확인 하실 수 있습니다.')
// }
// 모달, 오버레이
function modalWork(e){
    e.preventDefault();
    if(logInBtn.classList.contains('logged')){
        logOut();
    }else{
        modal.classList.add('on');
        overlayWork()
    }
}
function modalclose(){
    if(modal.classList.contains('on')){
        modal.classList.remove('on');
        overlayWork()
    }
}
function overlayWork(){
    if(overlay.classList.contains('on')){
        overlay.classList.remove('on');
    }else {
        overlay.classList.add('on');
    }
}

// 스크롤워크
const html = document.querySelector('html')
const header = document.querySelector('header')
const primary01 = document.querySelector('.primary-01')
window.addEventListener('scroll', scrollWork)
let start;
function scrollWork(){
    clearTimeout(start);
    start = setTimeout(scrollTodo, 100);
}
function scrollTodo(){
    if(html.scrollTop > 80){
        console.log('증가')
        header.classList.add('sticky')
        primary01.classList.add('on')
        console.dir(header.clientHeight);
    }else if(html.scrollTop == 0){
        console.log('감소')
        header.classList.remove('sticky')
        primary01.classList.remove('on')
    }
}

// 장바구니
const cartOnBtn = document.querySelector('.cart_open');
const cartOffBtn = document.querySelector('.cart_close');
const cartContent = document.querySelector('.cart_content');
const contentWrap = document.querySelector('.content-wrap')

cartOnBtn.addEventListener('click', cartOnOFF);
cartOffBtn.addEventListener('click', cartOnOFF);

function cartOnOFF(e) {
    e.preventDefault()
    if(cartContent.classList.contains('on')){
        cartContent.classList.remove('on')
        contentWrap.classList.remove('on')
        overlay.style.right = '0'
        overlayWork()
    }else{
        cartContent.classList.add('on')
        contentWrap.classList.add('on')
        overlay.style.right = '25%'
        overlayWork()
    }
}
// 서머리

const summary = document.querySelector('.summary')
const summaryBtn = document.querySelector('.summarybtn')
const btnIcon = document.querySelector('.summarybtn > i')
const blinkTxt = document.querySelector('.blinktxt')
summaryBtn.addEventListener('click', openSummary)
function openSummary(e){
    console.log(e.target)
    if(summary.classList.contains('on')){
        summary.classList.remove('on')
        btnIcon.style.transform = `translate(-50%, -50%) rotate(0deg)`
        blinkTxt.style.visibility = 'visible'
    }else{
        summary.classList.add('on')
        btnIcon.style.transform = `translate(-50%, -50%) rotate(180deg)`
        blinkTxt.style.visibility = 'hidden'
    }
}

