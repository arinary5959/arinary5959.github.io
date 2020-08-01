//노드선택
const htmlElem = document.querySelector('html')
const headerWrap = document.querySelector('.header_wrap')
const slideLiElems = document.querySelectorAll('.slide > li')
const logoImgElem = headerWrap.querySelector('.logo > img')
const menuArrowIcon = headerWrap.querySelector('.main_menu-list:nth-child(6) > a > span')
const utilMenuUlElem = headerWrap.querySelector('.lang')

window.addEventListener('scroll', ()=> {
    var scrollSize = htmlElem.scrollTop
    if()
})


var opt = {
    onSlideBefore: function(){
        var num = this.getCurrentSlide();
        setBg(num)
        },
    mode:'fade',
    auto: true,
    pager: true,
    pagerType: 'short',
    pagerShortSeparator:' | '
    }
$('.slide').bxSlider(opt)

