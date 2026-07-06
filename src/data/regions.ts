import type { Region } from '../types';
import { provinces } from './provinces';

export const regions: Region[] = [
  {
    id: 'marmara',
    name: 'Marmara Bölgesi',
    provinceIds: provinces.filter(p => p.regionId === 'marmara').map(p => p.id),
  },
  {
    id: 'ege',
    name: 'Ege Bölgesi',
    provinceIds: provinces.filter(p => p.regionId === 'ege').map(p => p.id),
  },
  {
    id: 'akdeniz',
    name: 'Akdeniz Bölgesi',
    provinceIds: provinces.filter(p => p.regionId === 'akdeniz').map(p => p.id),
  },
  {
    id: 'ic_anadolu',
    name: 'İç Anadolu Bölgesi',
    provinceIds: provinces.filter(p => p.regionId === 'ic_anadolu').map(p => p.id),
  },
  {
    id: 'karadeniz',
    name: 'Karadeniz Bölgesi',
    provinceIds: provinces.filter(p => p.regionId === 'karadeniz').map(p => p.id),
  },
  {
    id: 'dogu_anadolu',
    name: 'Doğu Anadolu Bölgesi',
    provinceIds: provinces.filter(p => p.regionId === 'dogu_anadolu').map(p => p.id),
  },
  {
    id: 'guneydogu_anadolu',
    name: 'Güneydoğu Anadolu Bölgesi',
    provinceIds: provinces.filter(p => p.regionId === 'guneydogu_anadolu').map(p => p.id),
  },
];

export const allTurkeyRegion: Region = {
  id: 'all_turkey',
  name: 'Tüm Türkiye',
  provinceIds: provinces.map(p => p.id),
};
