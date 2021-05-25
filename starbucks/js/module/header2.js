export default function(){
    console.log('헤더')
    const menu = document.querySelector('nav.header_main-menu > ul');
    menu.addEventListener("mouseover", overWork);
    menu.addEventListener("mouseout", outWork);
    let menuList;
    function overWork(e){
        // h2 태그는 css {pointer-evetns: none;}
        console.log(menuList)
        if(e.target.classList.contains("main_menu-list")){
            menuList = e.target.parentNode;
            menuList.classList.add("on")
        }else{
            return
        }
    };
    function outWork(e){
        let preTarElem = e.target;
        let crrTarElem = e.relatedTarget;
        // console.log(preTarElem)
        // console.log(crrTarElem)
       if(!checkLnbOpended()){
            // console.log('모두지우기')
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
    const searchBtn = document.querySelector('.sub-menu-search-btn');
    const inputElem = document.querySelector('#totalsearch')
    searchBtn.addEventListener('click', showSearchBox);
    const aElemHref = searchBtn.href;
    function showSearchBox(ev){
        // ev.preventDefault();
        // a태그 href 기능
        const searchLiElem = document.querySelector('.sub-menu-search');
        if(searchLiElem.classList.contains('on')){
            console.log('OnOn');
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
}