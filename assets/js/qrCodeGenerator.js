import ErrorGenerator from './erroGenerator.js';

export default class QRcodeGenerator extends ErrorGenerator {
  constructor(form, inputText, inputColor, inputSize) {
    super('#inText', 'button[type="submit"]');
    this.form = document.querySelector(form);
    this.inText = this.form.querySelector(inputText);
    this.inColor = this.form.querySelector(inputColor);
    this.inSize = this.form.querySelector(inputSize);
  }

  addSubmitEvent() {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      try {
        this.btnLoad();
        this.getValues();
      } catch (error) {
        this.createError();
        console.error(error);
      }
    });
  }

  btnLoad() {
    document.querySelector('.btn[type="submit"]').classList.add('active');
    document.querySelector('.spinner-content').classList.add('active');
  }

  getValues() {
    const text = this.inText.value;
    this.checkValue(text);
    const size = this.inSize.value;
    const color = this.inColor.value.split('#').pop();
    const format = this.form.querySelector(
      'input[name="format"]:checked'
    ).value;
    const url = this.getUrl(text, color, format, size);
    this.setSrc(url);
  }

  checkValue(text) {
    if (!text) {
      throw new Error('Preencha o campo corretamente');
    }
  }

  getUrl(text, color, format, size) {
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${text}&color=${color}&size=${size}x${size}&format=${format}`;
    return url;
  }

  createImg() {
    if (!document.querySelector('.img-qr')) {
      const img = document.createElement('img');
      const picture = document.createElement('picture');
      picture.classList.add('content-img', 'box', 'd-f', 'mx-1');
      img.classList.add('img-qr');
      picture.appendChild(img);
      document.querySelector('main').appendChild(picture);
      this.addLoadEvent();
      return img;
    }
    const img = document.querySelector('.img-qr');
    return img;
  }

  addLoadEvent() {
    document.querySelector('.img-qr').addEventListener('load', () => {
      document.querySelector('.btn[type="submit"]').classList.remove('active');
      document.querySelector('.spinner-content').classList.remove('active');
    });
  }

  setSrc(url) {
    const img = this.createImg();
    img.src = url;
  }

  init() {
    if (this.form) {
      this.addSubmitEvent();
    }
    return this;
  }
}
