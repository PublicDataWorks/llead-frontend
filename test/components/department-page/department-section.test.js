import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import sinon from 'sinon'

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

  it('calls to open modal with specific section', () => {
    const section = 'officers'

    const setItemTypeStub = sinon.stub()

    const searchModalOnOpenStub = sinon.stub()

    const container = render(
      <DepartmentSection
        searchModalOnOpen={searchModalOnOpenStub}
        section={section}
        setItemType={setItemTypeStub}
      />
    )
    const { baseElement } = container

    const searchIcon = baseElement.getElementsByClassName('search-icon')[0]

    fireEvent.click(searchIcon)

    expect(searchModalOnOpenStub).toHaveBeenCalled()
    expect(setItemTypeStub).toHaveBeenCalledWith(section)
  })
})
