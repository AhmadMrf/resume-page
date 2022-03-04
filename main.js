// toggle side menus

const sideIconMenus = document.querySelectorAll('.top-navigation-menus span');

sideIconMenus.forEach(icon=>{
  icon.addEventListener('click',e => {

    //get clicked icon side dynamically and add active class to it's side menu
    let clickedIcon = e.currentTarget.parentElement.className.includes('left') ? 'left' : 'right';
    document.querySelector(`.${clickedIcon}-menu`).classList.toggle('active')
  })
})
