import React from 'react'
import { render } from '@testing-library/react'

import DepartmentCard from 'components/common/cards/department-card'

describe('Department card component', () => {
  it('should render correctly', () => {
    const props = {
      city: 'city',
      name: 'name',
      parish: 'parish',
    }
    const container = render(<DepartmentCard {...props} />)
    const { baseElement } = container

    expect(baseElement.textContent.includes('Police Department')).toBe(true)
    expect(baseElement.textContent.includes(props.city)).toBe(true)
    expect(baseElement.textContent.includes(props.name)).toBe(true)
    expect(baseElement.textContent.includes(props.parish)).toBe(true)
  })
})
