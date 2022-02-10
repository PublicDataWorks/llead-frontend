import React from 'react'
import { render } from '@testing-library/react'

import ArrayWithSeparator from 'components/common/array-with-separator'

describe('ArrayWithSeparator', () => {
  it('renders correctly without ellipsis', () => {
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

  it('renders correctly with ellipsis', () => {
    const items = [
      <div key={1}>Officer 1</div>,
      <div key={2}>Officer 2</div>,
      <div key={3}>Officer 3</div>,
    ]
    const container = render(
      <ArrayWithSeparator items={items} separator=', ' isEllipsis={true} />
    )
    const { baseElement } = container

    expect(baseElement.textContent).toContain('Officer 1')
    expect(baseElement.textContent).toContain(',')
    expect(baseElement.textContent).toContain('Officer 2')
    expect(baseElement.textContent).toContain(',')
    expect(baseElement.textContent).toContain('Officer 3')
    expect(baseElement.textContent).toContain('...')
  })
})
