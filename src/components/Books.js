import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const FILTERED_BOOKS = gql`
  query findFilteredBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`;

const Books = (props) => {
  const bookResult = useQuery(ALL_BOOKS);
  const [filtered, setFiltered] = useState(null);
  const [genre, setGenre] = useState(null);

  const filteredBooksResult = useQuery(FILTERED_BOOKS, {
    variables: { genre },
    skip: !genre,
  });

  useEffect(() => {
    if (filteredBooksResult.data) {
      setFiltered(filteredBooksResult.data.allBooks);
    }
  }, [filteredBooksResult.data]);

  if (!props.show) {
    return null;
  }

  if (bookResult.loading) {
    return <div>loading.....</div>;
  }

  const books = bookResult.data.allBooks;
  const genres = [];
  var mergedArray;
  var uniqueGenres;

  for (let i = 0; i < books.length; i++) {
    genres.push(books[i].genres);
    mergedArray = genres.flat(1);
    uniqueGenres = [...new Set(mergedArray)];
  }
  uniqueGenres.push("all genres");

  const clickedFilter = (genre) => {
    if (genre === "all genres") {
      setFiltered(books);
    } else {
      setGenre(genre);
      // var filteredBooks = books.filter((book) => {
      //   return book.genres.includes(genre);
      // });
      // setFiltered(filteredBooks);
    }
  };
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!filtered
            ? books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : filtered.map((b) => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {uniqueGenres &&
        uniqueGenres.map((genre) => (
          <button onClick={() => clickedFilter(genre)}>{genre}</button>
        ))}
    </div>
  );
};

export default Books;
