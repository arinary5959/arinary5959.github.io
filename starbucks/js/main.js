// 윈도우 로드워크
window.addEventListener("load", loadWork);
function loadWork(){
    console.log('윈도우로드');
    // scrollWork();
    sizeCheck()
}
window.addEventListener('resize', resizeWork)
let resize
let windowWidth = window.innerWidth;
function resizeWork(){
    clearTimeout(resize)
    resize = setTimeout(sizeCheck, 150)
    console.log('윈도우리사이즈')
}
function sizeCheck(){
    console.log('사이즈체크')
    console.log(menu)
    windowWidth = window.innerWidth;
    if(windowWidth > 960){
        console.log('위드 넓게')
        menu.addEventListener("mouseover", overWork);
        menu.addEventListener("mouseout", outWork);
        // 슬라이드부분
        sliderUl.style.transform = `translateX(-${(size * (counter))}px )`
    }else if(windowWidth <= 960){
        console.log('위드 좁게')
        menu.removeEventListener("mouseover", overWork);
        menu.removeEventListener("mouseout", outWork);
        // 슬라이드부분
        sliderUl.style.transform = `translateX(-${size}px)`
        sliderUl.style.transform = `translateX(-${(size * (counter))}px )`
    }
}

// 메인 헤더 워크
const menu = document.querySelector('nav.header_main-menu > ul');
let menuList;
function overWork(e){
    // h2 태그는 css {pointer-evetns: none;}
    console.log(menuList)
    console.log('overwork')
    if(e.target.classList.contains("main_menu-list")){
        menuList = e.target.parentNode;
        menuList.classList.add("on")
    }else{
        return
    }
};
function outWork(e){
    console.log('헤더워크')
    // let preTarElem = e.target;
    let crrTarElem = e.relatedTarget;
    // console.log(preTarElem)
    // console.log(crrTarElem)
    if(!checkLnbOpended()){
        menuList.classList.remove('on');
    }
    function checkLnbOpended(){
        if(crrTarElem == null)return
        while(crrTarElem.tagName !== "HTML"){
            if(menuList === crrTarElem ){
                return true;
            }
            crrTarElem = crrTarElem.parentNode
        }
        return false;
        }
}
// 서치 버튼
const searchBtn = document.querySelector('.sub-menu-search-btn');
const inputElem = document.querySelector('#totalsearch')
searchBtn.addEventListener('click', showSearchBox);
const aElemHref = searchBtn.href;
function showSearchBox(ev){
    // ev.preventDefault();
    // a태그 href 기능
    const searchLiElem = document.querySelector('.sub-menu-search');
    if(searchLiElem.classList.contains('on')){
        // console.log('OnOn');
        if(inputElem.value == "" || inputElem.value == null || inputElem.value == undefined){
            alert("검색어를 입력하세요.");
        }else{
            searchBtn.href = aElemHref;
        };
    }else{
        searchLiElem.classList.add('on');
        searchBtn.href = `${searchBtn.href}#`;
    }
}

// section 1 inrto 메인 인트로 이미지
const heroItems = document.querySelectorAll('section.primary_01 > div.intro > div > div');
const textLink = document.querySelector('.text-link');
// console.log(heroItems);

// main img 보여줄 순서 정보
let ordered= [3, 2, 4, 1, 0];
    ordered.forEach((ordered, time)=>{
        setTimeout(() => {
            // console.log(time) 0,1,2,3,4...
            heroItems[ordered].classList.add('on');
            if(Array.prototype.includes.call(heroItems[ordered].children, textLink)){
                // console.log(time) 4
                setTimeout(()=>{
                    textLink.classList.add('on');
                }, time * 600 / 4);
            }else{
                return
            }
        }, time * 600);
    });  

// 슬라이드 : 노티스 프로모션 클릭워크 notice-promotion-click-opensldie
const openSlideBox = document.querySelector('div.primary_01-slider')
const opendSlide = document.querySelector('a.open-slide');
const opendSlideBtn = opendSlide.querySelector('span > img');
const sliderUl = document.querySelector('.primary_01-slider > div > ul');
const slideBtns = document.querySelectorAll('.slider-btn > div');
const slidLiElems = document.querySelectorAll('.primary_01-slider > div > ul > li');

sliderUl.prepend(slidLiElems[slidLiElems.length - 1].cloneNode(true));
sliderUl.append(slidLiElems[0].cloneNode(true));

const slideItems = sliderUl.querySelectorAll('li');
slideItems[0].classList.add('lastCloned')
slideItems[slideItems.length - 1].classList.add('firstCloned')
// 슬라이드 변수
let size =  slidLiElems[0].clientWidth;
let counter = 1;
let loopNextSlide ;
let autocontroll = true;
// 슬라이드 1번째 조정
sliderUl.style.transform = `translateX(-${size}px)`
   
// 슬라이드 열기
opendSlide.addEventListener('click', openSlideWork);
function openSlideWork(e){
    e.preventDefault()
    // console.log('click')
    // console.log(e.target)
    if(e.target.tagName !== "A")return;
    if(e.target.classList.contains('on')){
        e.target.classList.remove('on')
        openSlideBox.classList.remove('on')
        autocontroll = false
    }else{
        e.target.classList.add('on')
        opendSlideBtn.style.transform = "rotate(180dge)"
        openSlideBox.classList.add('on')
        // sliderWork(windowWidth, true)
        autocontroll = true
        autocontroler()
        sliderUl.style.transform = `translateX(-${size}px)`
        slideItems[1].classList.add('active')
    }
}
// 슬라이드 버튼 및 next prev
Array.prototype.forEach.call(slideBtns, (slideBtns)=>{
    slideBtns.addEventListener("click", slideClick)
})
function slideClick (e){
    // console.log(e.target)
    if(e.target.classList.contains('slider-btn'))return
    if(e.target.classList.contains('next-btn')){
        nextSlide()
    }else if(e.target.classList.contains('prev-btn')){
        prevSlide()
    }
}
function nextSlide (){
    // console.log('nextSlide')
    // console.log(counter)
    if(counter == slideItems.length - 2 ){
        // console.log('first')
        sliderUl.style.transform = `translateX(-${size}px)`
        counter = 1
        // slideItems[counter].style.opacity = "1"
        opacityActive(counter)
    }else{
        // slideItems[counter + 1].style.opacity = "1"
        counter++
        sliderUl.style.transform = `translateX(-${(size * (counter))}px )`
        // sliderUl.style.transform = `translateX(-${(size * (counter + 1))}px )`
        // return counter++
        opacityActive(counter)
    }
}
function prevSlide(){
    if (counter <= 1 ){
        // console.log('last')
        sliderUl.style.transform = `translateX(-${size * (slideItems.length - 2)}px )`
        counter = slideItems.length - 2
        slideItems[counter].style.opacity = "1"
        opacityActive(counter)
    }else{
        counter--
        sliderUl.style.transform = `translateX(-${(size * (counter))}px )`
        opacityActive(counter)
    }
}
// 페이져 워크
const pagersUtill = document.querySelector('.slider-pager');
const pagersBtn = pagersUtill.querySelectorAll('.slider-pager > div')
pagersUtill.addEventListener("click", pagersWork)

function pagersWork(e){
    // console.log(e.target)
    let pagerNum
    if(e.target.classList.contains('round-btn')){
        // console.log(Array.prototype.indexOf.call(pagersBtn, e.target))
        // Array.prototype.forEach.call(pagersBtn, (pagersBtn)=>{
        //     pagersBtn.classList.remove('on')
        // })
        console.log(e.target)
        pagersBtn.forEach(pagersBtn => {
            pagersBtn.classList.remove('on')
        })
        // e.target.classList.add('on')
        pagerNum = Array.prototype.indexOf.call(pagersBtn, e.target)
        sliderUl.style.transform = `translateX(-${size * (pagerNum)}px )`
        pagersBtn[pagerNum].classList.add('on')
        opacityActive(pagerNum)
    }else if(e.target.classList.contains('autocontroller')){
        // console.log('autocontroller')
        // autocontroller의 하위 div는 ponter-event:none, autocontroller만 인식되도록 함
        if(e.target.classList.contains('pause')){
            e.target.classList.remove('pause')
            autocontroll = true
            autocontroler()
        }else{
            // console.log('pause')
            e.target.classList.add('pause')
            autocontroll = false
            autocontroler()
        }
    }
}
// 오토컨트롤
function autocontroler (){ 
    // console.log(autocontroll)
    if(autocontroll){
        loopNextSlide = setInterval(()=>{nextSlide()}, 3000);
    }else if (autocontroll == false){
        clearInterval(loopNextSlide)
    }
};
function opacityActive(sldieNum){
    console.log(slideItems[sldieNum])
    // slideItems[sldieNum].style.opacity = "1"
    slideItems.forEach(slideItems =>{
        slideItems.classList.remove('active')
    })
    slideItems[sldieNum].classList.add('active')
}

// 
// 공지사항 json data 활용하여 만들기(TEST)
// const dataUrl = 'http://www.json-generator.com/api/json/get/cexOzVPumq?indent=2';
// const reqObj = new XMLHttpRequest();
// reqObj.open('GET', dataUrl);
// reqObj.responseType = 'json';
// reqObj.send();
// reqObj.onload = function() {
// 	const eulsooData = reqObj.response;
// 	tabmenu(eulsooData);
// }


// section 2 ~ 6 스크롤이벤트
const html = document.querySelector('html');
    // section 2
const newyearbeanPorduct = document.querySelector('.newyearbean-porduct');
const newyearbeanTxt = document.querySelector('.newyearbean-txt');
    // section 3
const reserveProduct = document.querySelector('.reserve-product');
    // section 4
const favoriteTxts = document.querySelectorAll('.favorite-txt > div ');
    // section 5
const magazineTxts = document.querySelectorAll('.magazin-txt > .txt-box');
    // section 6
const storeImgElems = document.querySelectorAll('.primary_06-store > div > div:first-child > img')
const storeTxts = document.querySelectorAll('.primary_06-store > div > div:nth-child(2) > div')
    //이벤트 관련 정보
const addOnElems = [newyearbeanPorduct, newyearbeanTxt, reserveProduct, favoriteTxts, magazineTxts, storeImgElems, storeTxts]
// console.dir(storeTxts)
// console.dir(body)
// console.dir(window.scrollX)
window.addEventListener('scroll', scrollWork)
let start;
let scrollLocation = 0;
function scrollWork(){
    clearTimeout(start);
    start = setTimeout(scrollTodo, 150);
}
function scrollTodo() {
    // console.log(scrollLocation)
    // console.log(html.scrollTop)
    if(scrollLocation < html.scrollTop){
        console.log('증가')
        scrollLocation = html.scrollTop
        increase(scrollLocation)
    }else if(scrollLocation > html.scrollTop){
        console.log('감소')
        scrollLocation = html.scrollTop
    }
}
// 이하 코드는 정리되었으나 이벤트워크 이행 시 딜레이 발생.
// function increase(){
//     if(scrollLocation >= 399 && scrollLocation < 998){
//         // section 2
//         // html.scrollTop = 1200
//         addOnClassName(1)
//     }else if(scrollLocation >= 998 && scrollLocation < 1299){
//         // section 3
//         addOnClassName(2)
//         // html.scrollTop = 1200
//     }else if(scrollLocation >= 1299 && scrollLocation < 1899){
//         // section 4
//         addOnClassName(3)
//     }else if(scrollLocation >= 1899 && scrollLocation < 2799){
//         // section 5
//         addOnClassName(4)
//     }else if(scrollLocation >=2799){
//         // section 6
//         addOnClassName(6)
//     }
// }
// function addOnClassName (num){
//     console.log('addon')
//     for (let i = 0; i <= num; i++) {
//         if(addOnElems[i].length == undefined){
//             addOnElems[i].classList.add('on');
            
//         }else if(addOnElems[i].length){
//             let arrayLikeObj = addOnElems[i]
//             Array.prototype.forEach.call(arrayLikeObj, (arrayLikeObj, time)=>{
//                 setTimeout(()=>{
//                     arrayLikeObj.classList.add('on');
//                 }, time * 200 )
//             })
//         }
//         console.log(i)
//         console.log(addOnElems[i])
//     }
// }


function increase(){
    if(scrollLocation >= 399 && scrollLocation < 998){
        newyearbeanPorduct.classList.add('on')
        newyearbeanTxt.classList.add('on')
        // addOnClassName(1)
    }else if(scrollLocation >= 998 && scrollLocation < 1299){
        newyearbeanPorduct.classList.add('on')
        newyearbeanTxt.classList.add('on')

        reserveProduct.classList.add('on')
        // addOnClassName(2)
    }else if(scrollLocation >= 1299 && scrollLocation < 1899){
        console.log(111)
        newyearbeanPorduct.classList.add('on')
        newyearbeanTxt.classList.add('on')

        reserveProduct.classList.add('on')

        Array.prototype.forEach.call(favoriteTxts, (favoriteTxts, time)=>{
            setTimeout(()=>{
                favoriteTxts.classList.add('on');
            }, time * 200 )
        })
        // addOnClassName(3)
    }else if(scrollLocation >= 1899 && scrollLocation < 2799){
        console.log(magazineTxts)
        newyearbeanPorduct.classList.add('on')
        newyearbeanTxt.classList.add('on')
        reserveProduct.classList.add('on')
        Array.prototype.forEach.call(favoriteTxts, (favoriteTxts, time)=>{
            setTimeout(()=>{
                favoriteTxts.classList.add('on');
            }, time * 200 )
        })
        Array.prototype.forEach.call(magazineTxts, (magazineTxts, time)=>{
            setTimeout(()=>{
                magazineTxts.classList.add('on');
            }, time * 200 )
        })
        // addOnClassName(4)
    }else if(scrollLocation >=2799){
        console.log(magazineTxts)
        newyearbeanPorduct.classList.add('on')
        newyearbeanTxt.classList.add('on')
        reserveProduct.classList.add('on')
       
        Array.prototype.forEach.call(favoriteTxts, (favoriteTxts, time)=>{
            setTimeout(()=>{
                favoriteTxts.classList.add('on');
            }, time * 200 )
        })
        Array.prototype.forEach.call(magazineTxts, (magazineTxts, time)=>{
            setTimeout(()=>{
                magazineTxts.classList.add('on');
            }, time * 200 )
        })
        storeImgElems[0].classList.add('on')
        storeImgElems[1].classList.add('on')
        Array.prototype.forEach.call(storeTxts, (storeTxts, time)=>{
            setTimeout(()=>{
                storeTxts.classList.add('on');
            }, time * 200 );
        })
        // addOnClassName(6)
    }
}

// 모바일 워크

// 모바일 메인메뉴

const mobMenuMystar = document.querySelector('.header_sub-menu > ul > li:nth-child(3)') ;
const mobMenuFirNav = document.querySelector('.header_sub-menu') ;
const mobMenuIcon = document.querySelector('.mob-gnb-menu') ;
const mobMenuUl = document.querySelector('.header_main-menu > ul') ;
const mobMenuLists = document.querySelectorAll('.main_menu-list');
const wrapElem = document.querySelector('.wrap') ;
mobMenuIcon.addEventListener('click', mobClickWork)
mobMenuMystar.addEventListener('click', mbSubClick);
function mbSubClick(e){
    console.log(e.target)
    e.preventDefault();
    const mystarSub = document.querySelector('.mystarbucks-submenu');
    if(!(e.target.classList.contains('sub-menu-mystar') || e.target.classList.contains('sub-menu-mystar-i')))return
    if(mystarSub.classList.contains('on')){
        mystarSub.classList.remove('on')
    }else{
        mystarSub.classList.add('on');
        mobMenuFirNav.classList.add('on');
    }
}
function mobClickWork(e){
    e.preventDefault();
    if(wrapElem.classList.contains('on')){
        wrapElem.classList.remove('on');
        mobMenuIcon.querySelector('img').src = './images/header/btn_berger_m.png';
    }else{
        wrapElem.classList.add('on');
        mobMenuIcon.querySelector('img').src = './images/header/btn_gnb_close.png';
    }
}
// console.log(mobMenuUl);
// console.log(mobMenuLists);
// mobMenuUl.addEventListener('click', openMobLnb);
// function openMobLnb(e){
//     e.preventDefault();
//     console.log(Array.prototype.indexOf.call(mobMenuLists, e.target));
//     console.log(e.target);
//     let clickedIndex = Array.prototype.indexOf.call(mobMenuLists, e.target);
//     if(!(e.target.tagName == 'A' || e.target.tagName == 'I'))return
//     if(e.target){
//         console.log(clickedIndex)
//         // console.log(mobMenuLists[clickedIndex])
//         // console.log(mobMenuLists[`${clickedIndex}`])
//         mobMenuLists[clickedIndex].parentNode.classList.add('on')
//     }
    
// }