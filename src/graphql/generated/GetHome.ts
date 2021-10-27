/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_COMPONENTPAGERIBBON_COLOR, ENUM_COMPONENTPAGERIBBON_SIZE } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetHome
// ====================================================

export interface GetHome_banners_image {
  __typename: "UploadFile";
  url: string;
}

export interface GetHome_banners_button {
  __typename: "ComponentPageButton";
  label: string;
  link: string;
}

export interface GetHome_banners_ribbon {
  __typename: "ComponentPageRibbon";
  text: string | null;
  color: ENUM_COMPONENTPAGERIBBON_COLOR;
  size: ENUM_COMPONENTPAGERIBBON_SIZE | null;
}

export interface GetHome_banners {
  __typename: "Banner";
  image: GetHome_banners_image | null;
  title: string;
  subtitle: string;
  button: GetHome_banners_button | null;
  ribbon: GetHome_banners_ribbon | null;
}

export interface GetHome {
  banners: GetHome_banners[];
}
