import { gql } from "@apollo/client";

const queries = {

  USER_SEARCH: gql`
    query userSearch($query: String!) {
      userSearch(query: $query) {
        _id
        username
        name
        surname
        profile_pic {
          _id
        }
      }
    }
  `
}

export default queries;