import { gql } from '@apollo/client';


export const CREATE_CLIENT_AND_VEHICLE = gql`
  mutation CreateClientAndVehicle(
    $client: ClientInput!
    $vehicle: VehicleInput!
  ) {
    createClientAndVehicle(client: $client, vehicle: $vehicle) {
      _id
      fullName
      phone
      docId
      email
      vehicles {
        vehicleId
        plate
        make
        model
        year
      }
      createdAt
      updatedAt
    }
  }
`;
