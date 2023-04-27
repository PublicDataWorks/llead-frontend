import React from 'react'
import { render } from '@testing-library/react'

import FirearmCertItem from 'components/officer-page/timeline/firearm-cert-item'

describe('FirearmCertItem component', () => {
  it('renders item', () => {
    const container = render(<FirearmCertItem />)

    const { getByText } = container

    expect(getByText('Level 1 Firearms Certification').className).toEqual(
      'timeline-firearm-cert-item'
    )
  })
})
