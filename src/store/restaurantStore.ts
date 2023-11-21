import {create} from "zustand";
import Restaurant from "../assets/components/restaurant";

type RestaurantState = {
  liste: RestaurantType | null;
  setListe: (menu: RestaurantType) => void;
}

const useRestaurantStore = create<RestaurantState>()(
  (set): RestaurantState => ({
    liste: null,
    setListe: (menu: RestaurantType) => 
      set((state) => ({
        ...state,
        liste: menu
      }))
  })
);

export default useRestaurantStore;