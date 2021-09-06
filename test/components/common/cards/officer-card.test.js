import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

import OfficerCard from 'components/common/cards/officer-card'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('Officer card component', () => {
  beforeEach(() => {
    mockHistoryPush.mockClear()
  })

  it('should render correctly', () => {
    const onItemClickStub = jest.fn()
    const props = {
      id: 1,
      name: 'mark carlson',
      badges: ['12435', '612'],
      department: {
        id: 'baton-rouge-pd',
        name: 'Baton Rouge PD',
      },
      className: 'custom-class-name',
      onItemClick: onItemClickStub,
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <OfficerCard {...props} />
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container
    const officerCard = baseElement.getElementsByClassName('officer-card')[0]

    expect(officerCard.classList.value).toContain('custom-class-name')
    expect(officerCard.textContent.includes('Mark Carlson')).toBe(true)
    expect(officerCard.textContent.includes(props.badges[0])).toBe(true)
    expect(officerCard.textContent.includes(props.badges[1])).toBe(true)
    expect(officerCard.textContent.includes(props.department.name)).toBe(true)

    fireEvent.click(officerCard)
    expect(onItemClickStub).toHaveBeenCalled()
    expect(mockHistoryPush).toHaveBeenCalledWith('/officers/1/mark-carlson')
  })
})
