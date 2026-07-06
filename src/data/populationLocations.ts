import type { PopulationLocation } from '../types';

export const populationLocations: PopulationLocation[] = [
  // DENSE ("sık nüfuslu") — 7 entries
  {
    id: 'catalca-kocaeli',
    name: 'Çatalca-Kocaeli Çevresi',
    markerLat: 40.80,
    markerLng: 29.45,
    density: 'sik'
  },
  {
    id: 'ege-kiyilari',
    name: 'Ege Kıyıları',
    markerLat: 38.45,
    markerLng: 27.15,
    density: 'sik'
  },
  {
    id: 'antalya',
    name: 'Antalya',
    markerLat: 36.89,
    markerLng: 30.71,
    density: 'sik'
  },
  {
    id: 'cukurova',
    name: 'Çukurova Çevresi',
    markerLat: 37.00,
    markerLng: 35.30,
    density: 'sik'
  },
  {
    id: 'dogu-karadeniz',
    name: 'Doğu Karadeniz',
    markerLat: 41.00,
    markerLng: 39.72,
    density: 'sik'
  },
  {
    id: 'zonguldak',
    name: 'Zonguldak',
    markerLat: 41.45,
    markerLng: 31.79,
    density: 'sik'
  },
  {
    id: 'ankara-eskisehir',
    name: 'Ankara-Eskişehir',
    markerLat: 39.90,
    markerLng: 32.80,
    density: 'sik'
  },

  // SPARSE ("seyrek nüfuslu") — 9 entries
  {
    id: 'kirklareli-cevresi',
    name: 'Kırklareli Çevresi',
    markerLat: 41.73,
    markerLng: 27.22,
    density: 'seyrek'
  },
  {
    id: 'canakkale',
    name: 'Çanakkale',
    markerLat: 40.15,
    markerLng: 26.40,
    density: 'seyrek'
  },
  {
    id: 'mugla',
    name: 'Muğla',
    markerLat: 37.21,
    markerLng: 28.36,
    density: 'seyrek'
  },
  {
    id: 'teke',
    name: 'Teke',
    markerLat: 36.70,
    markerLng: 29.90,
    density: 'seyrek'
  },
  {
    id: 'taseli',
    name: 'Taşeli',
    markerLat: 36.40,
    markerLng: 33.30,
    density: 'seyrek'
  },
  {
    id: 'hakkari',
    name: 'Hakkari',
    markerLat: 37.57,
    markerLng: 43.74,
    density: 'seyrek'
  },
  {
    id: 'erzurum-kars-ardahan',
    name: 'Erzurum-Kars-Ardahan',
    markerLat: 40.33,
    markerLng: 42.58,
    density: 'seyrek'
  },
  {
    id: 'tuzgolu-cevresi',
    name: 'Tuzgölü Çevresi',
    markerLat: 38.80,
    markerLng: 33.30,
    density: 'seyrek'
  },
  {
    id: 'sinop',
    name: 'Sinop',
    markerLat: 42.00,
    markerLng: 35.15,
    density: 'seyrek'
  }
];
