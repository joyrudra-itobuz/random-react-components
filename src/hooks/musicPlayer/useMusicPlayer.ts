import { useContext, useEffect, useRef, useCallback } from "react";
import { MusicPlayerContext } from "../../context/musicPlayer/context";

export function useMusicPlayerContext() {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error(
      "useMusicPlayerContext must be used within a MusicPlayerProvider"
    );
  }
  return context;
}

export function useMusicPlayer() {
  const { state, dispatch } = useMusicPlayerContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "metadata";
    }

    const audio = audioRef.current;

    // Event listeners
    const handleLoadedMetadata = () => {
      dispatch({ type: "SET_DURATION", payload: audio.duration });
      dispatch({ type: "SET_LOADING", payload: false });
    };

    const handleTimeUpdate = () => {
      dispatch({ type: "SET_CURRENT_TIME", payload: audio.currentTime });
    };

    const handleEnded = () => {
      if (state.repeat === "one") {
        audio.currentTime = 0;
        audio.play();
      } else if (
        state.repeat === "all" ||
        state.currentSongIndex < state.songs.length - 1
      ) {
        dispatch({ type: "NEXT_SONG" });
      } else {
        dispatch({ type: "PAUSE" });
      }
    };

    const handleLoadStart = () => {
      dispatch({ type: "SET_LOADING", payload: true });
    };

    const handleCanPlay = () => {
      dispatch({ type: "SET_LOADING", payload: false });
    };

    const handleError = () => {
      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: "PAUSE" });
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
    };
  }, [dispatch, state.repeat, state.currentSongIndex, state.songs.length]);

  // Update audio source when song changes
  useEffect(() => {
    if (audioRef.current && state.songs.length > 0) {
      const currentSong = state.songs[state.currentSongIndex];
      if (currentSong && audioRef.current.src !== currentSong.src) {
        audioRef.current.src = currentSong.src;
        audioRef.current.load();
      }
    }
  }, [state.currentSongIndex, state.songs]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (state.isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          dispatch({ type: "PAUSE" });
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [state.isPlaying, dispatch]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume;
    }
  }, [state.volume]);

  // Actions
  const play = useCallback(() => {
    dispatch({ type: "PLAY" });
  }, [dispatch]);

  const pause = useCallback(() => {
    dispatch({ type: "PAUSE" });
  }, [dispatch]);

  const togglePlay = useCallback(() => {
    dispatch({ type: "TOGGLE_PLAY" });
  }, [dispatch]);

  const nextSong = useCallback(() => {
    dispatch({ type: "NEXT_SONG" });
  }, [dispatch]);

  const previousSong = useCallback(() => {
    dispatch({ type: "PREVIOUS_SONG" });
  }, [dispatch]);

  const setVolume = useCallback(
    (volume: number) => {
      const clampedVolume = Math.max(0, Math.min(1, volume));
      dispatch({ type: "SET_VOLUME", payload: clampedVolume });
    },
    [dispatch]
  );

  const seek = useCallback(
    (time: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time;
        dispatch({ type: "SET_CURRENT_TIME", payload: time });
      }
    },
    [dispatch]
  );

  const seekToPercentage = useCallback(
    (percentage: number) => {
      if (audioRef.current && state.duration > 0) {
        const time = (percentage / 100) * state.duration;
        seek(time);
      }
    },
    [seek, state.duration]
  );

  const selectSong = useCallback(
    (index: number) => {
      if (index >= 0 && index < state.songs.length) {
        dispatch({ type: "SET_CURRENT_SONG", payload: index });
      }
    },
    [dispatch, state.songs.length]
  );

  const toggleShuffle = useCallback(() => {
    dispatch({ type: "TOGGLE_SHUFFLE" });
  }, [dispatch]);

  const toggleRepeat = useCallback(() => {
    dispatch({ type: "TOGGLE_REPEAT" });
  }, [dispatch]);

  // Utility functions
  const formatTime = useCallback((seconds: number) => {
    if (isNaN(seconds)) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const getProgress = useCallback(() => {
    if (state.duration === 0) return 0;
    return (state.currentTime / state.duration) * 100;
  }, [state.currentTime, state.duration]);

  const getCurrentSong = useCallback(() => {
    return state.songs[state.currentSongIndex] || null;
  }, [state.songs, state.currentSongIndex]);

  return {
    // State
    ...state,
    currentSong: getCurrentSong(),
    progress: getProgress(),

    // Actions
    play,
    pause,
    togglePlay,
    nextSong,
    previousSong,
    setVolume,
    seek,
    seekToPercentage,
    selectSong,
    toggleShuffle,
    toggleRepeat,

    // Utilities
    formatTime,

    // Refs
    audioRef,
  };
}
