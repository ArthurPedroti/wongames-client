import { GetServerSidePropsContext } from 'next'
import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'

import gamesMock from 'components/GameCardSlider/mock'
import { initializeApollo } from 'services/apollo'
import { GetRecommended } from 'graphql/generated/GetRecommended'
import { GET_RECOMMENDED } from 'graphql/queries/recommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import protectedRoutes from 'utils/protected-routes'
import { GET_WISHLIST } from 'graphql/queries/wishlist'
import {
  GetWishlist,
  GetWishlistVariables
} from 'graphql/generated/GetWishlist'

export default function WishilistPage(props: WishlistTemplateProps) {
  return <Wishlist {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo(null, session)

  if (!session) return {}

  await apolloClient.query<GetWishlist, GetWishlistVariables>({
    query: GET_WISHLIST,
    variables: {
      identifier: session.user?.email as string
    }
  })

  const { data } = await apolloClient.query<GetRecommended>({
    query: GET_RECOMMENDED
  })

  return {
    props: {
      session,
      initialApolloState: apolloClient.cache.extract(),
      games: gamesMock,
      recommendedTitle: data.recommended?.section?.title,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighlight: highlightMapper(
        data.recommended?.section?.highlight
      )
    }
  }
}
