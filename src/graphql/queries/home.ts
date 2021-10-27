import { gql } from '@apollo/client'
import { BannerFragment } from 'graphql/fragments/banner'

export const GET_HOME = gql`
  query GetHome {
    banners {
      ...BannerFragment
    }
  }

  ${BannerFragment}
`
