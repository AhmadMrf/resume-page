const topNavigation = document.querySelector('.top-navigation-menus')
const sideIconMenus = document.querySelectorAll('.top-navigation-menus span')
const leftMenu = document.querySelector('.left-menu')
const rightMenu = document.querySelector('.right-menu')
let progressBars = leftMenu.querySelectorAll('#progress-bar .progress-bar')
const portfolioFilters = document.querySelector('#portfolio-filter')
let portfolioFiltersElement = portfolioFilters.querySelectorAll('#portfolio-filter li')
const portfolioBoxes = document.querySelectorAll('#portfolio-boxes div')
const leftMenuButton = leftMenu.querySelector('button')
const portfolioDialog = document.querySelector('#portfolio-dialog')
const portfolioDialogContent = portfolioDialog.querySelector('img')
const dialogClose = portfolioDialog.querySelector('#dialog-close')
const portfolioBox = document.querySelector('#portfolio-boxes')
const loadMore = document.querySelector('#morePortfolio')

// toggle dark mode

const toggleThemeIcon = rightMenu.querySelector('.toggle-theme')
const toggleThemeTitle =toggleThemeIcon.querySelector('span')
let isDark
addEventListener('load', () => {
if(!localStorage.getItem('isDark')){
	localStorage.setItem('isDark', JSON.stringify(false));
}else{
toggleTheme(1)
}
})
toggleThemeIcon.addEventListener('click', () => {
	
	toggleTheme(0)
})

function toggleTheme(reverse){
	isDark = JSON.parse(localStorage.getItem('isDark'))
	isDark = reverse ? !isDark : isDark;
	if (!isDark) {
		document.documentElement.style.cssText = '	--color1:#242526;--background:#18191a;--color2: #ffffff;';
		toggleThemeTitle.textContent = 'Light'
		isDark = true
		localStorage.setItem('isDark', JSON.stringify(isDark))
	} else {
		document.documentElement.style.cssText = '';
		toggleThemeTitle.textContent = 'Dark'
		isDark = false
		localStorage.setItem('isDark', JSON.stringify(isDark))
	}
}

// toggle side menus

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

let filter = 'A'
portfolioFilters.addEventListener('click', (e) => {
	if(e.target.tagName === 'LI'){
		portfolioFiltersElement.forEach(item => item.classList.remove('selected'))
		e.target.classList.add('selected')
		
		filter = e.target.textContent[0]
		portfolioFilter(filter)
	}
})

function portfolioFilter(filter){
	
		portfolioBox.querySelectorAll('div').forEach(item => {
			item.classList.remove('filter')
			if (filter === 'A') {
				item.classList.remove('filter')
			}
			else if (item.dataset.category[0] !== filter) {
				item.classList.toggle('filter')
			}
		})
}

//button icon animation

leftMenuButton.addEventListener('click', (e) => {
	e.currentTarget.classList.add('clicked')
	e.currentTarget.addEventListener('animationend',(e) => {
		e.currentTarget.classList.remove('clicked')
	})
})

// portfolio dialog toggle and content


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


//  load more portfolios

 let portfolios
fetch('./portfolios.txt')
.then(Response => Response.json())
.then(data => {
	
	portfolios = data.morePortfolio
	let startUseLoadMore = 0
	let endUseLoadMore = 3
	let stepLoadMore
	let portfolio
loadMore.addEventListener('click',() => {
	filter = portfolioFilters.querySelector('.selected').textContent[0]
	loadMorePortfolio()
portfolioFilter(filter)
})
  function loadMorePortfolio(){
  	stepLoadMore = portfolios.slice(startUseLoadMore, endUseLoadMore)
  	stepLoadMore.forEach(item => {
  		portfolio = document.createElement('div')
  		portfolio.setAttribute('data-category', item.category)
  		portfolio.setAttribute('class','portfolio-box')
  		portfolio.innerHTML = `<a href="${item.href}"><img src="${item.image}" alt="${item.title}"></a>`
  		portfolioBox.appendChild(portfolio)
  	})
  	if (portfolios.length < endUseLoadMore) {
  		loadMore.remove()
  	}
startUseLoadMore += 3
endUseLoadMore += 3

}
})

