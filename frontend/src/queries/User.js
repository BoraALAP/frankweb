import { gql } from "@apollo/client";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      verified
    }
  }
`;

export { CURRENT_USER_QUERY };
