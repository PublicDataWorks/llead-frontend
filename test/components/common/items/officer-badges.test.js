import React from 'react'
import { render } from '@testing-library/react'

import OfficerBadges from 'components/common/items/officer-badges'

describe('OfficerBadges item component', () => {
  it('renders correctly without ellipsis', () => {
    const props = {
      badges: ['123', '456'],
    }

    const container = render(<OfficerBadges {...props} />)
    const { baseElement } = container

    expect(baseElement.textContent).toEqual('123, 456')
  })

  it('renders correctly with ellipsis', () => {
    const props = {
      badges: ['111', '222', '333', '444'],
    }

    const container = render(<OfficerBadges {...props} />)
    const { baseElement } = container

    expect(baseElement.textContent).toEqual('111, 222, 333 ...')
  })

  it('renders correctly with featured officer', () => {
    const props = {
      badges: ['111', '222', '333'],
      isFeaturedOfficer: true,
    }

    const container = render(<OfficerBadges {...props} />)
    const { baseElement } = container

    expect(baseElement.textContent).toEqual('111, 222, 333')
    expect(
      baseElement.getElementsByClassName('featured-officer-badges').length
    ).toEqual(1)
  })
})
