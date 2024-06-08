export interface Question {
  image: string;
  answers: string[];
  twitterNickname?: string;
}

export const questions = [
  { image: '/ps1.jpg', answers: ['티거'], twitterNickname: 'tigger_0228' },
  { image: '/ps2.jpg', answers: ['모로'], twitterNickname: 'Moro_Lastplush' },
  { image: '/ps3.jpg', answers: ['서향'], twitterNickname: 'Ront_fur' },
  { image: '/ps4.jpg', answers: ['라만'], twitterNickname: '_Raman0' },
  { image: '/ps5.jpg', answers: ['키리토', '탄삭이'], twitterNickname: 'USB_Dongsic91' },
  // TODO: uncomment the following line
  // { image: '/ps6.jpg', answers: ['서향', '서향꼬리'], twitterNickname: 'Ront_fur' },
];
