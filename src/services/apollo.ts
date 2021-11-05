import { useMemo } from 'react'
import { ApolloClient, NormalizedCacheObject, HttpLink } from '@apollo/client'
import apolloCache from 'utils/apolloCache'

let apolloClient: ApolloClient<NormalizedCacheObject | null>

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({ uri: 'http://localhost:1337/graphql' }),
    cache: apolloCache
  })
}

export function initializeApollo(initialState = null) {
  // check if already has an instance, to don't create another
  const apolloClientGlobal = apolloClient ?? createApolloClient()

  // restore data from cache
  if (initialState) {
    apolloClientGlobal.cache.restore(initialState)
  }

  // always start SSR with a clean cache
  if (typeof window !== 'undefined') return apolloClientGlobal
  apolloClient = apolloClient ?? apolloClientGlobal

  return apolloClient
}

export function useApollo(initialState = null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
