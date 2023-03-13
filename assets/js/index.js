class QrCodeGenerator {
  constructor(form, img, input, erroContent) {
    this.form = document.querySelector(form);
    this.inText = this.form.querySelector(input);
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
      erroGen.createErro(this.inText);
      throw `${e}`;
    }

    const url = this.getUrl(text);
    this.setSrc(url);
  }

  getUrl(text) {
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${text}&size=150x150`;
    return url;
  }

  setSrc(url) {
    this.img.src = url;
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

class ErroGenerator {
  constructor(content) {
    this.erroContent = document.querySelector(content);
  }

  createErro(inText) {
    inText.classList.add('erro');
    this.erroContent.classList.remove('d-n');

    setTimeout(() => {
      inText.classList.remove('erro');
      this.erroContent.classList.add('d-n');
    }, 3000);
  }
}

const qrCodeGen = new QrCodeGenerator('.form', 'img', '.inText');

const erroGen = new ErroGenerator('.erro-content');
qrCodeGen.init();
