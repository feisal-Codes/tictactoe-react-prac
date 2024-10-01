import { useEffect, useState } from 'react';

let nextID = 0;
export const List = () => {
  interface Artist {
    name: string | undefined;
    id: number;
  }

  const [name, setName] = useState<string | undefined>('');
  const [artists, setArtists] = useState<Array<Artist>>([]);

  useEffect(() => {
    console.log(artists);
  }, [artists]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(() => e.target.value);
  };

  const handleAdd = () => {
    //when you update state by mutating , the UI does not rerender
    // artists.push({
    //   id: nextID++,
    //   name: name,
    // });

    //copy the array into a new one and add the object
    setArtists(() => [...artists, { id: nextID++, name: name }]);
    setName('');
  };

  const handleDelete = (id: number) => {
    //filter produces a new array depending on the given condition
    const updatedArtist = artists.filter((artist) => artist.id != id);
    setArtists(updatedArtist);
  };

  return (
    <>
      <div>
        <input
          value={name}
          onChange={handleChange}
          placeholder="artist name"
          type="text"
          name="name"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div>
        {artists?.map((artist) => (
          <div key={artist.id}>
            <h2>{artist.name}</h2>
            <button onClick={() => handleDelete(artist.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};
