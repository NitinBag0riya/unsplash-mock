import { createStore, action } from 'easy-peasy';


export const store = createStore({
  picturesCollection: [],
  showSlider : {
    isOpen : false,
    selectedImage : null
  },
  addCollection: action((state, payload) => {
    state.picturesCollection = [...state.picturesCollection, ...payload]
  }),
  toggleSlider: action((state, payload) => {
    state.showSlider = {
        selectedImage : payload.selectedImage,
        isOpen : payload.isOpen
    }
  })
});

