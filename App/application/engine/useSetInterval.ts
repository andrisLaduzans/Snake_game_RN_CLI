import { useEffect, useRef } from 'react';

interface Props {
  onTick: () => void;
  duration: number;
  isDisabled?: boolean;
}

export const useSetInterval = ({ onTick, duration, isDisabled }: Props) => {
  const onTickRef = useRef(onTick);
  const durationRef = useRef(duration);
  const isDisabledRef = useRef(isDisabled);

  useEffect(() => {
    durationRef.current = duration;
    isDisabledRef.current = isDisabled;
  }, [duration, isDisabled]);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDisabledRef.current) {
        onTickRef.current();
      }
    }, durationRef.current);

    return () => {
      clearInterval(interval);
    };
  }, []);
};
