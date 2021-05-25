export default function(){
    const menu = document.querySelector('nav.header_main-menu');
    // const menu = document.querySelector(".header_main-menu > ul");
    menu.addEventListener("mouseover", overWork);
    menu.addEventListener("mouseout", outWork);
    function overWork(e){
        // h2 태그는 css {pointer-evetns: none;}
        let menuList = e.target.parentNode;
        if(e.target.classList.contains("main_menu-list")){
            menuList.classList.add("on")
        }else{
            return
        }
    };


    function outWork(e){
        let preTarElem = e.target;
        let crrTarElem = e.relatedTarget;
        function opendedLnb(){
        while(crrTarElem.tagName !== "HTML"){
            if(preTarElem.parentNode === crrTarElem ){
                return true;
            }
            crrTarElem = crrTarElem.parentNode
        }
        return false;
        }
        
    }
    // function outWork(e){
    //     // 소거할 것을 소거하는 방식
    //     // 1. pretarget이 A태그일 때, (메인 메뉴의 A // LNB의 A)
    //     //      -crrtarget이 메인 메뉴 목록인 경우 : 동일한 LI(부모)가 아니면 동일목록이 아니므로 pre 지우고 동일목록이면 통과
    //     //      -crrtarget이 메인 메뉴가 아닌 모든 경우의 수 : 모두 지우기 함수로 이동. 모두 지울 것을 지운다. (LNB의 A도 모두지우기로 이동)
    //     // 2. pretarget이 A태그가 아닐 때,
    //     //      -crrtarget이 메인 메뉴 목록인 경우 : pretarget이 열린 lnb목록인 경우 UL >> UL의 부모의 부모LI와 동일한지 비교 동일목록이면 통과
    //     //      -crrtarget이 메인 메뉴가 아닌 모든 경우의 수 : 모두 지우기 함수로 이동
    //     // 3. 모두지우기 함수!
    //     //      -crrtarget이 HTML, BODY, HEADER, DIV, NAV인 경우 모두 지워준다.
    //     //      -crrtarget이 HEADER인 경우 [Header [DIV_Wrap기능[div(logo), nav, nav...]]] 중앙 위치한 div 외 여백에 커서가 가면 지운다.
    //     //      -crrtarget이 DIV인 경우 lnb의 div.lnb_wrap 제외
    //     //      -crrtarget이 NAV 경우 header_sub-menu 제외
        
    //     e.stopPropagation()
    //     let preTarElem = e.target;
    //     let crrTarElem = e.relatedTarget;
    //     let preTarLiElem;
    //     let crrTarLIElem;
    //     console.log(preTarElem)
    //     console.log(crrTarElem)
    //     if(crrTarElem == null || crrTarElem == undefined){
    //         allListsRemove();
    //         return;
    //     }
    //     if(preTarElem.tagName == 'A'){
    //         console.log('PRE : A');
    //         if(crrTarElem.classList.contains('main_menu-list')){
    //             if(preTarElem.parentNode !== crrTarElem.parentNode){
    //                 console.log('remove')
    //                 preTarLiElem = preTarElem.parentNode;
    //                 removeClassName(preTarLiElem);
    //             }else{ return };
    //         }else{
    //             console.log('PRE : A move all');
    //             removeAll(crrTarElem); 
    //         };
    //     }else if(preTarElem.tagName !== 'A'){
    //         console.log('PRE : Not A');
    //         if(crrTarElem.classList.contains('main_menu-list')){
    //             preTarLiElem = preTarElem.parentNode.parentNode;
    //             crrTarLIElem = crrTarElem.parentNode;
    //             console.log("NOTA preTarLiElem")
    //             console.log(preTarLiElem)
    //             if(preTarLiElem !== crrTarLIElem){
    //                 removeClassName(preTarLiElem);
    //             }else{return}
    //         }else{
    //             console.log('PRE : Not A moveAll');
    //             removeAll(crrTarElem);
    //         };
    //     };
    // };
    // function removeAll(crrTarElem){
    //     console.log("모두지우기")
    //     console.log(!crrTarElem.classList.contains('lnb_wrap'))
    //     if(crrTarElem.tagName == 'HTML' || crrTarElem.tagName == 'BODY' ||  crrTarElem.tagName == 'HEADER' ||  crrTarElem.tagName == 'SECTION'){
    //         allListsRemove();
    //     }else if(crrTarElem.tagName == 'DIV' && !crrTarElem.classList.contains('lnb_wrap')){
    //         console.log('div')
    //         allListsRemove();
    //     }else if(crrTarElem.tagName == 'NAV' && crrTarElem.classList.contains('header_sub-menu')){
    //         allListsRemove();
    //     }else if(crrTarElem.tagName == "IMG"){
    //         allListsRemove();
    //     }else{
    //         console.log('어디가')
    //         console.log(crrTarElem)
    //     }
    // };
    // function removeClassName(preTarLiElem){
    //     preTarLiElem.classList.remove('on');
    // };
    // function allListsRemove(){
    //     let menulists = document.querySelectorAll('.header_main-menu > ul > li');
    //     Array.prototype.forEach.call(menulists, (menulists)=> {
    //         menulists.classList.remove('on');
    //     });
    // };
    // const searchBtn = document.querySelector('.sub-menu-search-btn');
    // const inputElem = document.querySelector('#totalsearch')
    // searchBtn.addEventListener('click', showSearchBox);
    // const aElemHref = searchBtn.href;
    // function showSearchBox(ev){
    //     // ev.preventDefault();
    //     const searchLiElem = document.querySelector('.sub-menu-search');
    //     if(searchLiElem.classList.contains('on')){
    //         console.log('OnOn');
    //         if(inputElem.value == "" || inputElem.value == null || inputElem.value == undefined){
    //             alert("검색어를 입력하세요.");
    //         }else{
    //             searchBtn.href = aElemHref;
    //         };
    //     }else{
    //         searchLiElem.classList.add('on');
    //         searchBtn.href = `${searchBtn.href}#`;
    //     }
    // }
}