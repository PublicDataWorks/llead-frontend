import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import qs from 'qs'

import ForgotPasswordConfirm from 'components/forgot-password-confirm-page'
import {
  FORGOT_PASSWORD_CONFIRM_NOT_MATCH_MESSAGE,
  FORGOT_PASSWORD_CONFIRM_SUCCESS_MESSAGE,
} from 'constants/messages'

describe('ForgotPassword component', () => {
  it('Performs changing password', async () => {
    const mockPerformForgotPasswordConfirm = jest.fn()

    const token = 'this-is-the-token'
    const query = qs.stringify({ token }, { addQueryPrefix: true })

    const container = render(
      <MemoryRouter
        initialEntries={[
          { pathname: '/forgot-password/confirm', search: query },
        ]}
      >
        <Route path='/forgot-password/confirm'>
          <ForgotPasswordConfirm
            performForgotPasswordConfirm={mockPerformForgotPasswordConfirm}
            forgotPasswordConfirmStatus={
              FORGOT_PASSWORD_CONFIRM_SUCCESS_MESSAGE
            }
          />
        </Route>
      </MemoryRouter>
    )

    const { getByPlaceholderText, getByText } = container

    const passwordElement = getByPlaceholderText('Password')
    const confirmPasswordElement = getByPlaceholderText('Confirm password')

    expect(passwordElement.placeholder).toBeTruthy()
    expect(confirmPasswordElement.placeholder).toBeTruthy()

    const newPassword = 'n3w-p@ssword'
    fireEvent.change(passwordElement, { target: { value: newPassword } })
    fireEvent.change(confirmPasswordElement, { target: { value: newPassword } })

    const submitButton = getByText('Change Password')

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(mockPerformForgotPasswordConfirm).toHaveBeenCalledWith({
      token: token,
      password: newPassword,
    })

    const successMessageElement = getByText(
      FORGOT_PASSWORD_CONFIRM_SUCCESS_MESSAGE
    )

    expect(successMessageElement.className).toContain('success')
  })

  it('Shows unmatched password', async () => {
    const mockPerformForgotPasswordConfirm = jest.fn()

    const token = 'this-is-the-token'
    const query = qs.stringify({ token }, { addQueryPrefix: true })

    const container = render(
      <MemoryRouter
        initialEntries={[
          { pathname: '/forgot-password/confirm', search: query },
        ]}
      >
        <Route path='/forgot-password/confirm'>
          <ForgotPasswordConfirm
            performForgotPasswordConfirm={mockPerformForgotPasswordConfirm}
          />
        </Route>
      </MemoryRouter>
    )

    const { getByPlaceholderText, getByText } = container

    const passwordElement = getByPlaceholderText('Password')
    const confirmPasswordElement = getByPlaceholderText('Confirm password')

    expect(passwordElement.placeholder).toBeTruthy()
    expect(confirmPasswordElement.placeholder).toBeTruthy()

    const newPassword = 'n3w-p@ssword'
    fireEvent.change(passwordElement, { target: { value: newPassword } })
    fireEvent.change(confirmPasswordElement, {
      target: { value: 'other password' },
    })

    const submitButton = getByText('Change Password')

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(mockPerformForgotPasswordConfirm).not.toHaveBeenCalled()

    const errorMessageElement = getByText(
      FORGOT_PASSWORD_CONFIRM_NOT_MATCH_MESSAGE
    )
    expect(errorMessageElement).toBeTruthy()
  })

  it('Shows other error on confirming forgot password', async () => {
    const mockPerformForgotPasswordConfirm = jest.fn()

    const token = 'this-is-the-token'
    const query = qs.stringify({ token }, { addQueryPrefix: true })

    const forgotPasswordConfirmStatus = 'some error happened'

    const container = render(
      <MemoryRouter
        initialEntries={[
          { pathname: '/forgot-password/confirm', search: query },
        ]}
      >
        <Route path='/forgot-password/confirm'>
          <ForgotPasswordConfirm
            performForgotPasswordConfirm={mockPerformForgotPasswordConfirm}
            forgotPasswordConfirmStatus={forgotPasswordConfirmStatus}
          />
        </Route>
      </MemoryRouter>
    )

    const { getByPlaceholderText, getByText, baseElement } = container

    const passwordElement = getByPlaceholderText('Password')
    const confirmPasswordElement = getByPlaceholderText('Confirm password')

    expect(passwordElement.placeholder).toBeTruthy()
    expect(confirmPasswordElement.placeholder).toBeTruthy()

    const newPassword = 'n3w-p@ssword'
    fireEvent.change(passwordElement, { target: { value: newPassword } })
    fireEvent.change(confirmPasswordElement, {
      target: { value: newPassword },
    })

    const submitButton = getByText('Change Password')

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(mockPerformForgotPasswordConfirm).toHaveBeenCalled()

    const errorMessageElement = baseElement.getElementsByClassName('message')[0]
    expect(errorMessageElement.textContent).toEqual(forgotPasswordConfirmStatus)
  })
})
