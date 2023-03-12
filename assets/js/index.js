class QrCodeGenerator {
  constructor(form, img, input) {
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

  init() {
    if (this.form) {
      this.addHandleClick();
    }
    return this;
  }
}

const qrCodeGen = new QrCodeGenerator('.form', 'img', '.inText');
qrCodeGen.init();
