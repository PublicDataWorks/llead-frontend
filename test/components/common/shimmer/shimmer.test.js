import React from 'react'
import { render } from '@testing-library/react'

import Shimmer from 'components/common/shimmer'

describe('Shimmer component', () => {
  it('renders correctly', () => {
    const container = render(<Shimmer className='test' />)
    const { baseElement } = container

    expect(
      baseElement.getElementsByClassName('shimmer-container')[0].classList
    ).toContain('test')
    expect(baseElement.getElementsByClassName('shimmer-item').length).toEqual(6)
    expect(baseElement.getElementsByClassName('shimmer').length).toEqual(12)
  })
})
