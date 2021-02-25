import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import sinon from 'sinon'
import { Route, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import MockStore from 'redux-mock-store'

import LogIn from 'components/login-page/login'
import FrontPage from 'components/front-page'

describe('Login component', () => {
  it('should render LOG IN page when user have not loged in', async () => {
    const performLogin = sinon.spy()

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['login/']}>
          <Route path='login/' history={history}>
            <LogIn isLoggedIn={false} performLogin={performLogin} />
          </Route>
          <Route path='/' history={history}>
            <FrontPage />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    const { baseElement } = container
    const emailContainer = baseElement.getElementsByClassName('email-input')[0]
    const passwordContainer = baseElement.getElementsByClassName(
      'password-input'
    )[0]

    expect(emailContainer.className).not.toContain('error')
    expect(passwordContainer.className).not.toContain('error')

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

  it('should render error if user logs in fail', async () => {
    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['login/']}>
          <Route path='login/' history={history}>
            <LogIn isLoggedIn={false} isLoginFailed={true} />
          </Route>
          <Route path='/' history={history}>
            <FrontPage />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    const { baseElement } = container
    const emailContainer = baseElement.getElementsByClassName('email-input')[0]
    const passwordContainer = baseElement.getElementsByClassName(
      'password-input'
    )[0]

    expect(emailContainer.className).toContain('error')
    expect(passwordContainer.className).toContain('error')

    expect(baseElement.textContent).toContain(
      'Password/email combination aren’t recognized'
    )
  })

  describe('redirect after user have logged in', () => {
    it('should redirect to previous location', async () => {
      const performLogin = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['login/']}>
            <Route path='login/' history={history}>
              <LogIn isLoggedIn={true} performLogin={performLogin} />
            </Route>
            <Route path='/' history={history}>
              <FrontPage />
            </Route>
          </MemoryRouter>
        </Provider>
      )
      const { baseElement } = container

      expect(baseElement.getElementsByClassName('front-page').length).toEqual(1)
    })

    it('should redirect to front page', async () => {
      const performLogin = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['login/']}>
            <Route path='login/' history={history}>
              <LogIn isLoggedIn={true} performLogin={performLogin} previousLocation={ { pathname: '/departments/1/' } } />
            </Route>
            <Route path='/departments/:id/' history={history}>
              <div className='department-page'>Department Page</div>
            </Route>
          </MemoryRouter>
        </Provider>
      )
      const { baseElement } = container

      expect(baseElement.getElementsByClassName('department-page').length).toEqual(1)
    })
  })
})
