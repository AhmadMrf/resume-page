const topNavigation = document.querySelector('.top-navigation-menus')
const sideIconMenus = document.querySelectorAll('.top-navigation-menus span')
const leftMenu = document.querySelector('.left-menu')
const rightMenu = document.querySelector('.right-menu')
const rightMenuNavbarIcons = document.querySelectorAll('.right-menu-navbar li')
const sections = document.querySelectorAll('.main-menu-content')
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
const toggleThemeIcon = rightMenu.querySelector('.toggle-theme')
const toggleThemeTitle =toggleThemeIcon.querySelector('span')

//## toggle dark mode ##


let isDark
addEventListener('load', () => {
	// check localstorage for existing
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
	// when onload i need to aplly theme according to isDark value witout chenge it by toogleTheme func. by 'reverse' parameter i do it. 
	isDark = JSON.parse(localStorage.getItem('isDark'))
	// reverse isDark value for onload listener.
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

// ## toggle side menus ##

sideIconMenus.forEach(icon => {
	icon.addEventListener('click', e => {

		let clickedIcon = e.currentTarget.parentElement.className.includes('left') ? 'left' : 'right';
		document.querySelector(`.${clickedIcon}-menu`).classList.toggle('active')

    // toggle left menu icon
		if (clickedIcon === 'left') {
			icon.classList.toggle('active')
		}
	})
})

  // when click outside menus and top navigation , close menus
  
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

// ## progress bar left menu ##

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

// ## left menu button icon animation ##

leftMenuButton.addEventListener('click', (e) => {
	e.currentTarget.classList.add('clicked')
	e.currentTarget.addEventListener('animationend',(e) => {
		e.currentTarget.classList.remove('clicked')
	})
})

// ## portfolio filter ##

  // defult filter for all category
let filter = 'A'
portfolioFilters.addEventListener('click', (e) => {
	if(e.target.tagName === 'LI'){
		// highlight selected li
		portfolioFiltersElement.forEach(item => item.classList.remove('selected'))
		e.target.classList.add('selected')
		// choose first leter of list filter element for filtering
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
			// use first element dataset on element for search
			else if (item.dataset.category[0] !== filter) {
				item.classList.toggle('filter')
			}
		})
}


// ## portfolio dialog toggle and content ##


portfolioBox.addEventListener('click', e => {
	if(e.target.tagName === 'DIV'){
		portfolioContent(e.target)
		portfolioDialog.classList.add('dialog-open')
	 }
})
dialogClose.addEventListener('click', () => {
	portfolioDialog.classList.remove('dialog-open')
})
  // get element atribute for dialog
let src, alt ;
  
portfolioContent = function(box) {
	src = box.firstElementChild.firstElementChild.getAttribute('src')
	alt = box.firstElementChild.firstElementChild.getAttribute('alt')
	portfolioDialogContent.setAttribute('src', src)
	portfolioDialogContent.setAttribute('alt', alt)
}


//  ## load more portfolios ##

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
	//filter added portfolios
	filter = portfolioFilters.querySelector('.selected').textContent[0];
	loadMorePortfolio()
portfolioFilter(filter)
})

  //seprate extra portfolios array 3 to 3 for each time. and create elements base on that array.
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

//  ## scroll behavior ##
//highlight icon function
function highlight(id){
	rightMenuNavbarIcons.forEach(icon => {
		icon.classList.remove('active')
		if(icon.dataset.name === id){
			icon.classList.add('active')
		}
	})
}
//click icons to scroll body
let iconName
let sectionOffset
rightMenuNavbarIcons.forEach(icon => {
	icon.addEventListener('click', () => {
		iconName = icon.dataset.name
		sectionOffset = document.getElementById(iconName).getBoundingClientRect().y
		document.body.scrollBy(0, sectionOffset - 50)
		highlight(iconName)
	})
})
//scroll to highlight icons

document.body.addEventListener('scroll', () => {
	let sectionInViewId = getInViewSection()
	highlight(sectionInViewId)
})

window.addEventListener('load', () => {
	let sectionInViewId = getInViewSection()
	highlight(sectionInViewId)
})

let arraySections = Array.from(sections)
function getInViewSection(){
	let sectionInView = arraySections.findIndex(section => {
		return (section.getBoundingClientRect().y) - 50 > 1
	})
	return sectionInViewId = sections[sectionInView - 1].id
}