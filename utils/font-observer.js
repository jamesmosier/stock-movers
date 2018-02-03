const FontFaceObserver = require('fontfaceobserver');

const Fonts = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css?family=Work+Sans:400,600,700';
  link.rel = 'stylesheet';

  document.head.appendChild(link);

  const theFont = new FontFaceObserver('Work Sans');

  theFont.load().then(() => {
    document.documentElement.classList.add('font-loaded');
  });
};

// .fonts-loaded {
//   body {
//     font-family: My Family, sans-serif;
//   }
// }

export default Fonts;
