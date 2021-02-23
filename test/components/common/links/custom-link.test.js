import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

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
    const link = '/link'
    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <CustomLink to={link}>Custom Link</CustomLink>
        </Route>
      </MemoryRouter>
    )

    const { getByText } = container
    const customLinkElement = getByText('Custom Link')
    fireEvent.click(customLinkElement)

    expect(mockHistoryPush).toHaveBeenCalledWith(link)
  })
})
