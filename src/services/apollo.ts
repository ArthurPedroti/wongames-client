import { useMemo } from 'react'
import { ApolloClient, NormalizedCacheObject, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import apolloCache from 'services/apolloCache'
import { Session } from 'next-auth'

let apolloClient: ApolloClient<NormalizedCacheObject | null>

function createApolloClient(session?: Session | null) {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  })

  const authLink = setContext((_, { headers }) => {
    const authorization = session?.jwt ? `Bearer ${session.jwt}` : ''
    return { headers: { authorization, ...headers } }
  })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: apolloCache
  })
}

export function initializeApollo(
  initialState = null,
  session?: Session | null
) {
  // check if already has an instance, to don't create another
  const apolloClientGlobal = apolloClient ?? createApolloClient(session)

  // restore data from cache
  if (initialState) {
    apolloClientGlobal.cache.restore(initialState)
  }

  // always start SSR with a clean cache
  if (typeof window !== 'undefined') return apolloClientGlobal
  apolloClient = apolloClient ?? apolloClientGlobal

  return apolloClient
}

export function useApollo(initialState = null, session?: Session | null) {
  const store = useMemo(
    () => initializeApollo(initialState, session),
    [initialState, session]
  )
  return store
}
