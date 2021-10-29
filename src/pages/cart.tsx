import Cart, { CartProps } from 'templates/Cart'

import itemsMock from 'components/CartList/mock'
import cardsMock from 'components/PaymentOptions/mock'
import { initializeApollo } from 'services/apollo'
import { GetRecommended } from 'graphql/generated/GetRecommended'
import { GET_RECOMMENDED } from 'graphql/queries/recommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'

export default function CartPage(props: CartProps) {
  return <Cart {...props} />
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  const {
    data: { recommended }
  } = await apolloClient.query<GetRecommended>({
    query: GET_RECOMMENDED
  })
  return {
    props: {
      items: itemsMock,
      total: '$ 430,00',
      cards: cardsMock,
      recommendedTitle: recommended?.section?.title,
      recommendedGames: gamesMapper(recommended?.section?.games),
      recommendedHighlight: highlightMapper(recommended?.section?.highlight)
    }
  }
}
