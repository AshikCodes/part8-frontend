import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("books-user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const query = gql`
  query {
    allBooks {
      title
      author
      published
      genres
    }
  }
`;

client.query({ query }).then((response) => {
  console.log(response.data);
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
