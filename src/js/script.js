//import './content/on-document-ready.js';


// import BrowserSprite from 'svg-baker-runtime/src/browser-sprite';
// import domready from 'domready';
// const sprite = new BrowserSprite();
// domready(() => sprite.mount('#my-custom-mounting-target'));
// export default sprite; // don't forget to export!


import './modules/svg.js';

//import '../svg/facebook.svg';
//import symbol from '../svg/facebook.svg';

import { ready, loadImages } from './config/helpers';
import { Tooltip } from './modules';

ready(loadImages);

for(let tooltip of document.getElementsByClassName('tooltipFront')) new Tooltip(tooltip);

