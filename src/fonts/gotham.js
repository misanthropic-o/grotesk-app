import localFont from 'next/font/local';

export const gotham = localFont({
  src: [
    { path: './gotham_thin.otf', weight: '100', style: 'normal' },
    { path: './gotham_thinitalic.otf', weight: '100', style: 'italic' },
    { path: './gotham_xlight.otf', weight: '200', style: 'normal' },
    { path: './gotham_xlightitalic.otf', weight: '200', style: 'italic' },
    { path: './gotham_light.otf', weight: '300', style: 'normal' },
    { path: './gotham_lightitalic.otf', weight: '300', style: 'italic' },
    { path: './gotham_book.otf', weight: '400', style: 'normal' },
    { path: './gotham_bookitalic.otf', weight: '400', style: 'italic' },
    { path: './gotham_medium.otf', weight: '500', style: 'normal' },
    { path: './gotham_mediumitalic.otf', weight: '500', style: 'italic' },
    { path: './gotham_bold.otf', weight: '700', style: 'normal' },
    { path: './gotham_bolditalic.otf', weight: '700', style: 'italic' },
    { path: './gotham_black.otf', weight: '900', style: 'normal' },
    { path: './gotham_blackitalic.otf', weight: '900', style: 'italic' },
    { path: './gotham_ultra.otf', weight: '950', style: 'normal' },
    { path: './gotham_ultraitalic.otf', weight: '950', style: 'italic' },
  ],
  variable: '--font-gotham',
  display: 'swap',
});
