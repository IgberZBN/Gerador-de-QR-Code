export default class DropDownMenu {
  constructor(btn, menu) {
    this.btn = document.querySelector(btn);
    this.menu = document.querySelector(menu);

    this.handleClick = this.handleClick.bind(this);
  }

  addClickEvent() {
    this.btn.addEventListener('click', this.handleClick);
  }

  handleClick() {
    this.btn.classList.toggle('active');
    this.menu.classList.toggle('active');
  }

  init() {
    if (this.btn && this.menu) {
      this.addClickEvent();
    }
    return this;
  }
}
