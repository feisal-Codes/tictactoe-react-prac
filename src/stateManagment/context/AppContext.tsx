import { ContextType, createContext, ReactNode, useContext, useState } from 'react';

type AppContextType = {
  theme: boolean;
  setTheme?: React.Dispatch<React.SetStateAction<boolean>>;
};
type AppContextWrapperProps = {
  children: ReactNode;
};
const AppContext = createContext<AppContextType>({
  theme: false,
});

const AppContextWrapper = ({ children }: AppContextWrapperProps) => {
  const [state, setState] = useState<boolean>(false);
  return (
    <>
      <AppContext.Provider value={{ theme: state, setTheme: setState }}>
        {children}{' '}
      </AppContext.Provider>
    </>
  );
};

export default AppContextWrapper;

export const useAppContext = () => useContext(AppContext);
