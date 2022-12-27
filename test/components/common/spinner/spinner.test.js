import React from 'react'
import { render } from '@testing-library/react'

import Spinner from 'components/common/spinner'

describe('Spinner component', () => {
  it('renders correctly', () => {
    const container = render(<Spinner className='test' />)
    const { baseElement } = container

    expect(
      baseElement.getElementsByClassName('gradient-spinner')[0].classList
    ).toContain('test')
  })
})
