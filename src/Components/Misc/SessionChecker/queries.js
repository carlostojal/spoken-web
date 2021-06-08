import { gql } from "@apollo/client";

const queries = {

  REFRESH_TOKEN: gql`
    query refreshToken {
      refreshToken {
        access
        refresh
      }
    }
  `
}

export default queries;