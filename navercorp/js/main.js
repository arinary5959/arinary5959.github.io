const menuBarBtnDiv = document.querySelector('.sitemap_box')
const bar1 = menuBarBtnDiv.querySelector('bar_1')
const bar2 = menuBarBtnDiv.querySelector('bar_2')
const bar3 = menuBarBtnDiv.querySelector('bar_3')
const hiddenNav = document.querySelector('.hidden_nav')
const headerUtilDiv = document.querySelector('.header_util_wrap')
const headerElem = document.querySelector('header')
menuBarBtnDiv.addEventListener('click', dropMenu)

function dropMenu(){
    if(menuBarBtnDiv.classList.contains('on')){
        menuBarBtnDiv.classList.remove('on');
        hiddenNav.classList.remove('on');
        headerUtilDiv.classList.remove('on');
        headerElem.classList.remove('on')
    }else if(menuBarBtnDiv.classList.contains('sitemap_box')){
        menuBarBtnDiv.classList.add('on');
        hiddenNav.classList.add('on');
        headerUtilDiv.classList.add('on');
        headerElem.classList.add('on')
    }
}