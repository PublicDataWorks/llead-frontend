import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

import OfficerCard from 'components/common/cards/officer-card'
import sinon from 'sinon'

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
      latestRank: 'senior',
      departments: [
        {
          id: 'baton-rouge-pd',
          name: 'Baton Rouge PD',
        },
      ],
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
    const { baseElement, getByText } = container
    const officerCard = baseElement.getElementsByClassName('officer-card')[0]

    expect(officerCard.classList.value).toContain('custom-class-name')
    expect(getByText('Senior').className).toEqual('officer-rank')
    expect(officerCard.textContent.includes('Mark Carlson')).toBe(true)
    expect(officerCard.textContent.includes(props.badges[0])).toBe(true)
    expect(officerCard.textContent.includes(props.badges[1])).toBe(true)
    expect(officerCard.textContent.includes(props.departments[0].name)).toBe(
      true
    )

    const officerCardLink = baseElement.getElementsByClassName('custom-link')[0]

    fireEvent.click(officerCardLink)
    expect(onItemClickStub).toHaveBeenCalled()
    expect(mockHistoryPush).toHaveBeenCalledWith('/officers/1/mark-carlson')
  })

  it('renders if officer has more than 1 deparment', () => {
    const onItemClickStub = jest.fn()
    const props = {
      id: 1,
      name: 'mark carlson',
      badges: ['12435', '612'],
      latestRank: 'senior',
      departments: [
        {
          id: 'baton-rouge-pd',
          name: 'Baton Rouge PD',
        },
        {
          id: 'harmonbury-department',
          name: 'Harmonbury Department',
        },
      ],
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

    expect(officerCard.textContent.includes('Mark Carlson')).toBe(true)
    expect(officerCard.textContent.includes(props.departments[0].name)).toBe(
      true
    )
    expect(officerCard.textContent.includes('+1 more')).toBe(true)
  })

  it('should remove correctly', () => {
    const removeRecentItemStub = sinon.stub()
    const props = {
      isLoggedIn: true,
      id: 1,
      name: 'mark carlson',
      badges: ['12435', '612'],
      departments: [
        {
          id: 'baton-rouge-pd',
          name: 'Baton Rouge PD',
        },
      ],
      className: 'custom-class-name',
      removeRecentItem: removeRecentItemStub,
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <OfficerCard {...props} />
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container
    const removeIconItem = baseElement.getElementsByClassName('remove-btn')[0]
    fireEvent.click(removeIconItem)

    expect(removeRecentItemStub).toHaveBeenCalledWith({
      id: 1,
      type: 'OFFICER',
    })
  })

  it('does not show remove button if anonymous user', () => {
    const removeRecentItemStub = sinon.stub()
    const props = {
      isLoggedIn: false,
      id: 1,
      name: 'mark carlson',
      badges: ['12435', '612'],
      departments: [
        {
          id: 'baton-rouge-pd',
          name: 'Baton Rouge PD',
        },
      ],
      className: 'custom-class-name',
      removeRecentItem: removeRecentItemStub,
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <OfficerCard {...props} />
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container

    expect(baseElement.getElementsByClassName('remove-btn').length).toEqual(0)
  })
})
