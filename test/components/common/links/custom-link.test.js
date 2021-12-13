import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'

import CustomLink from 'components/common/links/custom-link'

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

describe('CustomLink component', () => {
  it('should render correctly', () => {
    const onClickSpy = sinon.spy()
    const link = '/link'
    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <CustomLink to={link} onClick={onClickSpy}>
            Custom Link
          </CustomLink>
        </Route>
      </MemoryRouter>
    )

    const { getByText } = container
    const customLinkElement = getByText('Custom Link')
    fireEvent.click(customLinkElement)

    expect(mockHistoryPush).toHaveBeenCalledWith(link)
    expect(onClickSpy).toHaveBeenCalled()
  })

  it('handles removing item correctly', () => {
    const link = '/link'
    const removeRecentItemStub = sinon.stub()
    const removeData = { abc: '123' }
    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <CustomLink
            to={link}
            removeRecentItem={removeRecentItemStub}
            removeData={removeData}
          >
            Custom Link
          </CustomLink>
        </Route>
      </MemoryRouter>
    )

    const { baseElement } = container
    const removeIconItem = baseElement.getElementsByClassName('remove-btn')[0]
    fireEvent.click(removeIconItem)

    expect(removeRecentItemStub).toHaveBeenCalledWith(removeData)
  })
})
