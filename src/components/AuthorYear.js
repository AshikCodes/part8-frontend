import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const EDIT_BIRTHDATE = gql`
  mutation editBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      id
      born
      bookCount
    }
  }
`;
const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const AuthorYear = ({ authors }) => {
  const [name, setName] = useState("");
  const [bornDate, setBornDate] = useState("");

  const [editYear] = useMutation(EDIT_BIRTHDATE, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`value for name: ${name}`);
    console.log(`value for name: ${bornDate}`);
    editYear({ variables: { name, setBornTo: parseInt(bornDate) } });

    // setName("");
    setBornDate("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Set birthyear</h2>
        {authors && (
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        )}
        {/* <div>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <input
            value={bornDate}
            onChange={({ target }) => setBornDate(target.value)}
          />
        </div> */}
        <div>
          <input
            value={bornDate}
            onChange={({ target }) => setBornDate(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default AuthorYear;
