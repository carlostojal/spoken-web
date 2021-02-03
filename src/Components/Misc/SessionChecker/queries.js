import { gql } from "@apollo/client";

const queries = {

  REFRESH_TOKEN: gql`
    query refreshToken {
      refreshToken
    }
  `
}

export default queries;