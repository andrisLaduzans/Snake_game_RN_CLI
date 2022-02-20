import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ENVIRONMENT } from '@env';

type State = {
  isDevMode: boolean;
};

type DevModeContext = {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
};

const devModeContext = createContext<DevModeContext>({
  state: {
    isDevMode: false,
  },
  setState: () => null,
});

export const DevModeProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<State>({ isDevMode: false });

  useEffect(() => {
    if (ENVIRONMENT === 'development') {
      const DevMenu = require('react-native-dev-menu');
      DevMenu.addItem('Toggle DevMode', () =>
        setState(s => ({ ...s, isDevMode: !s.isDevMode })),
      );
    }
  }, []);

  return (
    <devModeContext.Provider value={{ state, setState }}>
      {children}
    </devModeContext.Provider>
  );
};

export const useDevMode = () => useContext(devModeContext);
