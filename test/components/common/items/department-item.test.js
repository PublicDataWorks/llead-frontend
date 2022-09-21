import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import sinon from 'sinon'

import DepartmentItem from 'components/common/items/department-item'

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

describe('Department item component', () => {
  it('renders correctly', () => {
    const onItemClickSpy = sinon.spy()

    const props = {
      id: 'new-orleans-pd',
      name: 'New Orleans PD',
      parish: 'New Orleans Parish',
      onItemClick: onItemClickSpy,
    }

    const container = render(<DepartmentItem {...props} />)

    const { baseElement, getByText } = container

    expect(
      baseElement.getElementsByClassName('department-item-parish')[0]
        .textContent
    ).toEqual('Police Department | New Orleans Parish')

    expect(getByText('New Orleans PD').className).toEqual(
      'department-item-name'
    )
  })

  it('renders without parish', () => {
    const onItemClickSpy = sinon.spy()

    const props = {
      id: 'new-orleans-pd',
      name: 'New Orleans PD',
      parish: null,
      onItemClick: onItemClickSpy,
    }

    const container = render(<DepartmentItem {...props} />)

    const { getByText } = container

    expect(getByText('Police Department').className).toEqual(
      'department-item-parish'
    )
  })

  it('triggers onItemClick', () => {
    const onItemClickSpy = sinon.spy()

    const props = {
      id: 'new-orleans-pd',
      name: 'New Orleans PD',
      parish: 'New Orleans Parish',
      onItemClick: onItemClickSpy,
    }

    const container = render(<DepartmentItem {...props} />)

    const { baseElement } = container

    const item = baseElement.getElementsByClassName('custom-link')[0]
    fireEvent.click(item)
    const link = '/agency/new-orleans-pd/'
    expect(mockHistoryPush).toHaveBeenCalledWith(link)
  })
})
