import React from 'react'
import { render, screen } from '@testing-library/react'

import Button from 'components/common/buttons/button'

describe('Button component', () => {
  it('should render correctly', () => {
    const buttonClass = 'button-class-name'
    const buttonText = 'BUTTON TEXT'
    render(<Button className={buttonClass}>{buttonText}</Button>)

    expect(screen.getByText(buttonText).classList).toContain('btn', buttonClass)
  })
})
