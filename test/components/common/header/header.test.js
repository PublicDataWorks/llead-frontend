import React from 'react'
import { render } from '@testing-library/react'

import Header from 'components/common/header'

describe('Header component', () => {
  it('should render correctly', () => {
    const container = render(<Header />)
    const { baseElement } = container
    expect(baseElement.textContent.includes('LOGO')).toBe(true)
  })
})
