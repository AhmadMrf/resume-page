// toggle side menus

const topNavigation = document.querySelector('.top-navigation-menus')
const sideIconMenus = document.querySelectorAll('.top-navigation-menus span')
const leftMenu = document.querySelector('.left-menu')
const rightMenu = document.querySelector('.right-menu')


sideIconMenus.forEach(icon=>{
  icon.addEventListener('click',e => {

    let clickedIcon = e.currentTarget.parentElement.className.includes('left') ? 'left' : 'right';
    document.querySelector(`.${clickedIcon}-menu`).classList.toggle('active')

    if(clickedIcon === 'left'){
      icon.classList.toggle('active')
    }
  })
})


addEventListener('click' , e => {
  if(e.target.closest('.top-navigation-menus') !== topNavigation){
    if(e.target.closest('.left-menu') !== leftMenu){
      leftMenu.classList.remove('active')
      sideIconMenus[0].classList.remove('active') // left span
    }
    if(e.target.closest('.right-menu') !== rightMenu){
    rightMenu.classList.remove('active')
    }
  }
})