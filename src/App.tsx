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
import { Header } from './Header';
export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
