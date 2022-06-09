import { GetServerSidePropsContext } from 'next'

import OrdersList, { OrdersListProps } from 'components/OrdersList'
import Profile from 'templates/Profile'
import protectedRoutes from 'utils/protected-routes'
import { initializeApollo } from 'services/apollo'
import { GetOrders, GetOrdersVariables } from 'graphql/generated/GetOrders'
import { GET_ORDERS } from 'graphql/queries/orders'
import { ordersMapper } from 'utils/mappers'

export default function Orders({ items }: OrdersListProps) {
  return (
    <Profile>
      <OrdersList items={items} />
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

  const { data } = await apolloClient.query<GetOrders, GetOrdersVariables>({
    query: GET_ORDERS,
    variables: {
      identifier: session?.id as string
    },
    fetchPolicy: 'no-cache'
  })

  return {
    props: {
      session,
      items: ordersMapper(data.orders)
    }
  }
}
