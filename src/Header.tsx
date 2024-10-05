import { Form, Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { FormEvent } from 'react';
import logo from './logo.svg';

export function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    navigate(`products/?search=${search}`);
    // setSearchParams({ search });
  };
  return (
    <>
      <header
        className="text-center text-slate-50 
    bg-slate-900 h-40 p-5"
      >
        <Link to="">
          {' '}
          <img src={logo} alt="Logo" className="inline-block h-20" />
          <h1 className="text-2xl">React Tools</h1>
        </Link>
        <Form
          className="relative text-right"
          // onSubmit={handleSearchSubmit}
          action="/Products"
        >
          <input
            type="search"
            name="search"
            placeholder="Search"
            defaultValue={searchParams.get('search') ?? ''}
            className="absolute right-0 top-0 rounded py-2 px-3 
 text-gray-700"
          />
        </Form>

        <nav>
          <NavLink
            to="products"
            className={({ isActive }) =>
              `text-white no-underline p-1 pb-0.5 border-solid 
 border-b-2 ${isActive ? 'border-white' : 'border-transparent'}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="tictac"
            className={({ isActive }) =>
              `text-white no-underline p-1 pb-0.5 border-solid 
 border-b-2 ${isActive ? 'border-white' : 'border-transparent'}`
            }
          >
            TicTacToe
          </NavLink>
          <NavLink
            to="person_Score"
            className={({ isActive }) =>
              `text-white no-underline p-1 pb-0.5 border-solid 
 border-b-2 ${isActive ? 'border-white' : 'border-transparent'}`
            }
          >
            Person Score
          </NavLink>
          <NavLink
            to="admin"
            className={({ isActive }) =>
              `text-white no-underline p-1 pb-0.5 border-solid 
 border-b-2 ${isActive ? 'border-whte' : 'border-transparent'}`
            }
          >
            Admin
          </NavLink>
        </nav>
      </header>
    </>
  );
}
