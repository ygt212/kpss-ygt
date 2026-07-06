export type RegionId =
  | 'marmara'
  | 'ege'
  | 'akdeniz'
  | 'ic_anadolu'
  | 'karadeniz'
  | 'dogu_anadolu'
  | 'guneydogu_anadolu'
  | 'all_turkey';

export type DensityClass = 'sik' | 'seyrek';

export interface PopulationLocation {
  id: string;
  name: string;
  markerLng: number;
  markerLat: number;
  density: DensityClass;
}

export interface Province {
  id: string;          // e.g. "34" (plate code) or a slug
  name: string;        // e.g. "İstanbul"
  plateCode: number;   // 1-81
  regionId: RegionId;
}

export interface Region {
  id: RegionId;
  name: string;              // e.g. "Marmara Bölgesi"
  provinceIds: string[];
}

export interface River {
  id: string;
  name: string;
  markerLng: number; // longitude of the representative marker point
  markerLat: number; // latitude of the representative marker point
}

export interface GameState {
  screen: 'hub' | 'city-region-select' | 'city-region-focus' | 'city-completed' | 'rivers-game' | 'rivers-completed' | 'population-play' | 'population-completed';
  selectedRegionId: RegionId | null;
  shuffledQueue: string[];      // remaining province ids to find, in order
  currentTarget: string | null; // province id currently being asked
  foundIds: string[];
  lastWrongClickId: string | null; // transient, cleared after ~1s
}
