import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuestState {
  unlockedDigits: boolean[];
  currentBlock: number | null;
  blockProgress: number[];
  showLetter: boolean;
  completedBlocks: boolean[];
  questCompleted: boolean;
}

const initialState: QuestState = {
  unlockedDigits: [false, false, false, false],
  currentBlock: null,
  blockProgress: [0, 0, 0, 0],
  showLetter: true,
  completedBlocks: [false, false, false, false],
  questCompleted: false,
};

const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    unlockDigit: (state, action: PayloadAction<number>) => {
      state.unlockedDigits[action.payload] = true;
      state.completedBlocks[action.payload] = true;
      
      // Проверяем, все ли блоки завершены
      if (state.completedBlocks.every(completed => completed)) {
        state.questCompleted = true;
      }
    },
    setCurrentBlock: (state, action: PayloadAction<number | null>) => {
      state.currentBlock = action.payload;
    },
    updateBlockProgress: (state, action: PayloadAction<{ block: number; progress: number }>) => {
      state.blockProgress[action.payload.block] = action.payload.progress;
    },
    toggleLetter: (state) => {
      state.showLetter = !state.showLetter;
    },
    hideLetter: (state) => {
      state.showLetter = false;
    },
    resetQuest: (state) => {
      return initialState;
    },
  },
});

export const { 
  unlockDigit, 
  setCurrentBlock, 
  updateBlockProgress, 
  toggleLetter, 
  hideLetter,
  resetQuest 
} = questSlice.actions;

export default questSlice.reducer;