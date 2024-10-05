import { memo, Reducer, useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { getPerson } from './data/getPerson';
import { Outlet } from 'react-router-dom';

function sillyExpensiveFunction() {
  console.log('Executing silly function');
  let sum = 0;
  for (let i = 0; i < 10000; i++) {
    sum += i;
  }
  return sum;
}

export default function PersonScore() {
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
    | { type: 'initialize'; name: string }
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'reset' };

  const [{ name, score, loading }, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState,
  );

  const buttonRef = useRef<HTMLButtonElement>(null);

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'initialize':
        return { name: action.name, score: 0, loading: false };
      case 'increment':
        return { ...state, score: state.score + 1 };
      case 'decrement':
        return { ...state, score: state.score > 0 ? state.score - 1 : 0 }; // Prevent negative score
      case 'reset':
        return { ...state, score: 0 };
      default:
        return state;
    }
  }

  useEffect(() => {
    getPerson().then((person) => {
      dispatch({ type: 'initialize', name: person.name });
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      buttonRef.current?.focus();
    }
  }, [loading]);

  const handleReset = useCallback(() => dispatch({ type: 'reset' }), []);

  //returns a memoized value , and ensures only its recalculated when its dependencies change
  //used to optimize perfomance

  const expensiveCalculation = useMemo(() => sillyExpensiveFunction(), []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <>
      {' '}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">
          {name}, {score}
        </h2>
        <p>{expensiveCalculation}</p>
        <div className="space-x-2">
          <button
            ref={buttonRef}
            onClick={() => dispatch({ type: 'increment' })}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add
          </button>
          <button
            onClick={() => dispatch({ type: 'decrement' })}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Subtract
          </button>

          <Reset onClick={handleReset} />
        </div>
      </div>
    </>
  );
}
type Props = {
  onClick: () => void;
};

export const Reset = memo(({ onClick }: Props) => {
  console.log('render Reset');
  Reset.displayName = 'Reset';
  return (
    <button
      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
      onClick={onClick}
    >
      Reset
    </button>
  );
});
