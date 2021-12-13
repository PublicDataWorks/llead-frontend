import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import DepartmentCard from 'components/common/cards/department-card'
import sinon from 'sinon'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('Department card component', () => {
  it('should render correctly', () => {
    const props = {
      id: 'department-name',
      city: 'city',
      name: 'department name',
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

  it('should remove correctly', () => {
    const removeRecentItemStub = sinon.stub()
    const props = {
      id: 'department-name',
      city: 'city',
      name: 'department name',
      parish: 'parish',
      className: 'custom-class-name',
      removeRecentItem: removeRecentItemStub,
    }

    const container = render(<DepartmentCard {...props} />)
    const { baseElement } = container
    const removeIconItem = baseElement.getElementsByClassName('remove-btn')[0]
    fireEvent.click(removeIconItem)

    expect(removeRecentItemStub).toHaveBeenCalledWith({
      id: 'department-name',
      type: 'DEPARTMENT',
    })
  })
})
