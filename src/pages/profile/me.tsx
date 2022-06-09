import { GetServerSidePropsContext } from 'next'

import Profile from 'templates/Profile'
import FormProfile, { FormProfileProps } from 'components/FormProfile'

import protectedRoutes from 'utils/protected-routes'
import { initializeApollo } from 'services/apollo'
import {
  GetProfileMe,
  GetProfileMeVariables
} from 'graphql/generated/GetProfileMe'
import { GET_PROFILE_ME } from 'graphql/queries/profile'

export default function Me(props: FormProfileProps) {
  return (
    <Profile>
      <FormProfile {...props} />
    </Profile>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo(null, session)

  if (!session) {
    return {
      props: {}
    }
  }

  const { data } = await apolloClient.query<
    GetProfileMe,
    GetProfileMeVariables
  >({
    query: GET_PROFILE_ME,
    variables: {
      identifier: session?.id as string
    }
  })

  return {
    props: { session, username: data.user?.username, email: data.user?.email }
  }
}
