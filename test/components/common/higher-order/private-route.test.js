import React from 'react'
import { render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

import PrivateRoute from 'components/common/higher-order/private-route'
import * as paths from 'constants/paths'

describe('PrivateRoute higher-order component', () => {
  const LoginComponent = () => <div>Login</div>
  const HomeComponent = () => <div>Homepage</div>

  it('should render login when not logged in', () => {
    const { baseElement } = render(
      <MemoryRouter initialEntries={['/']}>
        <PrivateRoute component={HomeComponent} />
        <Route path={paths.LOGIN_PATH} component={LoginComponent} />
      </MemoryRouter>
    )
    expect(baseElement.textContent.includes('Homepage')).toBe(false)
    expect(baseElement.textContent.includes('Login')).toBe(true)
  })

  it('should render component when logged in', () => {
    const { baseElement } = render(
      <MemoryRouter initialEntries={['/']}>
        <PrivateRoute component={HomeComponent} isLoggedIn />
        <Route path={paths.LOGIN_PATH} component={LoginComponent} />
      </MemoryRouter>
    )

    expect(baseElement.textContent.includes('Homepage')).toBe(true)
    expect(baseElement.textContent.includes('Login')).toBe(false)
  })
})
