const htmlElem = document.querySelector('html')
const menuHeaderWrap = document.querySelector('.header_wrap')
const menuBtns = document.querySelectorAll('.main_menu > .main_menu-list')
const dropMenuElem = document.querySelector('.menu_lnb')
const slideLiElems = document.querySelectorAll('.slide > li')
const logoImgElem = document.querySelector('.logo > img')
const menuAfter = document.querySelector('.main_menu-list:nth-child(6) > a > span') //스판색깔 헤더 마지막 리스트의 화살표
const utilMenuUlElem = document.querySelector('.lang')
const utilLIElems =  utilMenuUlElem.querySelectorAll('.lang > li')
const footerMenu = document.querySelector('.footer_menu')
const footerUtil = document.querySelector('.footer_util-list')
const footerMenuLIElems = document.querySelectorAll('.footer_menu-list')

window.addEventListener('scroll', workScroll)

menuHeaderWrap.addEventListener('mouseenter', hoverEffect)
menuHeaderWrap.addEventListener('mouseleave', hoverLeaveEffect)
utilMenuUlElem.addEventListener('click', langChange)
footerUtil.addEventListener('click', footerUtilDrop)
footerMenu.addEventListener('click', footerDrop)

for(let i = 0; i < menuBtns.length; i++){
menuBtns[i].addEventListener('mouseenter', dropMenu)
menuBtns[i].addEventListener('mouseleave', undropMenu)
}
for(let i = 0; i < footerMenuLIElems.length; i++){
    footerMenuLIElems[i].addEventListener('click', footerDrop)
}
var opt = {
            onSlideBefore: function(){
                var num = this.getCurrentSlide();
                // console.log(num)
                setBg(num)
            },
            mode:'fade',
            auto:true,
            pager: true,
            pagerType: 'short',
            pagerShortSeparator:' | '
            }
$('.slide').bxSlider(opt)
//슬라이더의 움짐임에 따라서,
function setBg(num){
    if(slideLiElems[num].classList.contains('black')){
        console.log('black')
        menuHeaderWrap.classList.remove('white')
        menuHeaderWrap.classList.add('black')
        logoChange ()
    }else if (slideLiElems[num].classList.contains('white')){
        console.log('white')
        menuHeaderWrap.classList.remove('black')
        menuHeaderWrap.classList.add('white')
        logoChange ()
    }
}
//마우스엔터와 마우스리브에 따른 헤더 변화. background-color
function hoverEffect(){
    menuHeaderWrap.classList.add('on')
    logoChange ()
}
function hoverLeaveEffect(){
    menuHeaderWrap.classList.remove('on')
    logoChange ()
}
function dropMenu(e){
    e.preventDefault()
    this.classList.add('on')
}
function undropMenu(e){
    e.preventDefault()
    this.classList.remove('on')
}
function langChange(e){
    e.preventDefault()
    if(e.target.tagName === 'UL')return;
        utilLIElems[0].classList.remove('on')
        utilLIElems[1].classList.remove('on')
        e.target.parentNode.classList.add('on')
}
//스크롤링 정보에 따른 헤더 변화. background-color
function workScroll(){
    if( htmlElem.scrollTop === 0){
        menuHeaderWrap.classList.remove('moved')
        logoChange ()
    }else if(htmlElem.scrollTop > 60){
        menuHeaderWrap.classList.add('moved')
        logoImgElem.src = "images/logo_kakao.png"
        menuAfter.style.backgroundPosition=' -155px 0'
    }
}
//슬라이더의 움짐임, 스크롤링 정보, 마우스엔터와 리브에 따른 로고색 변화
function logoChange (){
    if(menuHeaderWrap.classList.contains('moved')
    && menuHeaderWrap.classList.contains('white')){
        logoImgElem.src = "images/logo_kakao.png"
        menuAfter.style.backgroundPosition=' -155px 0'
    }else if(menuHeaderWrap.classList.contains('moved')
    && menuHeaderWrap.classList.contains('black')){
        logoImgElem.src = "images/logo_kakao.png"
        menuAfter.style.backgroundPosition=' -155px 0'
    }else if( menuHeaderWrap.classList.contains('white')
    && menuHeaderWrap.classList.contains('on')){
        logoImgElem.src = "images/logo_kakao.png"
        menuAfter.style.backgroundPosition=' -155px 0'
    }else if(menuHeaderWrap.classList.contains('black')){
        logoImgElem.src = "images/logo_kakao.png"
        menuAfter.style.backgroundPosition=' -155px 0'
    }else if( menuHeaderWrap.classList.contains('white')){
        logoImgElem.src = "images/logo_kakao_white.png"
        menuAfter.style.backgroundPosition=' -175px 0'
    }
}
const stockDate = document.querySelector('.stock-date')
const today = new Date()
const year = today.getFullYear(); // 년도
const month = today.getMonth() + 1;  // 월
const date = today.getDate();  // 날짜
const hours = today.getHours(); // 시
const minutes = today.getMinutes();  // 분
const seconds = today.getSeconds();  // 초
console.log(today)
const todayInfo = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;

stockDate.textContent = todayInfo

function footerDrop(e){
    e.preventDefault()
    console.log(this)
    if(this.tagName === 'UL') return;
    if(this.classList.contains('on')){
        console.log('지우기')
        this.classList.remove('on')
    }else{
        for(let i = 0; i < footerMenuLIElems.length; i++){
            footerMenuLIElems[i].classList.remove('on')
            console.log('모두지우기')
        }
        this.classList.add('on')
    }
}

function footerUtilDrop(e){
    e.preventDefault()
    if(this.classList.contains('on')){
        this.classList.remove('on')
    }else{
        this.classList.add('on')
    }
    
}