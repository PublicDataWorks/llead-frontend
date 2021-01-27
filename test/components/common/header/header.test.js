import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import sinon from 'sinon'

import Header from 'components/common/header'

describe('Header component', () => {
  describe('user is not logged in', () => {
    it('should render correctly', () => {
      const container = render(<Header />)
      const { baseElement } = container
      expect(baseElement.textContent.includes('LOGO')).toBe(true)

      expect(baseElement.getElementsByClassName('logout-btn').length).toEqual(0)
    })
  })

  describe('user is logged in', () => {
    it('should render with log out button', () => {
      const logOutSpy = sinon.spy()
      const container = render(<Header isLoggedIn={true} logOut={logOutSpy} />)
      const { baseElement } = container
      expect(baseElement.textContent.includes('LOGO')).toBe(true)

      expect(baseElement.getElementsByClassName('logout-btn').length).toEqual(1)
      fireEvent.click(container.getByText('L'))
      expect(logOutSpy).toHaveBeenCalled()
    })
  })
})
