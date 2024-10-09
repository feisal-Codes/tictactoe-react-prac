import { ReactNode } from 'react';
import { useAppContext } from './context/AppContext';

type Props = {
  children: ReactNode;
};

const ToggleMode = ({ children }: Props) => {
  const { theme, setTheme } = useAppContext();

  return (
    <div
      className={`min-h-screen flex flex-col items-left justify-center ${theme ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
    >
      <div className="p-4 rounded shadow-md">{children}</div>
    </div>
  );
};

export default ToggleMode;
