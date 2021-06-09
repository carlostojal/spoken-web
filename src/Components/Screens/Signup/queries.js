import { gql } from "@apollo/client";

const queries = {

  REGISTER_USER: gql`
    mutation registerUser($name: String!, $surname: String!, $birthdate: String!, $email: String!, $username: String!, $password: String!, $profile_type: ProfileType!, $profile_privacy_type: ProfilePrivacyType!) {
      registerUser(name: $name, surname: $surname, birthdate: $birthdate, email: $email, username: $username, password: $password, profile_type: $profile_type, profile_privacy_type: $profile_privacy_type) {
        _id
        name
        username
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