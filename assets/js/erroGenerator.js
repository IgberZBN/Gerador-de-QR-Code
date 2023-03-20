export default class ErrorGenerator {
  constructor(input, btn) {
    this.input = document.querySelector(input);
    this.btn = document.querySelector(btn);

    this.removeError = this.removeError.bind(this);
  }

  createError() {
    this.removeClass();
    if (!document.querySelector('.content-error')) {
      const contentError = document.createElement('div');
      contentError.classList.add('content-error', 'p-1', 'box');
      const p = document.createElement('p');
      p.classList.add('error-msg');
      p.textContent = 'Preencha o campo corretamente!';
      contentError.appendChild(p);
      document.body.appendChild(contentError);
      this.input.classList.add('error');
      this.btn.classList.add('error');
      setTimeout(this.removeError, 3000);
    }
  }

  removeClass() {
    document.querySelector('.btn[type="submit"]').classList.remove('active');
    document.querySelector('.spinner-content').classList.remove('active');
  }

  removeError() {
    this.input.classList.remove('error');
    this.btn.classList.remove('error');
    document.querySelector('.content-error').remove();
  }
}
