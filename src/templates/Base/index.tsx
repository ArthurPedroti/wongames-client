import { useSession } from 'next-auth/client'

import { Container } from 'components/Container'
import Menu from 'components/Menu'
import Footer from 'components/Footer'

import * as S from './styles'

export type BaseProps = {
  children: React.ReactNode
}

const Base = ({ children }: BaseProps) => {
  const [session, loading] = useSession()

  return (
    <section>
      <S.Wrapper>
        <Container>
          <Menu username={session?.user?.name} loading={loading} />
        </Container>

        <S.Content>{children}</S.Content>

        <S.SectionFooter>
          <Container>
            <Footer />
          </Container>
        </S.SectionFooter>
      </S.Wrapper>
    </section>
  )
}
export default Base
