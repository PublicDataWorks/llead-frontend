import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import sinon from 'sinon'

import OfficerItem from 'components/common/items/officer-item'

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

describe('Officer item component', () => {
  it('renders correctly', () => {
    const onItemClickSpy = sinon.spy()

    const props = {
      id: 1,
      name: 'Jackson',
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
      onItemClick: onItemClickSpy,
    }

    const container = render(<OfficerItem {...props} />)

    const { getByText } = container

    expect(
      getByText('Police Officer | New Orleans PD | Dummy').className
    ).toEqual('officer-item-department')
    expect(getByText('Jackson').className).toEqual('officer-item-name')
  })

  it('triggers onItemClick', () => {
    const onItemClickSpy = sinon.spy()

    const props = {
      id: 1,
      name: 'Jackson',
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
      onItemClick: onItemClickSpy,
    }

    const container = render(<OfficerItem {...props} />)

    const { baseElement } = container

    const item = baseElement.getElementsByClassName('custom-link')[0]
    fireEvent.click(item)
    const link = '/officers/1/jackson'
    expect(mockHistoryPush).toHaveBeenCalledWith(link)
  })
})
