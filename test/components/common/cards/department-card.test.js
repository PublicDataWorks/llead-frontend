import React from 'react'
import { render } from '@testing-library/react'

import DepartmentCard from 'components/common/cards/department-card'

describe('Department card component', () => {
  it('should render correctly', () => {
    const props = {
      id: 1,
      city: 'city',
      name: 'name',
      parish: 'parish',
      className: 'custom-class-name',
    }
    const container = render(<DepartmentCard {...props} />)
    const { baseElement } = container
    const departmentCard = baseElement.getElementsByClassName(
      'department-card'
    )[0]

    expect(departmentCard.classList.value).toContain('custom-class-name')
    expect(departmentCard.textContent.includes('Police Department')).toBe(true)
    expect(departmentCard.textContent.includes(props.city)).toBe(true)
    expect(departmentCard.textContent.includes(props.name)).toBe(true)
    expect(departmentCard.textContent.includes(props.parish)).toBe(true)
  })
})
