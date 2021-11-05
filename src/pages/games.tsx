import { initializeApollo } from 'services/apollo'
import { GET_GAMES } from 'graphql/queries/games'
import { GetGames, GetGamesVariables } from 'graphql/generated/GetGames'

import GamesTemplate, { GamesProps } from 'templates/Games'
import filterItemsMock from 'components/ExploreSidebar/mock'

export default function GamesPage(props: GamesProps) {
  return <GamesTemplate {...props} />
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query<GetGames, GetGamesVariables>({
    query: GET_GAMES,
    variables: { limit: 15 }
  })

  return {
    props: {
      revalidate: 60,
      initialApolloState: apolloClient.cache.extract(),
      filterItems: filterItemsMock
    }
  }
}
