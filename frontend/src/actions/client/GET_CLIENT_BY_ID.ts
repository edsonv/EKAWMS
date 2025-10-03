import { gql } from "@apollo/client";

export const GET_CLIENT_BY_ID = gql`
  query Client($clientId: ID!) {
    client(id: $clientId) {
      _id
      fullName
      phone
      docId
      email
      createdAt
      updatedAt
      vehicles {
        vehicleId
        plate
        make
        model
        year
      }
    }
  }
`;
