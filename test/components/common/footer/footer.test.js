import React from 'react'
import { render } from '@testing-library/react'

import Footer from 'components/common/footer'

describe('Footer component', () => {
  it('should render correctly', () => {
    const { baseElement } = render(<Footer />)
    expect(baseElement.textContent.includes('Public Data Works')).toBe(true)
  })
})