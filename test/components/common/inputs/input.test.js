import React from 'react'
import { render, screen } from '@testing-library/react'

import Input from 'components/common/inputs/input'

describe('Input component', () => {
  it('should render correctly', () => {
    const inputClass = 'input-class'
    render(
      <Input iconSrc='src' className={inputClass} placeholder='placeholder' />
    )

    expect(screen.getByPlaceholderText('placeholder').classList).toContain(
      'input-field'
    )
  })
})
