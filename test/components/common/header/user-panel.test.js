import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'

import UserPanel from 'components/common/header/user-panel'

describe('User Panel component', () => {
  it('renders successfully', () => {
    const fetchUserInfoSpy = sinon.spy()
    const logOutSpy = sinon.spy()
    const refreshToken = 'refreshToken'
    const userInfo = {
      email: 'user@mail.com',
    }
    const container = render(
      <MemoryRouter initialEntries={['/search']}>
        <Route path='/search'>
          <UserPanel
            refreshToken={refreshToken}
            userInfo={userInfo}
            fetchUserInfo={fetchUserInfoSpy}
            logOut={logOutSpy}
          />
        </Route>
      </MemoryRouter>
    )
    const { baseElement, getByText } = container

    expect(fetchUserInfoSpy).toHaveBeenCalled()

    const hiddenUserPanelElement = baseElement.getElementsByClassName(
      'user-panel'
    )[0]
    expect(hiddenUserPanelElement.classList).toContain('hide-panel')

    const panelToggleButton = baseElement.getElementsByClassName(
      'logout-img'
    )[0]
    fireEvent.click(panelToggleButton)

    const userPanelElement = baseElement.getElementsByClassName('user-panel')[0]
    expect(userPanelElement.classList).not.toContain('hide-panel')

    expect(getByText('user@mail.com')).toBeTruthy()

    const logOutButton = baseElement.getElementsByClassName('logout-button')[0]
    fireEvent.click(logOutButton)
    expect(logOutSpy).toHaveBeenCalledWith({ refresh: refreshToken })
  })
})
