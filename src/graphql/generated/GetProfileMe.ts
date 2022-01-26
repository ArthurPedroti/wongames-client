/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProfileMe
// ====================================================

export interface GetProfileMe_user {
  __typename: "UsersPermissionsUser";
  id: string;
  email: string;
  username: string;
}

export interface GetProfileMe {
  user: GetProfileMe_user | null;
}

export interface GetProfileMeVariables {
  identifier: string;
}
