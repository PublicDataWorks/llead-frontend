import React from 'react'
import { render } from '@testing-library/react'

import OfficerBadges from 'components/common/items/officer-badges'

describe('OfficerBadges item component', () => {
  it('should render correctly', () => {
    const props = {
      badges: ['123', '456'],
    }

    const container = render(<OfficerBadges {...props} />)
    const { baseElement } = container

    expect(baseElement.textContent).toEqual('123, 456')
  })
})
