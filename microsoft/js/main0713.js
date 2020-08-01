//lnb click and drop menu

const dropBtn = document.querySelector('.gnb_util > li > .lnb_drop_btn')
const dropUlElem = document.querySelector('.gnb_util > li > ul')
const dropLIElems = document.querySelectorAll('.gnb_util > li')
const dropSpanElms = document.querySelectorAll('.gnb_util > li span')
console.log(dropSpanElms[0].className)
dropBtn.addEventListener('click', dropmenu)

//console.log(a.includes('on'))
//var a = dropUlElem.classList//담겼다. 배열????
//console.log(a.includes('on'))
//console.log(a)
//a.isArry() a는 배열???
//    var menuLi = dropUlElem.children[0]
//한 태그의 클래스명이 여러개인 경우 classList에서 이름을 배열로 가져와서 저장... 후 
//배열에서 값을 검색하여 있으면true 없으면 false 반환하고
//false면 classLIst.add('')해주고 싶었다... 

console.log(Array.isArray(dropUlElem.classList))// 유사배열 push와는 다르게 쓰임 문장구조가 다름
// /dropSpanElms[0].classList.contains('on') 을 활용하여 만들기


//is not a function error
// function dropmenu(){
//     if(dropUlElem.classList.includes('on') && dropUlElem.classList.includes('lnb_drop')){
//         dropUlElem.classList.remove('on')
//     }else if(dropUlElem.classList.includes('lnb_drop')){
//         dropUlElem.classList.add('on')
//     }
// }
console.log(dropSpanElms[0])
console.log(dropLIElems[0])
function dropmenu(){
    if(dropUlElem.className === '' && dropLIElems[0].className ==='' && dropSpanElms[0].className === ''){
        dropUlElem.className='on';
        dropLIElems[0].className='on';
        dropSpanElms[0].className='spanoff';

        //return dropmenuLi()
    }else if(dropUlElem.className === 'on' && dropLIElems[0].className === 'on' && dropSpanElms[0].className ==='spanoff'){
        dropUlElem.className = '';
        dropLIElems[0].className = '';
        dropSpanElms[0].className = '';
        }
}


const containElem = document.querySelector('.container')
console.log(containElem)
containElem.addEventListener('click', removeDrop)
function removeDrop(ev){
    console.log(ev)
    if (dropUlElem.className === 'on' && dropLIElems[0].className === 'on' && dropSpanElms[0].className ==='spanoff'){
        dropUlElem.className = '';
        dropLIElems[0].className = '';
        dropSpanElms[0].className = '';
    }
}

//경우/ on일때 바디를 선택하는 경우 사라진다.

// function dropmenuLi(){
//     var menuLi = dropLIElems[0].className
//     if (menuLi.className === ''){
//         menuLi.className = 'on';
//     }else if(menuLi.className === 'on'){
//         menuLi.className = '';
//     }
// }
const serchLiElem = dropLIElems[1]
const hidedLiElem = dropLIElems[2]
const cancellationBtn = document.querySelector('button.lnb_search-cancel')
console.log(cancellationBtn)
console.log(serchLiElem.classList.contains('lnb_search-hide'))

serchLiElem.addEventListener('click', showSearchBox)
cancellationBtn.addEventListener('click', cancellationWork)

function showSearchBox(ev){
    if(hidedLiElem.classList.contains('on')){
        console.log("0")
        cancellationWork()
    }else if( hidedLiElem.classList.contains('lnb_search-hide')){
        console.log("1")
        hidedLiElem.classList.add('on')
    }
}
function cancellationWork(ev){
    ev.preventDefault()
    hidedLiElem.classList.remove('on')
}

//gnbMenuBar

const headerElem = document.querySelector('.header_wrap')
console.log( headerElem)
const menuBarDivElem = document.createElement('div')
const menuBarElemFirst = document.createElement('span')
const menuBarElemSecond = document.createElement('span')
const menuBarElemThird = document.createElement('span')
const gnbMenuUlElem = document.querySelector('.gnb_menu')
menuBarDivElem.className = 'gnbmenu_bar-box'
menuBarElemFirst.className = 'gnbmenu_bar1'
menuBarElemSecond.className = 'gnbmenu_bar2'
menuBarElemThird.className = 'gnbmenu_bar3'

headerElem.appendChild(menuBarDivElem)

menuBarDivElem.appendChild(menuBarElemFirst)
menuBarDivElem.appendChild(menuBarElemSecond)
menuBarDivElem.appendChild(menuBarElemThird)


const gnbUtilElem = document.querySelector('.gnb_util > li > ul')
const navElem = document.querySelector('nav')
var ulElem

window.addEventListener('resize', resizework)
window.addEventListener('load', resizework)
function resizework(){
    clearTimeout(start);
    start = setTimeout(진짜할일, 150)  ;    
}
//.window.innerWidth > 859 
var start;
function 진짜할일(){
    //console.log('1')
    if(window.innerWidth >= 860){
        menuBarDivElem.removeEventListener('click', menuBarWork)
    }else if (window.innerWidth <= 859){
        menuBarDivElem.addEventListener('click', menuBarWork);
    }
}

function menuBarWork(){
    if(menuBarDivElem.classList.contains('on')){
        menuBarDivElem.classList.remove('on')
        navElem.classList.remove('on')
    }else if(menuBarDivElem.classList.contains('gnbmenu_bar-box')){
        menuBarDivElem.classList.add('on')
        navElem.classList.add('on')
    }
}         

//const attachedUl = document.querySelector('nav > .attachedul')
//console.log(attachedUl)
var attachedLiElems = document.querySelectorAll('.attachedul > li')

for (let i = 0; i < attachedLiElems.length; i++){
attachedLiElems[i].addEventListener("click", innerDrop)
}

function innerDrop (ev){
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
// const pauseBtn =  document.createElement('button')
// const pauseBtnSpan1 = document.createElement('span')
// const pauseBtnSpan2 = document.createElement('span')
// const pauseBtnLocation = document.querySelector('.bx-pager')
// console.log(pauseBtnLocation)