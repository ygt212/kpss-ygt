import { create } from 'zustand'
import type { GameState, RegionId } from '../types'

interface GameStore extends GameState {
  setScreen: (screen: GameState['screen']) => void;
  setSelectedRegion: (regionId: RegionId | null) => void;
  setShuffledQueue: (queue: string[]) => void;
  setCurrentTarget: (target: string | null) => void;
  addFoundId: (id: string) => void;
  setLastWrongClick: (id: string | null) => void;
  initGameSession: (regionId: RegionId, shuffledProvinces: string[]) => void;
  initRiversGameSession: (shuffledRivers: string[]) => void;
  initPopulationGameSession: (shuffledLocations: string[]) => void;
  resetGame: () => void;
  resetToRegionSelect: () => void;
}

const initialState: GameState = {
  screen: 'hub',
  selectedRegionId: null,
  shuffledQueue: [],
  currentTarget: null,
  foundIds: [],
  lastWrongClickId: null,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,
  
  setScreen: (screen) => set({ screen }),
  setSelectedRegion: (selectedRegionId) => set({ selectedRegionId }),
  setShuffledQueue: (shuffledQueue) => set({ shuffledQueue }),
  setCurrentTarget: (currentTarget) => set({ currentTarget }),
  addFoundId: (id) => 
    set((state) => ({ 
      foundIds: [...state.foundIds, id] 
    })),
  setLastWrongClick: (lastWrongClickId) => set({ lastWrongClickId }),
  
  initGameSession: (regionId, shuffledProvinces) => set({
    selectedRegionId: regionId,
    screen: 'city-region-focus',
    shuffledQueue: shuffledProvinces,
    currentTarget: shuffledProvinces[0] || null,
    foundIds: [],
    lastWrongClickId: null,
  }),

  initRiversGameSession: (shuffledRivers) => set({
    selectedRegionId: null,
    screen: 'rivers-game',
    shuffledQueue: shuffledRivers,
    currentTarget: shuffledRivers[0] || null,
    foundIds: [],
    lastWrongClickId: null,
  }),

  initPopulationGameSession: (shuffledLocations) => set({
    selectedRegionId: null,
    screen: 'population-play',
    shuffledQueue: shuffledLocations,
    currentTarget: shuffledLocations[0] || null,
    foundIds: [],
    lastWrongClickId: null,
  }),

  resetGame: () => set({ ...initialState }),
  resetToRegionSelect: () => set({ ...initialState, screen: 'city-region-select' }),
}))
