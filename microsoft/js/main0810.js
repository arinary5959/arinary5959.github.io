/* 0810수정 0811반영 */
/* 전체메뉴 드롭다운 */
const dropBtn = document.querySelector('.gnb_util > li:nth-child(1)')
/* 서치 */
const searchBtn = document.querySelector('.gnb_util > li:nth-child(2)')
const cancel = searchBtn.querySelector('form > button:last-child')
/* 네이게이션 메뉴 */
const headerElem = document.querySelector('header')
const menuBarDivElem = headerElem.querySelector('.gnbmenu_bar-box')
const gnbMenuUlElem = document.querySelector('.gnb_menu')
const navElem = document.querySelector('nav')
const attachedLiElems = document.querySelectorAll('.attachedul > li')
/* 이벤트리스너 */
dropBtn.addEventListener('click', dropMenuWork)
searchBtn.addEventListener('click', dropMenuWork)
cancel.addEventListener('click', dropMenuWork)

/* 사이즈워크 */
window.addEventListener('resize', resizework)
window.addEventListener('load', resizework)
var start;
function resizework(){
    clearTimeout(start);
    start = setTimeout(menuBarEv, 150);    
}
function menuBarEv(){
    if(window.innerWidth >= 860){
        menuBarDivElem.removeEventListener('click', menuBarWork)
    }else if (window.innerWidth <= 859){
        menuBarDivElem.addEventListener('click', menuBarWork);
    }
}
for (let i = 0; i < attachedLiElems.length; i++){
    attachedLiElems[i].addEventListener("click", subDropWork)
    }
    
/* 전체메뉴 드롭다운 */
function dropMenuWork(e){
    e.preventDefault()
    var spanElm = this.children[0].children[0]
    if(this.classList.contains('lnb_search-cancel')){
        e.stopPropagation()
        var self = this
        cancelWork(self)
    }else if(this.classList.contains('on')){
        spanElm.classList.remove('spanoff')
        cancelWork()
    }else{
        cancelWork()
        this.classList.add('on')
        spanElm.classList.add('spanoff')
    }
}
function cancelWork(self){
    console.log(self)
    if(dropBtn.classList.contains('on')){
        dropBtn.classList.remove('on')
    }else if(self){
        searchBtn.classList.remove('on')
        console.log(searchBtn)
    }
}

//네비게이션 메뉴
function menuBarWork(){
    if(menuBarDivElem.classList.contains('on')){
        menuBarDivElem.classList.remove('on')
        navElem.classList.remove('on')
    }else{
        menuBarDivElem.classList.add('on')
        navElem.classList.add('on')
    }
}         
function subDropWork (ev){
    ev.preventDefault()
    console.log(this)
    var targetUl = this.querySelector('ul')
    if(targetUl.className === 'on'){
        targetUl.className = ''
        this.className = ''
    }else {
        targetUl.className = 'on'
        this.className = 'on'
    }
}
