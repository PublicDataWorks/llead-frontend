import React from 'react'
import { render } from '@testing-library/react'

import DepartmentSection from 'components/department-page/featured-items/department-section'

describe('Department Section', () => {
  it('renders correctly', () => {
    const CardMock = jest.fn()
    CardMock.mockImplementation(() => <div></div>)

    const title = 'Item title'
    const items = [
      { id: 123, name: 'Item 1' },
      { id: 456, name: 'Item 2' },
    ]

    const container = render(
      <DepartmentSection title={title} items={items} card={CardMock} />
    )
    const { baseElement } = container

    expect(
      baseElement.getElementsByClassName('carousel-title')[0].textContent
    ).toEqual('Item title')
    expect(CardMock.mock.calls[0][0].item).toStrictEqual({
      id: 123,
      name: 'Item 1',
    })
    expect(CardMock.mock.calls[1][0].item).toStrictEqual({
      id: 456,
      name: 'Item 2',
    })
  })
})
