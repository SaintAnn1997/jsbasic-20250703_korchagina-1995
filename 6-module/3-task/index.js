import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideIndex = 0;
    this.elem = this.render();
    this.initCarousel();
  }

  render() {
    const slidesHTML = this.slides.map(slide => `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `).join('');

    const carouselHTML = `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${slidesHTML}
        </div>
      </div>
    `;

    return createElement(carouselHTML);
  }

  initCarousel() {
    this.inner = this.elem.querySelector('.carousel__inner');
    this.arrowRight = this.elem.querySelector('.carousel__arrow_right');
    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left');

    this.updateArrows();

    this.arrowRight.addEventListener('click', () => {
      this.currentSlideIndex++;
      this.updateCarousel();
    });

    this.arrowLeft.addEventListener('click', () => {
      this.currentSlideIndex--;
      this.updateCarousel();
    });

    this.elem.addEventListener('click', (event) => {
      const button = event.target.closest('.carousel__button');
      if (button) {
        const slide = event.target.closest('.carousel__slide');
        const id = slide.dataset.id;
        this.elem.dispatchEvent(new CustomEvent("product-add", {
          detail: id,
          bubbles: true
        }));
      }
    });
  }

  updateCarousel() {
    const offset = -this.inner.offsetWidth * this.currentSlideIndex;
    this.inner.style.transform = `translateX(${offset}px)`;
    this.updateArrows();
  }

  updateArrows() {
    if (this.currentSlideIndex === 0) {
      this.arrowLeft.style.display = 'none';
    } else {
      this.arrowLeft.style.display = '';
    }

    if (this.currentSlideIndex === this.slides.length - 1) {
      this.arrowRight.style.display = 'none';
    } else {
      this.arrowRight.style.display = '';
    }
  }
}
