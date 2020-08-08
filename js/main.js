const menuBtn = document.querySelector('.main_menu_bar')
console.log(menuBtn)

menuBtn.addEventListener('click', clickWork)

function clickWork (e){
    console.log(this)
    if(this.classList.contains('on')){
        this.classList.remove('on')
    }else{
        this.classList.add('on')
    }
}