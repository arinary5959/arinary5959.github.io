//section 1 - 하단부 퀵 메뉴 슬라이더
export default function(){
    const sliderUl = document.querySelector('.primary_01-slider > div > ul');
    const slideBtns = document.querySelectorAll('.slider-btn > div');
    const slidLiElems = document.querySelectorAll('.primary_01-slider > div > ul > li');

    sliderUl.prepend(slidLiElems[slidLiElems.length - 1].cloneNode(true));
    sliderUl.append(slidLiElems[0].cloneNode(true));

    const slideItems = sliderUl.querySelectorAll('li');
    slideItems[0].classList.add('lastCloned')
    slideItems[slideItems.length - 1].classList.add('firstCloned')

    let size =  slidLiElems[0].clientWidth + 10
    let counter = 1;
    let loopNextSlide 
    let autocontroll = true
    // console.log(`translateX(-${size})`)
    // console.log(size)

    sliderUl.style.transform = `translateX(-${size - 135}px )`
    Array.prototype.forEach.call(slideBtns, (slideBtns)=>{
        slideBtns.addEventListener("click", slideClick)
        // console.log(1111111111111111)
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
            sliderUl.style.transform = `translateX(-${size - 135}px )`
            counter = 1
            // slideItems[counter].style.opacity = "1"
            opacityActive(counter)
        }else{
            // slideItems[counter + 1].style.opacity = "1"
            counter++
            sliderUl.style.transform = `translateX(-${(size * (counter) - 135)}px )`
            // sliderUl.style.transform = `translateX(-${(size * (counter + 1) - 135)}px )`
            // return counter++
            opacityActive(counter)
        }
    }
    function prevSlide(){
        // slideItems.forEach((slideItems)=>{
        //     slideItems.style.opacity = ".5" 
        // })
        if (counter <= 1 ){
            // console.log('last')
            sliderUl.style.transform = `translateX(-${size * (slideItems.length - 2) - 135}px )`
            counter = slideItems.length - 2
            slideItems[counter].style.opacity = "1"
            opacityActive(counter)
        }else{
            // console.log('prev')
            // console.log(counter)
            // opacityActive(counter)
            counter--
            sliderUl.style.transform = `translateX(-${(size * (counter) - 135)}px )`
            // sliderUl.style.transform = `translateX(-${(size * (counter -1) - 135)}px )`
            // counter--
            opacityActive(counter)
        }
    }
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
            sliderUl.style.transform = `translateX(-${size * (pagerNum) - 135}px )`
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

    function autocontroler (){ 
        // console.log(autocontroll)
        if(autocontroll){
            loopNextSlide = setInterval(()=>{nextSlide()}, 3000);
        }else if (autocontroll == false){
            clearInterval(loopNextSlide)
        }
    };
    autocontroler()

    function opacityActive(sldieNum){
        // console.log(slideItems[sldieNum])
        // slideItems[sldieNum].style.opacity = "1"
        slideItems.forEach(slideItems =>{
            slideItems.classList.remove('active')
        })
        slideItems[sldieNum].classList.add('active')
    }
}