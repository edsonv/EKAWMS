import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query clients {
    clients {
      _id
      fullName
      phone
    }
  }
`;
