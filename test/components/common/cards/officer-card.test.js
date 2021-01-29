import React from 'react'
import { render } from '@testing-library/react'

import OfficerCard from 'components/common/cards/officer-card'

describe('Officer card component', () => {
  it('should render correctly', () => {
    const props = {
      name: 'Mark Carlson',
      badges: ['12435', '612'],
      department: {
        id: 9,
        name: 'Baton Rouge Department 1',
      },
    }
    const container = render(<OfficerCard {...props} />)
    const { baseElement } = container

    expect(baseElement.textContent.includes('Mark Carlson')).toBe(true)
    expect(baseElement.textContent.includes(props.badges[0])).toBe(true)
    expect(baseElement.textContent.includes(props.badges[1])).toBe(true)
    expect(baseElement.textContent.includes(props.name)).toBe(true)
    expect(baseElement.textContent.includes(props.department.name )).toBe(true)
  })
})
