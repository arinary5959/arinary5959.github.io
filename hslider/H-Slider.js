// window.onload = () => {
//     HSlider({
//         el:'.slider',
//         mode:'horisontal',                // horizontal, vertical, fade, --horizontal(여러개보이는경우)
//         auto: true,             // boolean
//         autoControler: true,    // boolean
//         pager: true,            // boolean
//         Infinity: true,         // boolean
//         speed: 2000,
//     });
//     // HSlider({
//     //     el:'.slider2',
//     //     mode:'horisontal',                // horizontal, vertical, fade, --horizontal(여러개보이는경우)
//     //     auto: true,             // boolean
//     //     autoControler: true,    // boolean
//     //     pager: true,            // boolean
//     //     Infinity: true,         // boolean
//     //     speed: 2000,
//     // })
// }

function HSlider(obj) {
    // console.log(obj)
    class CreateHSlider {
        constructor(obj){
            this.el = obj.el;                                                       // 필수 클래스명으로 입력
            this.mode = obj.mode || 'horizontal';                                   // 디폴트는 horizontal, 디폴드값이 있어서 필수아님
            this.auto = (obj.auto || obj.auto == undefined) ? true: false;          // 기본 셋팅은 모두 true값이고 입력하지 않아도 true
            this.pause = (obj.pause || obj.pause == undefined) ? true: false;
            this.pager = (obj.pager || obj.pager == undefined) ? true: false;
            this.Infinity = (obj.Infinity || obj.Infinity == undefined) ? true: false;    
            this.speed = obj.speed || 2000;
            // this.subBtnInfo = this.pause || this.pager || this.pager == undefined || this.pause == undefined;
            this.subBtnInfo = !(!(this.pause) && !(this.pager))
            // elementinfo 
            // this.elWrap; // div
            // this.sliderView; // div > div 
            // this.sliderWrap;  // div > >div > ul
            // this.slideItems;    // ul> li
            // this.slideItemsCloned;
            console.log(!(!(this.pause) && !(this.pager)))
            // 준비

            // getElment

            // getElment()
            
            // set
            this.createSubBtn = this.subBtnInfo
            this.createPause = this.pause;
            this.createPagers = this.pager;
            // this.autoSwitch = this.auto;
            // 준비 끝
            
            // 실행
            this.start();
            
            // console.log(this.mode)
            // console.log(this.auto)
            // console.log(this.pause)
            // console.log(this.pager)
            // console.log(this.Infinity)
            // console.log(this.speed)
        }
        
        counter = 1
       
        // get함수가 계속 실행되어 일반메서드로 바꿈
        get elWrap() {
            return document.querySelector(this.el);
        }
        get sliderView() {
            this.elWrap.children[0].classList.add('HJSlider_View');
            return this.elWrap.children[0];
        }
        get sliderWrap() {
            this.sliderView.children[0].classList.add('sliderBelt');
            return  this.sliderView.children[0]
        }
        get slideItems() {
            Array.prototype.forEach.call(this.sliderWrap.children, slideItems => {
                slideItems.classList.add('slideItems')
            })
            return this.elWrap.querySelectorAll('.slideItems')
            // return this.sliderWrap.children
        }
        set createSubBtn (subBtnInfo) {
            console.log(subBtnInfo)
            if(subBtnInfo == true){
                const subBtn = document.createElement('div')
                subBtn.classList.add('subBtnWrap');
                this.elWrap.appendChild(subBtn)
                this.subBtn = subBtn;
            }else {
                console.log('do not make sub-btn');
            }
        }
        set createPause(pause) {
            // console.log('set')
            console.log(this.subBtn)
            if( pause == true || pause == undefined ){
                const pauseWrap = document.createElement('div');

                pauseWrap.classList.add('pauseWrap');
                this.subBtn.appendChild(pauseWrap);
                this.pauseWrap = pauseWrap;

                const pauseWrapEl = this.subBtn.querySelector('.pauseWrap');

                pauseWrapEl.appendChild(document.createElement('div'));
                pauseWrapEl.children[0].classList.add('pause');
                this.pause = pauseWrapEl.children[0];
                
            }else if ( pause == false){
                console.log('do not make pause');
            };
        }

        set createPagers(pager){
            // console.log(pager)
            if( pager == true || pager == undefined ) {
                // console.log('make pagers')
                // console.log(this.sliderWrap.children.length)
                const pagersCount = this.sliderWrap.children.length;
                const pagerWrap = document.createElement('div');

                pagerWrap.classList.add('pagerWrap');
                this.subBtn.appendChild(pagerWrap);
                this.pagerWrap = pagerWrap;
                
                const pagerWrapEl = this.subBtn.querySelector('.pagerWrap');
                let pagers = [];
                this.pagers = pagers;

                for(let i = 0; i < pagersCount; i++){
                    pagers[i] = document.createElement('div');
                    pagers[i].classList.add(`H-pager_${i+1}`);
                    // pagers[i].classList.add(`name2`);
                    pagerWrapEl.appendChild(pagers[i]);
                }
            }else if( pager == false) {
                console.log('do not make pagers')
            }
        }
        // set autoSwitch(auto) {
        //     // console.log(this)
        //     if (auto === true || auto === undefined) {
        //       this.timer = window.setInterval(() => {
        //         this.nextSlide();
        //       }, this.speed);
        //     } else if (auto === false) return;
        // }
        autoSwitch() {
            // console.log(this)
            if (this.auto === true || this.auto === undefined) {
              this.timer = window.setInterval(() => {
                this.nextSlide();
              }, this.speed);
            } else if (this.auto === false) return;
        }
        start() {
            // this.getElment(); get대체
            this.cloneItem();
            this.nextprevBtns()
            this.slidelayout();
            this.style();

            this.slideWork();
            this.autoSwitch()
        }
        cloneItem() {
            console.log('시작')
            console.log(this.slideItems)
            // first
            let firstItemCloned = this.slideItems[0].cloneNode(true)
            firstItemCloned.classList.add('firstItem_Cloned')
            // console.log(firstItemCloned)
            // last
            let lastItemCloned = this.slideItems[this.slideItems.length - 1].cloneNode(true)
            lastItemCloned.classList.add('lastItem_Cloned')
            // console.log(lastItemCloned)
            // attach
            this.sliderWrap.appendChild(firstItemCloned)
            this.sliderWrap.prepend(lastItemCloned)
            this.slideItemsCloned = this.sliderWrap.children;
            // console.log(this.slideItems) // 왜 같을까. 왜 수행 이후 값으로 변동되는 것일까.
            console.log(this.slideItemsCloned)
            console.log('끝')
        }
        nextprevBtns() {
            const nextprevBtnsWrap = document.createElement('div');
            const nextBtn = document.createElement('div');
            const prevBtn = document.createElement('div');
            const nextArrow = document.createElement('div');
            const prevArrow = document.createElement('div');
            nextprevBtnsWrap.classList.add('nextprevBtnsWrap');
            nextBtn.classList.add('nextBtn');
            prevBtn.classList.add('prevBtn');
            nextArrow.classList.add('nextArrow');
            prevArrow.classList.add('prevArrow');
            this.elWrap.appendChild(nextprevBtnsWrap);
            this.nextprevBtnsWrap = nextprevBtnsWrap;
            this.nextprevBtnsWrap.appendChild(prevBtn);
            this.nextprevBtnsWrap.appendChild(nextBtn);
            this.nextBtn = nextBtn;
            this.prevBtn = prevBtn;
            this.nextBtn.appendChild(nextArrow)
            this.prevBtn.appendChild(prevArrow)
            this.nextArrow = nextArrow;
            this.prevArrow = prevArrow;

        }
        style() {
            // console.log('style을 정의하세요')
            // console.log(`${this.itemWidth}px`)
            // mainBtn(nextprevBtn)
            let mainBtnSize = '50';
            let nextPrevBtns = [this.nextBtn, this.prevBtn];
            this.nextprevBtnsWrap.style.cursor = 'pointer'
            nextPrevBtns.forEach(nextPrevBtns => {
                nextPrevBtns.style.width = `${mainBtnSize}px`;
                nextPrevBtns.style.height = `${mainBtnSize}px`;
                nextPrevBtns.style.backgroundColor = `rgba(255,255,255,.5)`;
                nextPrevBtns.style.borderRadius = `${mainBtnSize / 2}px`;
            })
            this.nextBtn.style.float = `right`;
            this.prevBtn.style.float = `left`;
            this.nextBtn.style.marginRight = `20px`;
            this.prevBtn.style.marginLeft = `20px`;

            this.nextprevBtnsWrap.style.width = `${this.itemWidth}px`
            this.elWrap.style.position = 'relative';
            this.nextprevBtnsWrap.style.position = 'absolute';
            this.nextprevBtnsWrap.style.left = '50%';
            this.nextprevBtnsWrap.style.top = '50%';
            this.nextprevBtnsWrap.style.transform = 'translate(-50%, -50%)';

            let arrows = [this.nextArrow, this.prevArrow];
            arrows.forEach(arrows => {
                arrows.style.border = 'solid black';
                arrows.style.borderWidth = '0 3px 3px 0';
                arrows.style.display = 'inline-block';
                arrows.style.padding = '8px';
                arrows.style.cursor = 'pointer';
            })
            this.nextArrow.style.transform = 'translate(-10%, 80%) rotate(-45deg)';
            this.prevArrow.style.transform = 'translate(20%, 80%) rotate(135deg)';
           
            // subBtn(page, pause)
            if(this.subBtn){
                // this.subBtn.style.border = '1px solid blue'
            // this.pagerWrap.style.border = '1px solid black'
                let subBtnSize = 10
                // this.subBtnSize = 10
                if(this.pager && this.pause){
                    this.pagerBtnStyle(subBtnSize)
                    this.pauseBtnStyle(subBtnSize)
                }else if(this.pager) {
                    this.pagerBtnStyle(subBtnSize)
                }else if(this.pause){
                    this.pauseBtnStyle(subBtnSize)
                }
            }else {
                console.log('subBtn 만들지 않았음')
            }
        }
        pagerBtnStyle(subBtnSize) {
            this.pagerWrap.style.display = 'inline-block'
            
            this.pagers.forEach(pagers => {
                // console.log(pagers.style)
                pagers.style.display = 'inline-block'
                pagers.style.width = `${subBtnSize}px`
                pagers.style.height = `${subBtnSize}px`
                pagers.style.backgroundColor = '#ACABA7'
                pagers.style.borderRadius = `${subBtnSize / 2}px`
                pagers.style.marginLeft = '10px'
                pagers.style.cursor = 'pointer'
            });
            this.pagers[0].style.marginLeft = '0px'
        }
        pauseBtnStyle(subBtnSize) {
            // this.pauseWrap.style.border = '1px solid black'
            this.pauseWrap.style.display = 'inline-block'
            
            this.pause.style.display = 'inline-block'
            this.pause.style.width = `${subBtnSize}px`
            this.pause.style.height = `${subBtnSize}px`
            // this.pause.style.backgroundColor = '#ACABA7'
            this.pause.style.boxSizing = 'border-box'
            this.pause.style.borderLeft = '4px solid #ACABA7'
            this.pause.style.borderRight = '4px solid #ACABA7'
            this.pause.style.marginRight = '10px'
            this.pause.style.cursor = 'pointer'
        }
        slidelayout() {
            console.log('Slide Layout을 조정합니다')
            // this.elWrap 전체랩
            // this.sliderWrap ul
            // this.slideItems li*
            // this.slideItemsCloned licloned
            this.elWrap.style.textAlign = 'center'
            // this.elWrap.style.border = '1px solid black'
            // this.sliderWrap.style.border = '1px solid red'
            // ul
            // console.log(this.slideItemsCloned);
            // slideItemsCloned으로 진행
            // li
            Array.prototype.forEach.call(this.slideItems, (slideItems) => {
                slideItems.style.display = 'inline-block'
            })
            this.itemWidth = this.slideItems[0].clientWidth;
            this.itemHeight = this.slideItems[0].clientHeight;
            console.log(this.slideItemsCloned[1].clientWidth);
            console.dir(`${this.slideItemsCloned[1].clientWidth * this.slideItemsCloned.length}px`);
            // li태그에 img태그를 넣음, block일때 fit-cotent하기 위함 사유: IE 미지원
            this.sliderView.style.margin = '0 auto'
            this.sliderView.style.maxHeight = `${this.slideItemsCloned[1].clientHeight}px`
            this.sliderView.style.maxWidth = `${this.slideItemsCloned[1].clientWidth}px`
            this.sliderView.style.overflow = 'hidden'

            this.sliderWrap.style.display = 'inline-block'
            this.sliderWrap.style.width = `${this.slideItemsCloned[1].clientWidth * this.slideItemsCloned.length}px`
            this.sliderWrap.style.height = `${this.slideItemsCloned[1].clientHeight}px`
            Array.prototype.forEach.call(this.slideItemsCloned, slideItemsCloned => {
                // console.log(slideItemsCloned.style)
                slideItemsCloned.style.float = 'left'
            })
            this.sliderWrap.style.transform = `translateX(-${this.slideItemsCloned[1].clientWidth}px)`
            // this.sliderWrap.style.transition = 'transform 0.3s'
            if(this.mode == 'vertical') {
                Array.prototype.forEach.call(this.slideItemsCloned, slideItemsCloned => {
                    // console.log(slideItemsCloned.style)
                    slideItemsCloned.style.float = 'none'
                })
                this.sliderWrap.style.transform = `translateY(-${this.slideItemsCloned[1].clientHeight}px)`
                this.sliderWrap.style.width = `auto`
                this.sliderWrap.style.height = `auto`
            }
        }
        slideWork() {
            // this.autoSwitch()
            this.nextprevBtnsWrap.addEventListener('click', (ev) => {
                // console.log('클릭')
                // console.log(ev.target)
                let targetBtn = ev.target
                if(targetBtn.classList.contains('prevBtn') || targetBtn.classList.contains('prevArrow')){
                    this.prevSlide()
                }else if(targetBtn.classList.contains('nextBtn') || targetBtn.classList.contains('nextArrow')){
                    this.nextSlide()
                }

            })
            this.pauseWrap.addEventListener('click', (ev) => {
                console.log(ev.target)
                if(!ev.target.classList.contains('pause'))return
                if(ev.target.classList.contains('on')){
                    ev.target.classList.remove('on')
                    this.autoSwitch()
                    // style
                    // this.pause.style.backgroundColor = '#ACABA7';
                    this.pause.style.borderTop = '0px';
                    this.pause.style.borderBottom = '0px';
                    this.pause.style.borderLeft = '4px solid #ACABA7'
                    this.pause.style.borderRight = '4px solid #ACABA7'
                    this.pause.style.width = '10px';
                    this.pause.style.height = '10px';
                }else {
                    ev.target.classList.add('on')
                    window.clearTimeout(this.timer)
                    // style
                    this.pause.style.width = '0px';
                    this.pause.style.height = '0px';
                    this.pause.style.borderTop = '5px solid transparent';
                    this.pause.style.borderLeft = '8px solid #ACABA7';
                    this.pause.style.borderBottom = '5px solid transparent';
                    this.pause.style.borderRight = '2px solid transparent';
                    this.pause.style.backgroundColor = '';
                }
                
            })
            // console.log(this.pause)
            this.pagerWrap.addEventListener('click', (ev) => {
                console.log(ev.target)
                if(ev.target.classList.contains('pagerWrap'))return
                let pagerName = ev.target.classList;
                console.log(typeof pagerName) //obj
                let crrNameIndex;
                if(this.mode == 'horizontal' ){
                    for(let i = 0; i < pagerName.length; i++ ){
                        console.log(1)
                        pagerName[i].includes('H-pager_') ? crrNameIndex = i: false;
                        console.log(pagerName[i].includes('H-pager_'))
                    }
                    console.log(pagerName[crrNameIndex].split('_'))
                    let nameArr = pagerName[crrNameIndex].split('_')
                    this.crrPage = nameArr[nameArr.length - 1]
                    console.log(this.crrPage)
                    this.sliderWrap.style.transform = `translateX(-${(this.itemWidth * this.crrPage + 1)}px)`
                    console.log(`페이져슬라이드(-${(this.itemWidth * this.crrPage + 1)}px)`)
                    this.counter = this.crrPage++;
                }else if( this.mode == 'vertical' ){
                    for(let i = 0; i < pagerName.length; i++ ){
                        console.log(1)
                        pagerName[i].includes('H-pager_') ? crrNameIndex = i: false;
                        console.log(pagerName[i].includes('H-pager_'))
                    }
                    console.log(pagerName[crrNameIndex].split('_'))
                    let nameArr = pagerName[crrNameIndex].split('_')
                    this.crrPage = nameArr[nameArr.length - 1]
                    console.log(this.crrPage)
                    this.sliderWrap.style.transform = `translateY(-${(this.itemHeight * this.crrPage + 1)}px)`
                    console.log(`페이져슬라이드(-${(this.itemHeight * this.crrPage + 1)}px)`)
                    this.counter = this.crrPage++;
                }
               
                
            })
        }
        nextSlide() {
            // console.log('nextSlide 입니다')
            if(this.mode == 'horizontal' ){
                // console.log('horizontal')
                console.log(this.counter)
                console.log(this.crrPage)
                if (this.counter >= this.slideItemsCloned.length - 1) return;
                this.sliderWrap.style.transition = 'transform 0.3s'
                this.sliderWrap.style.transform = `translateX(-${(this.itemWidth * (this.counter + 1))}px)`
                this.counter++
               
                this.sliderWrap.addEventListener("transitionend", () => {
                    // console.log(this.slideItemsCloned[this.counter])
                    if(this.slideItemsCloned[this.counter].classList.contains('firstItem_Cloned')) {
                        console.log(this.counter)
                    // this.counter = 5, firstItem_Cloned
                        this.counter = 1;
                        this.sliderWrap.style.transition = 'none'
                        this.sliderWrap.style.transform = `translateX(-${(this.itemWidth * this.counter)}px)`
                        console.log(`넥스트슬라이드마지막(-${(this.itemWidth * this.counter)}px)`)
                        console.log(this.sliderWrap.style.transform)
                    }
                })
                console.log(this.counter)

            }else if ( this.mode == 'vertical' ){
                // console.log('vertical')
                if (this.counter >= this.slideItemsCloned.length - 1) return;
                this.sliderWrap.style.transition = 'transform 0.3s'
                this.sliderWrap.style.transform = `translateY(-${(this.itemHeight * (this.counter + 1))}px)`
                this.counter++
                // console.log(this.slideItems.length - 2)

                this.sliderWrap.addEventListener("transitionend", () => {
                    // console.log(this.counter)
                    // console.log(this.slideItemsCloned[this.counter])
                    if(this.slideItemsCloned[this.counter].classList.contains('firstItem_Cloned')) {
                        // this.counter = 5, firstItem_Cloned
                        this.counter = 1;
                        this.sliderWrap.style.transition = 'none'
                        this.sliderWrap.style.transform = `translateY(${-(this.itemHeight * this.counter)}px)`
                    }
                })
                // console.log(this.counter)
            }else if( this.mode == 'horizontal-triple'){
                console.log('triple')

            }
        }
        prevSlide() {
            console.log('prevSlide 입니다')
            if(this.mode == 'horizontal' ){
                console.log('horizontal')
                // console.log(this.counter)
                if(this.counter <= 0)return
                this.sliderWrap.style.transition = 'transform 0.3s'
                this.sliderWrap.style.transform = `translateX(${-this.itemWidth * (this.counter - 1)}px)`
                this.counter--

                this.sliderWrap.addEventListener("transitionend", () => {
                    if(this.slideItemsCloned[this.counter].classList.contains('lastItem_Cloned')) {
                        //  this.counter = 1, lastItem_Cloned
                        this.counter = this.slideItemsCloned.length - 2;
                        this.sliderWrap.style.transition = 'none'
                        this.sliderWrap.style.transform = `translateX(${-(this.itemWidth * this.counter)}px)`
                    }
                })
                // if(this.counter <= 0){
                //     this.counter = this.slideItems.length - 2;
                //     this.sliderWrap.style.transform = `translateX(${-this.itemWidth * (this.slideItems.length - 2)}px)`
                // }
                // console.log(this.counter)
                // console.log(this.sliderWrap)

            }else if ( this.mode == 'vertical' ){
                console.log('vertical')
                if(this.counter <= 0)return
                this.sliderWrap.style.transition = 'transform 0.3s'
                this.sliderWrap.style.transform = `translateY(${-this.itemHeight * (this.counter - 1)}px)`
                this.counter--
                this.sliderWrap.addEventListener("transitionend", () => {
                    if(this.slideItemsCloned[this.counter].classList.contains('lastItem_Cloned')) {
                        //  this.counter = 1, lastItem_Cloned
                        this.counter = this.slideItemsCloned.length - 2;
                        this.sliderWrap.style.transition = 'none'
                        this.sliderWrap.style.transform = `translateY(${-(this.itemHeight * this.counter)}px)`
                    }
                })

            }else if( this.mode == 'horizontal-triple'){
                console.log('triple')

            }
        }
    }
    new CreateHSlider(obj);
}
