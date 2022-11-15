import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

import FeaturedOfficerCard from 'components/department-page/featured-items/featured-officer-card'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('Featured officer card component', () => {
  beforeEach(() => {
    mockHistoryPush.mockClear()
  })

  it('renders correctly', () => {
    const officerData = {
      id: 15248,
      name: 'Jayson Germann',
      badges: ['80', '100'],
      isStarred: true,
      complaintsCount: 84,
      useOfForcesCount: 10,
      latestRank: 'senior',
    }
    const props = {
      item: officerData,
      className: 'custom-class-name',
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <FeaturedOfficerCard {...props} />
        </Route>
      </MemoryRouter>
    )
    const { baseElement, getByText } = container
    const officerCard = baseElement.getElementsByClassName(
      'featured-officer-card'
    )[0]

    expect(officerCard.classList.value).toContain('custom-class-name')
    expect(
      officerCard.getElementsByClassName('star-corner')[0].classList.length
    ).toEqual(1)

    expect(getByText('Senior').className).toEqual('officer-rank')

    expect(getByText('Jayson Germann').className).toEqual('officer-name')
    expect(
      officerCard.getElementsByClassName('featured-officer-badges')[0]
        .textContent
    ).toEqual('80, 100')

    expect(
      officerCard.getElementsByClassName('allegation-row')[0].textContent
    ).toEqual('84 Allegations')

    expect(
      officerCard.getElementsByClassName('use-of-force-row')[0].textContent
    ).toEqual('10 Uses of force')

    const featuredOfficerCardLink = baseElement.getElementsByClassName(
      'custom-link'
    )[0]

    fireEvent.click(featuredOfficerCardLink)
    expect(mockHistoryPush).toHaveBeenCalledWith(
      '/officers/15248/jayson-germann'
    )
  })

  it('renders without useOfForcesCount', () => {
    const officerData = {
      id: 15248,
      name: 'Jayson Germann',
      badges: ['80', '100'],
      isStarred: true,
      complaintsCount: 84,
      useOfForcesCount: 0,
      latestRank: 'senior',
    }
    const props = {
      item: officerData,
      className: 'custom-class-name',
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <FeaturedOfficerCard {...props} />
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container
    const officerCard = baseElement.getElementsByClassName(
      'featured-officer-card'
    )[0]

    expect(
      officerCard.getElementsByClassName('allegation-row')[0].textContent
    ).toEqual('84 Allegations')

    expect(
      officerCard.getElementsByClassName('use-of-force-row').length
    ).toEqual(0)
  })

  it('renders without complaintsCount', () => {
    const officerData = {
      id: 15248,
      name: 'Jayson Germann',
      badges: ['80', '100'],
      isStarred: true,
      complaintsCount: 0,
      useOfForcesCount: 10,
      latestRank: 'senior',
    }
    const props = {
      item: officerData,
      className: 'custom-class-name',
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <FeaturedOfficerCard {...props} />
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container
    const officerCard = baseElement.getElementsByClassName(
      'featured-officer-card'
    )[0]

    expect(officerCard.getElementsByClassName('allegation-row').length).toEqual(
      0
    )

    expect(
      officerCard.getElementsByClassName('use-of-force-row')[0].textContent
    ).toEqual('10 Uses of force')
  })

  it('renders without useOfForcesCount and complaintsCount', () => {
    const officerData = {
      id: 15248,
      name: 'Jayson Germann',
      badges: ['80', '100'],
      isStarred: true,
      complaintsCount: 0,
      useOfForcesCount: 0,
      latestRank: 'senior',
    }
    const props = {
      item: officerData,
      className: 'custom-class-name',
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <FeaturedOfficerCard {...props} />
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container
    const officerCard = baseElement.getElementsByClassName(
      'featured-officer-card'
    )[0]

    expect(officerCard.getElementsByClassName('allegation-row').length).toEqual(
      0
    )

    expect(
      officerCard.getElementsByClassName('use-of-force-row').length
    ).toEqual(0)
  })
})
