const menuBtn = document.querySelector('.main_menu_bar')
const kakaodesLi = document.querySelector('.clone-web-kakaoapp')
const modalPopUl = document.querySelector('.clone-web-kakaoapp > div > ul')
console.log(kakaodesLi)

menuBtn.addEventListener('click', clickWork)

kakaodesLi.addEventListener('click', kakaoDesWork)
modalPopUl.addEventListener('click', modal)

function clickWork (e){
    console.log(this)
    if(this.classList.contains('on')){
        this.classList.remove('on')
    }else{
        this.classList.add('on')
    }
}
function kakaoDesWork(e){
    e.preventDefault()
    console.log(this)
    console.log(e)
    if(this.classList.contains('on')){
        this.classList.remove('on')
    }else{
        this.classList.add('on')
    }
}
function modal(e){
    e.stopPropagation()
}