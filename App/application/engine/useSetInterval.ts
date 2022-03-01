import { useEffect, useRef } from 'react';

interface Props {
  onTick: () => void;
  duration: number;
  isDisabled?: boolean;
}

export const useSetInterval = ({ onTick, duration, isDisabled }: Props) => {
  const onTickRef = useRef(onTick);
  const isDisabledRef = useRef(isDisabled);

  useEffect(() => {
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
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, [duration]);
};
