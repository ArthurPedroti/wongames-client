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

  const { data } = await apolloClient.query<GetGames, GetGamesVariables>({
    query: GET_GAMES,
    variables: { limit: 9 }
  })

  return {
    props: {
      revalidate: 60,
      games: data.games.map((game) => ({
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: `http://localhost:1337${game.cover!.url}`,
        price: game.price
      })),
      filterItems: filterItemsMock
    }
  }
}
