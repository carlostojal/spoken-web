import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/link-error';

export default async () => {

  const httpLink = new HttpLink({
    uri: `${process.env.REACT_APP_APOLLO_ADDRESS}:${process.env.REACT_APP_APOLLO_PORT}${process.env.REACT_APP_APOLLO_ENDPOINT}`,
    credentials: "include",
    onError: ({ graphQLErrors, networkError, operation, forward }) => {
      console.log("================")
      console.log(graphQLErrors)
    },
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem("access_token");
    return {
      headers: {
        ...headers,
        authorization: token ? token : ""
      }
    }
  });

  const wsLink = new WebSocketLink({
    uri: `ws://${process.env.REACT_APP_APOLLO_ADDRESS}:${process.env.REACT_APP_APOLLO_PORT}`,
    credentials: "include",
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: () => ({
        authToken: async () => { return localStorage.getItem("access_token") ? localStorage.getItem("access_token") : ""}
      }),
    }
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if(graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`)
      });
    }
    if(networkError) console.log(`[Network error]: ${networkError}`);
  })

  const splitLink = split(({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" && definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink),
  errorLink
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all"
      },
      query: {
        errorPolicy: "all"
      },
      mutate: {
        errorPolicy: "all"
      }
    }
  });

  return client;
}