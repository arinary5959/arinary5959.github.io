/* 헤더부분 노드 */
const htmlElem = document.querySelector('html')
const headerWrap = document.querySelector('.header_wrap')
const menuBtns = headerWrap.querySelectorAll('.main_menu > .main_menu-list')
const headerUtilLang = headerWrap.querySelector('.lang')
/* 슬라이드 부분 노드 */
const slideLiElems = document.querySelectorAll('.slide > li')
const logoImgElem = document.querySelector('.logo > img')
const menuAfter = document.querySelector('.main_menu-list:nth-child(6) > a > span') //스판색깔 헤더 마지막 리스트의 화살표
/* 푸터부분 노드 */
const footerMenu = document.querySelector('.footer_menu')
const footerUtil = document.querySelector('.footer_util')
/* date */
const stockDate = document.querySelector('.stock-date')
const today = new Date()
stockDate.textContent = today.getFullYear() + '-' + (today.getMonth() + 1 ) + '-' + today.getDate() + ' ' 
+ today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

/* 이벤트리스너 */
window.addEventListener('scroll', workScroll)
    //헤더
headerWrap.addEventListener('mouseenter', hoverEffect)
headerWrap.addEventListener('mouseleave', hoverLeaveEffect)
headerUtilLang.addEventListener('click', lang)
for(let i = 0; i < menuBtns.length; i++){
    menuBtns[i].addEventListener('mouseenter', dropMenu)
    menuBtns[i].addEventListener('mouseleave', undropMenu)
}
    //푸터
footerMenu.addEventListener('click', footerDrop)
footerUtil.addEventListener('click', footerUtilDrop)

/* bx슬라이더 */
var opt = {
    onSlideBefore: function(){
        var num = this.getCurrentSlide();
        setBg(num)
    },
    mode:'fade',
    auto:true,
    pager: true,
    pagerType: 'short',
    pagerShortSeparator:' | '
    }
$('.slide').bxSlider(opt)
/* 스크롤 0729. 셋타임아웃 추가해보기*/
function workScroll(){
    if( htmlElem.scrollTop === 0){
        headerWrap.classList.remove('moved')
        logoChange ()
    }else if(htmlElem.scrollTop > 60){
        headerWrap.classList.add('moved')
        logoChange ()
    }
}
/* 메인_드롭메뉴 */
function dropMenu(e){
    e.preventDefault()
    this.classList.add('on')
}
function undropMenu(e){
    e.preventDefault()
    this.classList.remove('on')
}
/* 메인헤더 호버 */
function hoverEffect(e){
    e.preventDefault()
    headerWrap.classList.add('on')
    logoChange ()
}
function hoverLeaveEffect(e){
    e.preventDefault()
    headerWrap.classList.remove('on')
    logoChange ()
}
/* 헤더 랭 */
function lang(e){
    e.preventDefault()
    if(e.target.tagName !== 'A') return;
    for(let i=0; i < this.children.length; i++){
        this.children[i].classList.remove('on')
    }
    e.target.parentNode.classList.add('on')
}
/* 푸터_메인드롭 */
function footerDrop(e){
    e.preventDefault()
    let targetLiElem = e.target.parentNode.parentNode
    dropCommon(targetLiElem)
}
function footerUtilDrop(e){
    e.preventDefault()
    let targetLiElem = e.target.parentNode.parentNode
    dropCommon(targetLiElem)
}
function dropCommon(targetLiElem){
    if(targetLiElem.classList.contains('on')){
        targetLiElem.classList.remove('on')
    }else{
        targetLiElem.classList.add('on')
    }
}
/* 슬라이드 crrNum을 받아, 슬라이드에 따른 메뉴 효과 변경 */
function setBg(num){
    if(slideLiElems[num].classList.contains('black')){
        headerWrap.classList.remove('white')
        headerWrap.classList.add('black')
        logoChange ()
    }else if (slideLiElems[num].classList.contains('white')){
        headerWrap.classList.remove('black')
        headerWrap.classList.add('white')
        logoChange ()
    }
}
function logoChange (){
    if(headerWrap.classList.contains('moved') 
    || headerWrap.classList.contains('black')
    || headerWrap.classList.contains('on')){
        logoImgElem.src = "images/logo_kakao.png"
        menuAfter.style.backgroundPosition=' -155px 0'
    }else if(headerWrap.classList.contains('white')){
        logoImgElem.src = "images/logo_kakao_white.png"
        menuAfter.style.backgroundPosition=' -175px 0'
    }
}




