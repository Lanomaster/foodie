import { create } from "zustand"
import { devtools } from "zustand/middleware"

type SpeiseState = {
  menu: SpeiseType[];
  setMenu: (menu: SpeiseType[]) => void;
  like: (id: number) => void;
}

function likeHelper(menu: SpeiseType[], id: number): SpeiseType[] {
  return menu.map(speise => speise.id===id? {...speise, liked: !speise.liked}: speise)
}

const useSpeiseStore = create<SpeiseState>()(
  devtools(
    (set): SpeiseState => ({
      menu: [],
      setMenu: (menu: SpeiseType[]) =>
        set((state) => ({
          ...state,
          menu: menu,
        })),
      like: (id: number) =>
        set((state) => ({
          ...state,
          menu: likeHelper(state.menu, id),
        })),
    })
  )
);

export default useSpeiseStore;