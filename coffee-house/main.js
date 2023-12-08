"use strict"
window.addEventListener('DOMContentLoaded', () => {

	initSlider();

  const body = document.body;
  const burgerButton = document.querySelector('.header__burger');
  const headerBurgerMenu = document.querySelector('.nav__body');

	function lockBodyScroll () {
		body.classList.add('no-scroll');
	}

	function unlockBodyScroll () {
		body.classList.remove('no-scroll');
	}

  function toggleHeaderMenu () {

		if (burgerButton.classList.contains('menu-open')) {
			closeBurgerMenu();
		} else {
			openBurgerMenu();
		}
	}

	function openBurgerMenu () {
		headerBurgerMenu.classList.add('header__nav_open');
		burgerButton.classList.add('menu-open');
		lockBodyScroll();
	}

	function closeBurgerMenu () {
		headerBurgerMenu.classList.remove('header__nav_open');
		burgerButton.classList.remove('menu-open');
		unlockBodyScroll();
	}

	function checkBurgerMenu () {
		if (window.screen.width >= 769) {
			closeBurgerMenu();
		}
	}

	// SLIDER
	function initSlider () {
		
		const slider = document.querySelector('.slider');
		const sliderTrack = document.querySelector('.slider__items');
		const sliderItems = Array.from(document.querySelectorAll('.slider__item'));
		const sliderDots = Array.from(document.querySelectorAll('.pagination__item'));
		const activeSliderDot = document.querySelector('.pagination__item_active');
		const arrowLeft = document.querySelector('.arrow-left');
		const arrowRight = document.querySelector('.arrow-right');
		const arrows = document.querySelectorAll('.favorite__arrows');

		let position = 0;
		let dotIndex = 0;
		let translateX = 0;
		let width = slider.clientWidth;
		let timer;

		function setActiveDot(dotIndex) {
			sliderDots.forEach((dot) => {
				dot.classList.remove('pagination__item_active');
			});
			sliderDots[dotIndex].classList.add('pagination__item_active');
		}

		function setNextSlide() {
			clearTimeout(timer);
			position += 1;
			dotIndex +=1;

			if (position >= sliderItems.length) {
				position = 0;
				dotIndex = position;
			}
			moveSlider();
			setActiveDot(dotIndex);
			autoMove();
		}

		function setPrevSlide() {
			position -= 1;
			dotIndex-=1;

			if (position < 0) {
				position = sliderItems.length -1;
				dotIndex = position;
			}
			moveSlider();
			setActiveDot(dotIndex);
		}

		function moveSlider () {
			translateX = -position * width;
			sliderTrack.style.transform = `translateX( ${translateX}px)`;
		}

		function autoMove () {
			timer = setTimeout(setNextSlide, 5000);
		}

		arrows.forEach( arrow => {
			arrow.addEventListener('click', (e) => {
				if (e.target.closest('.arrow-left')) {
					clearTimeout(timer);
					setPrevSlide();
					autoMove();
				} else if (e.target.closest('.arrow-right')) {

					setNextSlide();
					
				}
			})
		});
		autoMove();
	}


  window.addEventListener('resize', checkBurgerMenu);
	window.addEventListener('resize', initSlider);

  body.addEventListener('click', (e) => {

		if (window.screen.width <= 768) {
			if (
				e.target.classList.contains('burger') ||
				e.target.classList.contains('burger__line') ||
				e.target.classList.contains('nav__link') ||
				e.target.classList.contains('menu__link')
			) {
				e.stopPropagation();
				toggleHeaderMenu();
			}
		}
  });
})