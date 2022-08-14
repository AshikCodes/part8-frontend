import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";

const USER_LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      favouriteGenre
    }
  }
`;

const Login = ({ setToken, setFavGenre }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   if (!props.show) {
  //     return null;
  //   }

  const [login, result] = useMutation(USER_LOGIN, {
    onError: (error) => {
      console.log(`Error heress: ${error.message}`);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();

    login({ variables: { username, password } });
  };

  useEffect(() => {
    if (result.data) {
      console.log(`result.data is ${result.data.login.favouriteGenre}`);
      setFavGenre(result.data.login.favouriteGenre);
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("books-user-token", token);
    }
  }, [result.data]);

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          {" "}
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          {" "}
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
