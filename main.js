// toggle side menus

const topNavigation = document.querySelector('.top-navigation-menus')
const sideIconMenus = document.querySelectorAll('.top-navigation-menus span')
const leftMenu = document.querySelector('.left-menu')
const rightMenu = document.querySelector('.right-menu')


sideIconMenus.forEach(icon => {
	icon.addEventListener('click', e => {

		let clickedIcon = e.currentTarget.parentElement.className.includes('left') ? 'left' : 'right';
		document.querySelector(`.${clickedIcon}-menu`).classList.toggle('active')

		if (clickedIcon === 'left') {
			icon.classList.toggle('active')
		}
	})
})


addEventListener('click', e => {
	if (e.target.closest('.top-navigation-menus') !== topNavigation) {
		if (e.target.closest('.left-menu') !== leftMenu) {
			leftMenu.classList.remove('active')
			sideIconMenus[0].classList.remove('active') // left span
		}
		if (e.target.closest('.right-menu') !== rightMenu) {
			rightMenu.classList.remove('active')
		}
	}
})

// progress bar left menu

let progressBars = leftMenu.querySelectorAll('#progress-bar .progress-bar')
progressBars.forEach(item => {
	let progress = item.dataset.progress
	let progressTitle = item.previousElementSibling
	let progressWidth = item.firstElementChild.style
	let i = 0
	let increesment = setInterval(() => {
		progressTitle.textContent = `${i++}%`
		progressWidth.width = `${i++}%`
		if (progress < i) {
			clearInterval(increesment)
		}
	}, 15)
})

// portfolio filter

const portfolioFilters = document.querySelector('#portfolio-filter')
let portfolioFiltersElement = portfolioFilters.querySelectorAll('#portfolio-filter li')
const portfolioBoxes = document.querySelectorAll('#portfolio-boxes div')

portfolioFilters.addEventListener('click', (e) => {
	if (e.target.tagName === "LI") {
		portfolioFiltersElement.forEach(item => item.classList.remove('selected'))
		e.target.classList.add('selected')

		let filter = e.target.textContent[0]

		portfolioBoxes.forEach(item => {
			item.classList.remove('filter')
			if (filter === 'A') {
				item.classList.remove('filter')
			}
			else if (item.dataset.category[0] !== filter) {
				item.classList.toggle('filter')
			}
		})
	}
})

//button icon animation

const leftMenuButton = leftMenu.querySelector('button')

leftMenuButton.addEventListener('click', (e) => {
	e.currentTarget.classList.add('clicked')
	e.currentTarget.addEventListener('animationend',(e) => {
		e.currentTarget.classList.remove('clicked')
	})
})

// portfolio dialog toggle and content

const portfolioDialog = document.querySelector('#portfolio-dialog')
const portfolioDialogContent = portfolioDialog.querySelector('img')
const dialogClose = portfolioDialog.querySelector('#dialog-close')
const portfolioBox = document.querySelector('#portfolio-boxes')
portfolioBox.addEventListener('click', e => {
	if(e.target.tagName === 'DIV'){
		portfolioContent(e.target)
		portfolioDialog.classList.add('dialog-open')
	}
})
dialogClose.addEventListener('click', () => {
	portfolioDialog.classList.remove('dialog-open')
})
let src, alt ;

portfolioContent = function(box) {
	src = box.firstElementChild.firstElementChild.getAttribute('src')
	alt = box.firstElementChild.firstElementChild.getAttribute('alt')
	portfolioDialogContent.setAttribute('src', src)
	portfolioDialogContent.setAttribute('alt', alt)
}
