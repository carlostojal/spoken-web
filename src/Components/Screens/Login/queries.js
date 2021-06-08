import { gql } from "@apollo/client";

const queries = {

  GET_TOKEN: gql`
    query getToken($username: String!, $password: String!, $userPlatform: String, $pushToken: String) {
      getToken(username: $username, password: $password, userPlatform: $userPlatform, pushToken: $pushToken) {
        access
        refresh
      }
    }
  `,

  SET_PUSH_TOKEN: gql`
    mutation setPushToken($token: String!) {
      setExpoPushToken(token: $token)
    }
  `
}

export default queries;