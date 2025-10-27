import React, { createContext, useReducer, ReactNode } from "react";

export type Song = {
  id: string;
  title: string;
  artist: string;
  src: string;
  duration?: number;
};

export type MusicPlayerState = {
  songs: Song[];
  currentSongIndex: number;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  shuffle: boolean;
  repeat: "none" | "one" | "all";
};

export type MusicPlayerAction =
  | { type: "SET_SONGS"; payload: Song[] }
  | { type: "SET_CURRENT_SONG"; payload: number }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "TOGGLE_PLAY" }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "NEXT_SONG" }
  | { type: "PREVIOUS_SONG" }
  | { type: "TOGGLE_SHUFFLE" }
  | { type: "TOGGLE_REPEAT" };

const initialState: MusicPlayerState = {
  songs: [
    {
      id: "1",
      title: "Busy Earnin",
      artist: "Jungle",
      src: "/songs/Busy Earnin FIFA 15 Soundtrack.mp3",
    },
    {
      id: "2",
      title: "Give You Up",
      artist: "feat. Alex Clare",
      src: "/songs/Give You Up feat. Alex Clare.mp3",
    },
    {
      id: "3",
      title: "Busy Earnin",
      artist: "Jungle (FIFA 15)",
      src: "/songs/Jungle - Busy Earnin' (FIFA 15 Soundtrack).mp3",
    },
    {
      id: "4",
      title: "Wavin Flag",
      artist: "K'NAAN (Coca-Cola Mix)",
      src: "/songs/K'NAAN Wavin Flag Coca-Cola Mix (1).mp3",
    },
    {
      id: "5",
      title: "Mess is Mine",
      artist: "Vance Joy (FIFA 15)",
      src: "/songs/Vance Joy - Mess is Mine FIFA 15 Soundtrack.mp3",
    },
  ],
  currentSongIndex: 0,
  isPlaying: false,
  volume: 0.7,
  currentTime: 0,
  duration: 0,
  isLoading: false,
  shuffle: false,
  repeat: "none",
};

function musicPlayerReducer(
  state: MusicPlayerState,
  action: MusicPlayerAction
): MusicPlayerState {
  switch (action.type) {
    case "SET_SONGS":
      return { ...state, songs: action.payload };

    case "SET_CURRENT_SONG":
      return {
        ...state,
        currentSongIndex: action.payload,
        currentTime: 0,
      };

    case "PLAY":
      return { ...state, isPlaying: true };

    case "PAUSE":
      return { ...state, isPlaying: false };

    case "TOGGLE_PLAY":
      return { ...state, isPlaying: !state.isPlaying };

    case "SET_VOLUME":
      return { ...state, volume: action.payload };

    case "SET_CURRENT_TIME":
      return { ...state, currentTime: action.payload };

    case "SET_DURATION":
      return { ...state, duration: action.payload };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "NEXT_SONG": {
      const nextIndex = state.shuffle
        ? Math.floor(Math.random() * state.songs.length)
        : (state.currentSongIndex + 1) % state.songs.length;
      return {
        ...state,
        currentSongIndex: nextIndex,
        currentTime: 0,
      };
    }

    case "PREVIOUS_SONG": {
      const prevIndex = state.shuffle
        ? Math.floor(Math.random() * state.songs.length)
        : state.currentSongIndex === 0
        ? state.songs.length - 1
        : state.currentSongIndex - 1;
      return {
        ...state,
        currentSongIndex: prevIndex,
        currentTime: 0,
      };
    }

    case "TOGGLE_SHUFFLE":
      return { ...state, shuffle: !state.shuffle };

    case "TOGGLE_REPEAT": {
      const repeatModes: ("none" | "one" | "all")[] = ["none", "one", "all"];
      const currentIndex = repeatModes.indexOf(state.repeat);
      const nextRepeatMode =
        repeatModes[(currentIndex + 1) % repeatModes.length];
      return { ...state, repeat: nextRepeatMode };
    }

    default:
      return state;
  }
}

const MusicPlayerContext = createContext<{
  state: MusicPlayerState;
  dispatch: React.Dispatch<MusicPlayerAction>;
} | null>(null);

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(musicPlayerReducer, initialState);

  return (
    <MusicPlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export { MusicPlayerContext };
