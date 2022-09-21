import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import OfficerDepartments from 'components/common/items/officer-departments'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

beforeEach(() => {
  mockHistoryPush.mockClear()
})

describe('OfficerDepartments item component', () => {
  it('should render correctly', () => {
    const props = {
      departments: [
        {
          id: 'new-orleans-pd',
          name: 'New Orleans PD',
        },
        {
          id: 'dummy',
          name: 'Dummy',
        },
      ],
    }

    const container = render(<OfficerDepartments {...props} />)
    const { baseElement } = container

    expect(baseElement.textContent).toEqual('New Orleans PD, Dummy')

    const firstDepartment = baseElement.getElementsByClassName(
      'officer-department'
    )[0]
    const secondDepartment = baseElement.getElementsByClassName(
      'officer-department'
    )[1]

    expect(firstDepartment.classList).toContain('canonical-department')
    expect(secondDepartment.classList).not.toContain('canonical-department')

    const firstDepartmentLink = baseElement.getElementsByClassName(
      'custom-link'
    )[0]
    fireEvent.click(firstDepartmentLink)
    const link = '/agency/new-orleans-pd/'
    expect(mockHistoryPush).toHaveBeenCalledWith(link)
  })
})
