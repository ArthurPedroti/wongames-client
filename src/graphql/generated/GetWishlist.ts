/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWishlist
// ====================================================

export interface GetWishlist_wishlists_games_cover {
  __typename: "UploadFile";
  url: string;
}

export interface GetWishlist_wishlists_games_developers {
  __typename: "Developer";
  name: string;
}

export interface GetWishlist_wishlists_games {
  __typename: "Game";
  id: string;
  name: string;
  slug: string;
  cover: GetWishlist_wishlists_games_cover | null;
  developers: GetWishlist_wishlists_games_developers[];
  price: number;
}

export interface GetWishlist_wishlists {
  __typename: "Wishlist";
  id: string;
  games: GetWishlist_wishlists_games[];
}

export interface GetWishlist {
  wishlists: GetWishlist_wishlists[];
}

export interface GetWishlistVariables {
  identifier: string;
}
