import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import PasswordInput from 'components/common/inputs/password-input'

describe('PasswordInput component', () => {
  it('renders correctly', () => {
    const container = render(<PasswordInput placeholder='password' />)

    const { baseElement, getByPlaceholderText } = container

    const inputElement = getByPlaceholderText('password')

    expect(inputElement.classList).toContain('input-field')
    expect(inputElement.type).toContain('password')

    const eyeIcon = baseElement.getElementsByClassName('eye-icon')[0]
    expect(eyeIcon.classList).toContain('hide')

    fireEvent.click(eyeIcon)

    expect(inputElement.type).toContain('text')
    expect(eyeIcon.classList).not.toContain('hide')
  })
})
