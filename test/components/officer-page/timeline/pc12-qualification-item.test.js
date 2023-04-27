import React from 'react'
import { render } from '@testing-library/react'

import PC12QualificationItem from 'components/officer-page/timeline/pc12-qualification-item'

describe('PC12QualificationItem component', () => {
  it('renders item', () => {
    const container = render(<PC12QualificationItem />)

    const { getByText } = container

    expect(getByText('Last PC-12 Qualification').className).toEqual(
      'timeline-pc12-qualification-item'
    )
  })
})
