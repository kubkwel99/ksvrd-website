import { useEffect, useCallback } from 'react';

export function useWindowFunctions(closeVideo: () => void, handleKeyPress: (event: KeyboardEvent) => void) {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const videoPlayer = document.getElementById('videoPlayer');

      if (videoPlayer && !videoPlayer.contains(event.target as Node)) {
        closeVideo();
      }
    },
    [closeVideo],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, handleClickOutside]);
}
