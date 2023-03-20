// ! imports
import DropDownMenu from './dropDownMenu.js';
import QRcodeGenerator from './qrCodeGenerator.js';

// ! declarations
const menu = new DropDownMenu(
  '[data-js-toggle="dropdown"]',
  '.dropdown-content'
);

const qrCodeGenerator = new QRcodeGenerator(
  '.content-form',
  '#inText',
  '#inColor',
  '#inSize'
);

// ! starts
menu.init();
qrCodeGenerator.init();
