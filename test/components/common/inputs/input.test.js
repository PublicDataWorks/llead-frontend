import React from 'react'
import { render, screen } from '@testing-library/react'

import Input from 'components/common/inputs/input'
import Spinner from 'components/common/spinner'

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

  it('renders spinner', () => {
    const inputClass = 'input-class'
    const container = render(
      <Input
        iconSrc={<Spinner />}
        className={inputClass}
        placeholder='placeholder'
      />
    )

    const { baseElement } = container

    expect(
      baseElement.getElementsByClassName('gradient-spinner').length
    ).toEqual(1)
  })
})
