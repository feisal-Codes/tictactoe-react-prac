import { Reducer, useEffect, useReducer, useState } from 'react';
import { getPerson } from './data/getPerson';

export default function PersonScore() {
  //   const [name, setName] = useState<string | undefined>();
  //   const [score, setScore] = useState(0);
  //   const [loading, setLoading] = useState(true);

  const initialState = {
    name: '',
    score: 0,
    loading: true,
  };

  type State = {
    name: string | undefined;
    score: number;
    loading: boolean;
  };
  type Action =
    | {
        type: 'initialize';
        name: string;
      }
    | {
        type: 'increment';
      }
    | {
        type: 'decrement';
      }
    | {
        type: 'reset';
      };

  const [{ name, score, loading }, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState,
  );
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'initialize': {
        return { name: action.name, score: 0, loading: false };
      }
      case 'increment': {
        return { ...state, score: state.score + 1 };
      }
      case 'decrement': {
        return { ...state, score: state.score + 1 };
      }
      case 'reset': {
        return { ...state, score: 0 };
      }
      default:
        return { ...state };
    }
  }
  useEffect(() => {
    getPerson().then((person) => {
      dispatch({ type: 'initialize', name: person.name });
    });
    console.log('calling..');
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2>
          {name}, {score}
        </h2>
        <div>
          <button onClick={() => dispatch({ type: 'increment' })}>Add</button>
          <button onClick={() => dispatch({ type: 'decrement' })}>Subtract</button>
          <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </div>
      </div>
    </>
  );
}
