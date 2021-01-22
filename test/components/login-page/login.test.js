import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import sinon from 'sinon'
import { Route, MemoryRouter } from 'react-router-dom'

import LogIn from 'components/login-page/login'
import FrontPage from 'components/front-page'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

beforeEach(() => {
  mockHistoryPush.mockClear()
})

describe('Login component', () => {
  it('should render LOG IN page when user have not loged in', async () => {
    const performLogin = sinon.spy()

    const container = render(
      <LogIn isLoggedIn={false} performLogin={performLogin} />
    )

    const credentials = {
      email: 'email@email.com',
      password: 'password',
    }

    const emailInput = container.getByPlaceholderText('email')
    fireEvent.change(emailInput, { target: { value: credentials.email } })

    const passwordInput = container.getByPlaceholderText('password')
    fireEvent.change(passwordInput, { target: { value: credentials.password } })

    const submitButton = container.getByText('Sign in')

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(performLogin).toHaveBeenCalledWith(credentials)
  })

  it('should redirect front page page when user have loged in', async () => {
    const performLogin = sinon.spy()

    const container = render(
      <MemoryRouter initialEntries={['login/']}>
        <Route path='login/' history={history}>
          <LogIn isLoggedIn={true} performLogin={performLogin} />
        </Route>
        <Route path='/' history={history}>
          <FrontPage />
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container

    expect(baseElement.getElementsByClassName('front-page').length).toEqual(1)
  })
})
