/** @format */

import { ReactNode } from 'react';

export type Video = {
  [x: string]: ReactNode;
  id: number;
  title: string;
  url: string;
  desc: string;
  type: string;
};

export const videos: Video[] = [
  {
    id: 1,
    type: "video/mp4",
    title: 'Royal Kebab',
    url: 'https://cloud.appwrite.io/v1/storage/buckets/666f14d2002a47cf4900/files/666f153c00378dfc6c12/view?project=666f14900035a4f1355f&mode=admin',
    desc: 'Chce to cvik, skusat + sa inspirovat od lepsich fakt uplne najviac odporucam pozerat si IG, TT a vsimat si z akeho uhlu je to fotene/natacane (inak niekedy je napr. fajn mobil otocit "hore nohami", to ma zas inu perspektivu), odkial ide svetlo, ake strihy su tam spravene. A su aj ucty, ktore natacaju presne taketo tipy, ze ukazuju spoza kamery/fotaku ako sa ta fotka/video tvorilo + vysledok.',
  },
  {
    id: 2,
    type: "video/mp4",
    title: 'Royal Kebab',
    url: 'https://cloud.appwrite.io/v1/storage/buckets/666f14d2002a47cf4900/files/666f15350035dbcd12a6/view?project=666f14900035a4f1355f&mode=admin',
    desc: 'Aj videá sa dajú natáčať geniálne jednoducho. Trvalo mi to 2 roky. Že nepotrebujem štáb ľudí okolo seba! Kým som našla spôsob.',
  },
  {
    id: 3,
    type: "video/mp4",
    title: 'Handbreak',
    url: 'src/assets/videos/0011.mp4',
    desc: 'of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 4,
    type: "video/mp4",
    title: 'Grand Kebab',
    url: 'src/assets/videos/0010.mp4',
    desc: 'of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 5,
    type: "video/mp4",
    title: 'Grand Kebab',
    url: 'src/assets/videos/0009.mp4',
    desc: 'of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 6,
    type: "video/mp4",
    title: 'Double Red Car Múzeum',
    url: 'src/assets/videos/0008.mp4',
    desc: 'of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 7,
    type: "video/mp4",
    title: 'Coffe Time',
    url: 'src/assets/videos/0007.mp4',
    desc: 'of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 8,
    type: "video/mp4",
    title: 'Hrad Bojnice',
    url: 'src/assets/videos/0006.mp4',
    desc: 'of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 9,
    type: "video/mp4",
    title: 'Vrch Marhát',
    url: 'src/assets/videos/0005.mp4',
    desc: 'of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 10,
    type: "video/mp4",
    title: 'Hrad Hrušov',
    url: 'src/assets/videos/0004.mp4',
    desc: 'of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 11,
    type: "video/mp4",
    title: 'Vianočná Bratislava',
    url: 'src/assets/videos/0003.mp4',
    desc: 'of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 12,
    type: "video/mp4",
    title: 'Huricane Lemonade',
    url: 'src/assets/videos/0002.mp4',
    desc: 'of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 13,
    type: "video/webm",
    title: 'Drum&Bass Wear',
    url: 'src/assets/videos/0001.webm',
    desc: 'of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
];
