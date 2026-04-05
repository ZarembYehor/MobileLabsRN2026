export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Чоловіча худі оверсайз',
    description: 'Зручна та тепла бавовняна худі для повсякденного носіння. Ідеально підходить для прохолодної погоди.',
    price: 1250,
    category: 'Одяг',
    imageUrl: 'https://dubhumans.com/content/images/8/360x480l50nn0/mens-hoodie-black-oversize-71600949243264.jpg',
    rating: 4.8,
    inStock: true,
  },
  {
    id: '2',
    title: 'Гантелі розбірні (по 10 кг)',
    description: 'Набір розбірних гантелей для домашніх тренувань. Надійне кріплення дисків та зручне руківʼя.',
    price: 2100,
    category: 'Спорт',
    imageUrl: 'https://sportano.ua/img/986c30c27a3d26a3ee16c136f92f4ff5/5/9/5904823023596_20-jpg/gantelja-regul-ovana-xtrexo-24-kg-evo-chornij-1748607.jpg',
    rating: 4.9,
    inStock: true,
  },
  {
    id: '3',
    title: 'Вʼязаний плед з мериносової вовни',
    description: 'Ексклюзивний плед ручної роботи, дуже мʼякий та гіпоалергенний. Зігріє зимовими вечорами.',
    price: 3400,
    category: 'Хендмейд',
    imageUrl: 'https://content1.rozetka.com.ua/goods/images/big/495177911.jpg',
    rating: 5.0,
    inStock: false, 
  },
  {
    id: '4',
    title: 'Жіноча спортивна футболка',
    description: 'Дихаюча тканина, що відводить вологу. Спеціально розроблена для інтенсивного бігу та фітнесу.',
    price: 650,
    category: 'Одяг',
    imageUrl: 'https://content.rozetka.com.ua/goods/images/big/398539870.jpg',
    rating: 4.5,
    inStock: true,
  },
  {
    id: '5',
    title: 'Килимок для йоги (еко-матеріал)',
    description: 'Нековзний килимок з екологічно чистих матеріалів (TPE). Товщина 6 мм для оптимального комфорту.',
    price: 850,
    category: 'Спорт',
    imageUrl: 'https://content.rozetka.com.ua/goods/images/big/634895886.jpg',
    rating: 4.7,
    inStock: true,
  },
  {
    id: '6',
    title: 'Керамічна чашка ручної роботи',
    description: 'Унікальна чашка з авторським розписом. Обʼєм 350 мл. Можна мити в посудомийній машині.',
    price: 450,
    category: 'Хендмейд',
    imageUrl: 'https://sofika.com.ua/ua/wp-content/uploads/2017/05/sf-6-1.jpg',
    rating: 4.9,
    inStock: true,
  }
];

export const CATEGORIES = ['Всі', 'Одяг', 'Спорт', 'Хендмейд'];