import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import getFullBackendAddress from "./helpers/getFullBackendAddress";

const httpLink = new createHttpLink({
  uri: getFullBackendAddress("api"),
  credentials: "include"
});

const authLink = setContext((_, { headers }) => {
  
  const tokens = JSON.parse(localStorage.getItem("tokens"));

  if(!tokens)
    return {
      headers: {
        ...headers
      }
    }

  return {
    headers: {
      ...headers,
      authorization: tokens ? tokens.access : null,
      session: tokens ? tokens.refresh : null
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