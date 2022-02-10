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

    const firstDepartment = baseElement.getElementsByClassName('custom-link')[0]
    fireEvent.click(firstDepartment)
    const link = '/dept/new-orleans-pd/'
    expect(mockHistoryPush).toHaveBeenCalledWith(link)
  })
})
