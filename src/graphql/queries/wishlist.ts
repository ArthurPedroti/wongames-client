import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { GameFragment } from 'graphql/fragments/game'
import {
  GetWishlist,
  GetWishlistVariables
} from 'graphql/generated/GetWishlist'

export const GET_WISHLIST = gql`
  query GetWishlist($identifier: String!) {
    wishlists(where: { user: { email: $identifier } }) {
      id
      games {
        ...GameFragment
      }
    }
  }
  ${GameFragment}
`

export function useQueryWishlist(
  options?: QueryHookOptions<GetWishlist, GetWishlistVariables>
) {
  return useQuery<GetWishlist, GetWishlistVariables>(GET_WISHLIST, options)
}
