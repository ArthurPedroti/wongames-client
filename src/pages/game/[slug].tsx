import { useRouter } from 'next/router'
import { initializeApollo } from 'services/apollo'

import Game, { GameTemplateProps } from 'templates/Game'

import { GetGames, GetGamesVariables } from 'graphql/generated/GetGames'
import { GET_GAMES, GET_GAME_BY_SLUG } from 'graphql/queries/games'
import {
  GetGameBySlug,
  GetGameBySlugVariables
} from 'graphql/generated/GetGameBySlug'
import { GetStaticProps } from 'next'
import { GetRecommended } from 'graphql/generated/GetRecommended'
import { GET_RECOMMENDED } from 'graphql/queries/recommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import {
  GetUpcoming,
  GetUpcomingVariables
} from 'graphql/generated/GetUpcoming'
import { GET_UPCOMING } from 'graphql/queries/upcoming'

const apolloClient = initializeApollo()

export default function Index(props: GameTemplateProps) {
  const router = useRouter()

  // se a rota não tiver sido gerada ainda
  // você pode mostrar um loading
  // uma tela de esqueleto
  if (router.isFallback) return null

  return <Game {...props} />
}

// gerar em build time (/game/bla, /bame/foo ...)
export async function getStaticPaths() {
  const { data } = await apolloClient.query<GetGames, GetGamesVariables>({
    query: GET_GAMES,
    variables: { limit: 15 }
  })

  const paths = data.games.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Get game data
  const { data } = await apolloClient.query<
    GetGameBySlug,
    GetGameBySlugVariables
  >({
    query: GET_GAME_BY_SLUG,
    variables: { slug: `${params?.slug}` },
    fetchPolicy: 'no-cache'
  })

  if (!data.games.length) {
    return { notFound: true }
  }

  const game = data.games[0]

  // Get recommended games
  const {
    data: { recommended }
  } = await apolloClient.query<GetRecommended>({
    query: GET_RECOMMENDED
  })

  // Get upcoming games and highlight
  const TODAY = new Date().toISOString().slice(0, 10)

  const {
    data: { upcomingGames, showcase }
  } = await apolloClient.query<GetUpcoming, GetUpcomingVariables>({
    query: GET_UPCOMING,
    variables: { date: TODAY }
  })

  return {
    revalidate: 10,
    props: {
      cover: `http://localhost:1337${game.cover?.src}`,
      gameInfo: {
        id: game.id,
        title: game.name,
        price: game.price,
        description: game.short_description
      },
      gallery: game.gallery.map((image) => ({
        src: `http://localhost:1337${image.src}`,
        label: image.label
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map((category) => category.name)
      },
      upcomingTitle: showcase?.upcomingGames?.title,
      upcomingGames: gamesMapper(upcomingGames),
      upcomingHighlight: highlightMapper(showcase?.upcomingGames?.highlight),
      recommendedTitle: recommended?.section?.title,
      recommendedGames: gamesMapper(recommended?.section?.games)
    }
  }
}
