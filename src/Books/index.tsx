import { useState, useEffect } from 'react';

type Book = {
  name: string;
  author: string;
  year: string;
  genre: string;
};

interface Props {
  data: Book[];
}

interface SearchCriteria {
  name: string;
  author: string;
  year: string;
  genre: string;
}

const Library = ({ data }: Props) => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(data);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    name: '',
    author: '',
    year: '',
    genre: '',
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const filterBooks = () => {
    const results = data.filter((book) => {
      return (
        (searchCriteria.name === '' ||
          book.name.toLowerCase().includes(searchCriteria.name.toLowerCase())) &&
        (searchCriteria.year === '' || book.year.includes(searchCriteria.year)) &&
        (searchCriteria.author === '' ||
          book.author.toLowerCase().includes(searchCriteria.author.toLowerCase())) &&
        (searchCriteria.genre === '' ||
          book.genre.toLowerCase().includes(searchCriteria.genre.toLowerCase()))
      );
    });

    setFilteredBooks(results);
  };

  useEffect(() => {
    filterBooks();
  }, [searchCriteria]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center mb-6">Library</h1>
        <div className="flex flex-col mb-6 space-y-4">
          <SearchField
            name="name"
            placeholder="Enter title"
            value={searchCriteria.name}
            onChange={handleSearchChange}
          />
          <SearchField
            name="year"
            placeholder="Enter year"
            value={searchCriteria.year}
            onChange={handleSearchChange}
          />
          <SearchField
            name="author"
            placeholder="Enter author name"
            value={searchCriteria.author}
            onChange={handleSearchChange}
          />
          <SearchField
            name="genre"
            placeholder="Enter genre"
            value={searchCriteria.genre}
            onChange={handleSearchChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-6">
          {filteredBooks.map((book, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <h2 className="text-xl font-semibold">{book.name}</h2>
              <p className="text-gray-700">{book.author}</p>
              <p className="text-gray-600">{book.year}</p>
              <p className="text-gray-500 italic">{book.genre}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;

interface SearchFieldProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField = ({ name, placeholder, value, onChange }: SearchFieldProps) => {
  return (
    <input
      name={name}
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
    />
  );
};
