import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import sinon from 'sinon'

import ForgotPassword from 'components/forgot-password-page/index'
import {
  FORGOT_PASSWORD_FAILURE_MESSAGE,
  FORGOT_PASSWORD_SUCCESS_MESSAGE,
} from 'constants/messages'

describe('ForgotPassword component', () => {
  it('should render FORGOT PASSWORD page when user access the path', async () => {
    const performForgotPassword = sinon.spy()

    const container = render(
      <ForgotPassword performForgotPassword={performForgotPassword} />
    )

    const { baseElement } = container
    const emailContainer = baseElement.getElementsByClassName('email-input')[0]

    expect(emailContainer.className).not.toContain('error')
    expect(baseElement.textContent).not.toContain(
      'Forgot your password? Click\u00A0here to reset your password'
    )

    const data = {
      email: 'email@email.com',
    }

    const emailInput = container.getByPlaceholderText('email')
    fireEvent.change(emailInput, { target: { value: data.email } })

    const submitButton = container.getByText('Reset Password')

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(performForgotPassword).toHaveBeenCalledWith(data)
  })

  it('should render error if user enter wrong email', async () => {
    const container = render(
      <ForgotPassword forgotPasswordStatus={FORGOT_PASSWORD_FAILURE_MESSAGE} />
    )
    const { baseElement } = container
    const emailContainer = baseElement.getElementsByClassName('email-input')[0]
    const errorMessage = baseElement.getElementsByClassName('message')[0]

    expect(emailContainer.className).toContain('error')

    expect(errorMessage.textContent).toContain(FORGOT_PASSWORD_FAILURE_MESSAGE)
  })

  it('should render success if request change password successfully', async () => {
    const container = render(
      <ForgotPassword forgotPasswordStatus={FORGOT_PASSWORD_SUCCESS_MESSAGE} />
    )
    const { baseElement } = container
    const emailContainer = baseElement.getElementsByClassName('email-input')[0]
    const successMessage = baseElement.getElementsByClassName(
      'success-message'
    )[0]

    expect(emailContainer.className).not.toContain('error')

    expect(successMessage.textContent).toContain(
      FORGOT_PASSWORD_SUCCESS_MESSAGE
    )
  })
})
