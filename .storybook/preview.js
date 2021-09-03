import '../.jest/next-image.mock'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from 'styles/global'
import theme from 'styles/theme'

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: theme.colors.white
      },
      {
        name: 'dark',
        value: theme.colors.mainBg
      }
    ]
  }
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles removeBg />
      <Story />
    </ThemeProvider>
  )
]
