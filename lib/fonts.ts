
import localFont from 'next/font/local';

    

export const anektelugu = localFont({
  src: [
    {
      path: '../fonts/AnekTelugu-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/AnekTelugu-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/AnekTelugu-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/AnekTelugu-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/AnekTelugu-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/AnekTelugu-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-anektelugu',
  display: 'swap',
});