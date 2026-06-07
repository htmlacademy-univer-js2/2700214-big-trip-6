import {createElement} from '../render.js';
import '../framework/view/abstract-view.css';

const SHAKE_CLASS_NAME = 'shake';
const SHAKE_ANIMATION_TIMEOUT = 600;

export default class AbstractView {
  #element = null;

  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

  shake(callback) {
    const element = this.getElement();
    element.classList.add(SHAKE_CLASS_NAME);

    setTimeout(() => {
      element.classList.remove(SHAKE_CLASS_NAME);
      callback?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}

