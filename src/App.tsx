// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { Alert } from './Alert';
// import PersonScore from './PersonScore';
// import { List } from './statePlayground/List';
// import { MoveCircles } from './statePlayground/MoveCircle';
// import Game from './tictac/Game';

// function App() {
//   return (
//     <div>
//       {/* <Alert alertType="success">Hello World!</Alert> */}
//       <PersonScore />
//       {/* <List /> */}
//       {/* <MoveCircles /> */}
//       {/* <Game /> */}
//     </div>
//   );
// }

// export default App;

import { Outlet } from 'react-router-dom';
// import { Header } from './Header';
import { Main } from './stateManagment/Main';
import { Content } from './stateManagment/Content';
import { User, authenticateUser } from './api/authenticate';
import { authorize } from './api/authorize';
import { useReducer } from 'react';
import { Header } from './stateManagment/Header';
import AppContextWrapper, { useAppContext } from './stateManagment/context/AppContext';
import ToggleMode from './stateManagment/ToggleMode';
export default function App() {
  type State = {
    user: undefined | User;
    permissions: undefined | string[];
    loading: boolean;
  };
  const initialState: State = {
    user: undefined,
    permissions: undefined,
    loading: false,
  };

  type Action =
    | {
        type: 'authenticate';
      }
    | {
        type: 'authenticated';
        user: User | undefined;
      }
    | {
        type: 'authorize';
      }
    | {
        type: 'authorized';
        permissions: string[];
      };

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case 'authenticate':
        return { ...state, loading: true };
      case 'authenticated':
        return { ...state, loading: false, user: action.user };
      case 'authorize':
        return { ...state, loading: true };
      case 'authorized':
        return {
          ...state,
          loading: false,
          permissions: action.permissions,
        };
      default:
        return state;
    }
  }

  const [{ user, permissions, loading }, dispatch] = useReducer(reducer, initialState);
  const { theme, setTheme } = useAppContext();
  const handleSignInClick = async () => {
    dispatch({ type: 'authenticate' });
    const authuser = await authenticateUser();
    dispatch({ type: 'authenticated', user: authuser });
    if (authuser !== undefined) {
      dispatch({ type: 'authorize' });
      const authorizedPermissions = await authorize(authuser.id);
      dispatch({ type: 'authorized', permissions: authorizedPermissions });
    }
  };

  return (
    <>
      <AppContextWrapper>
        <ToggleMode>
          <Header user={user} onSignInClick={handleSignInClick} loading={loading} />
          <Main user={user} permissions={permissions} />
        </ToggleMode>
      </AppContextWrapper>
      {/* <Header />
      <Outlet /> */}
    </>
  );
}
