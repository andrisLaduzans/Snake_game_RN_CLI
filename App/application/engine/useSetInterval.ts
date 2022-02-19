import { useEffect, useRef } from 'react';

interface Props {
  onTick: () => void;
  duration: number;
}

export const useSetInterval = ({ onTick, duration }: Props) => {
  const onTickRef = useRef(onTick);
  const durationRef = useRef(duration);

  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    const interval = setInterval(() => {
      onTickRef.current();
    }, durationRef.current);

    return () => {
      clearInterval(interval);
    };
  }, []);
};
