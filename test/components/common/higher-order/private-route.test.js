import React from 'react'
import { render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

import PrivateRoute from 'components/common/higher-order/private-route'
import * as paths from 'constants/paths'

describe('PrivateRoute higher-order component', () => {
  const LoginComponent = () => <div>Login</div>
  const FrontPageComponent = () => <div>FrontPage</div>

  it('should render login when not logged in', () => {
    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <PrivateRoute component={FrontPageComponent} />
        <Route path={paths.LOGIN_PATH} component={LoginComponent} />
      </MemoryRouter>
    )
    const { baseElement } = container

    expect(baseElement.textContent.includes('FrontPage')).toBe(false)
    expect(baseElement.textContent.includes('Login')).toBe(true)
  })

  it('should render component when logged in', () => {
    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <PrivateRoute component={FrontPageComponent} isLoggedIn />
        <Route path={paths.LOGIN_PATH} component={LoginComponent} />
      </MemoryRouter>
    )
    const { baseElement } = container

    expect(baseElement.textContent.includes('FrontPage')).toBe(true)
    expect(baseElement.textContent.includes('Login')).toBe(false)
  })
})
