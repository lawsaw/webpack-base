//import './content/on-document-ready.js';


// import BrowserSprite from 'svg-baker-runtime/src/browser-sprite';
// import domready from 'domready';
// const sprite = new BrowserSprite();
// domready(() => sprite.mount('#my-custom-mounting-target'));
// export default sprite; // don't forget to export!

//import './modules/svg.js';

//import '../svg/facebook.svg';
//import symbol from '../svg/facebook.svg';

import { ready, loadImages, importAll } from './helpers/etc';
import { Tooltip, ScrollTo, Tab, Scroolly, Svg, listenScroll } from './modules';
import '@fortawesome/fontawesome-free/js/all.min';

ready(loadImages);

new Svg();

new listenScroll();

for(let tooltip of document.getElementsByClassName('tooltipFront')) new Tooltip(tooltip);

for(let link of document.getElementsByClassName('link')) new ScrollTo(link, 5000);

for(let tab of document.getElementsByClassName('tab')) new Tab(tab);

for(let scrolly of document.getElementsByClassName('scrolly')) new Scroolly(scrolly);

const images = importAll(require.context('../images/', false, /\.(png|jpe?g|svg)$/));




