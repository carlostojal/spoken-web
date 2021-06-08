import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import getFullBackendAddress from "./helpers/getFullBackendAddress";

const httpLink = new createHttpLink({
  uri: getFullBackendAddress("api"),
  credentials: "include"
});

const authLink = setContext((_, { headers }) => {
  
  const token = localStorage.getItem("access_token");

  return {
    headers: {
      ...headers,
      authorization: token ? token : ""
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "cors"
  }
});

export default client;