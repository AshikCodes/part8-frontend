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

const Recommend = ({ favGenre }) => {
  const [recommended, setRecommended] = useState([]);
  const booksResult = useQuery(ALL_BOOKS);
  const books = booksResult.data.allBooks;

  useEffect(() => {
    const recommendedBooks = books.filter((book) => {
      return book.genres.includes(favGenre);
    });

    setRecommended(recommendedBooks);
  }, []);

  return (
    <div>
      <h1>recommendations</h1>
      <p>
        books in your favorite genre <b>patterns</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommended.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
