import React from 'react'
import { render } from '@testing-library/react'

import ArrayWithSeparator from 'components/common/array-with-separator'

describe('ArrayWithSeparator', () => {
  it('should render correctly', () => {
    const items = [
      <div key={1}>Department 1</div>,
      <div key={2}>Department 2</div>,
    ]
    const container = render(
      <ArrayWithSeparator items={items} separator=', ' />
    )
    const { baseElement } = container

    expect(baseElement.textContent).toContain('Department 1')
    expect(baseElement.textContent).toContain(',')
    expect(baseElement.textContent).toContain('Department 2')
  })
})
