import React from 'react'
import { render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'

import PrivateRoute from 'components/common/higher-order/private-route'
import * as paths from 'constants/paths'

describe('PrivateRoute higher-order component', () => {
  const LoginComponent = () => <div>Login</div>
  const FrontPageComponent = () => <div>FrontPage</div>

  it('should render login when not logged in', () => {
    const setPreviousLocation = sinon.spy()
    const container = render(
      <MemoryRouter initialEntries={['/departments/1/']}>
        <PrivateRoute
          component={FrontPageComponent}
          setPreviousLocation={setPreviousLocation}
        />
        <Route path={paths.LOGIN_PATH} component={LoginComponent} />
      </MemoryRouter>
    )
    const { baseElement } = container

    expect(baseElement.textContent.includes('FrontPage')).toBe(false)
    expect(baseElement.textContent.includes('Login')).toBe(true)
    expect(setPreviousLocation).toHaveBeenCalledWith({
      pathname: '/departments/1/',
      search: '',
    })
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
