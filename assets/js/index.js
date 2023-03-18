class QrCodeGenerator {
  constructor(form, img, inputT, inputC, inputS) {
    this.form = document.querySelector(form);
    this.inText = this.form.querySelector(inputT);
    this.inColor = this.form.querySelector(inputC);
    this.inSize = this.form.querySelector(inputS);
    this.img = document.querySelector(img);
  }

  addHandleClick() {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.getValues();
    });
  }

  getValues() {
    const text = this.inText.value;

    try {
      this.checkValue(text);
    } catch (e) {
      statusGen.statuErro(this.inText);
      throw `${e}`;
    }

    const color = this.inColor.value.split('#').pop();
    const size = this.inSize.value;
    const format = this.form.querySelector(
      'input[name="format"]:checked'
    ).value;
    const url = this.getUrl(text, color, size, format);
    this.setSrc(url);
  }

  getUrl(text, color, size, format) {
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${text}&color=${color}&size=${size}x${size}&format=${format}`;
    return url;
  }

  setSrc(url) {
    this.img.src = url;
    statusGen.statusSucces(this.inText);
  }

  checkValue(text) {
    if (!text) {
      throw 'Insira um valor valido';
    }
  }

  init() {
    if (this.form) {
      this.addHandleClick();
    }
    return this;
  }
}

class StatusGenerator {
  constructor(erro) {
    this.erroContent = document.querySelector(erro);
  }

  statuErro(input) {
    input.classList.add('erro');
    this.erroContent.classList.add('erro');
    this.timerRemove(input);
  }

  statusSucces(input) {
    input.classList.add('succes');
    this.timerRemove(input);
  }

  timerRemove(input) {
    setTimeout(() => {
      input.classList.remove('erro', 'succes');
      this.erroContent.classList.remove('erro');
    }, 3000);
  }
}

class DropDownMenu {
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

// declarando objetos
const qrCodeGen = new QrCodeGenerator(
  '.form',
  'img',
  '#inText',
  '#inColor',
  '#inSize'
);
const statusGen = new StatusGenerator('.content-erro');
const dropDown = new DropDownMenu('.dropdownToggle', '.dropdown');

// Iniciando qrCode
qrCodeGen.init();
dropDown.init();
