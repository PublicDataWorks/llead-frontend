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

  it('renders correctly with postitive complaint count', () => {
    const officerData = {
      id: 15248,
      name: 'Jayson Germann',
      badges: ['80', '100'],
      isStarred: true,
      complaintsCount: 84,
      useOfForcesCount: 0,
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

    expect(getByText('Jayson Germann').className).toEqual('officer-name')
    expect(
      officerCard.getElementsByClassName('featured-officer-badges')[0]
        .textContent
    ).toEqual('80, 100')

    expect(
      officerCard.getElementsByClassName('allegation-count')[0].textContent
    ).toEqual('84')
    expect(getByText('Allegations').className).toEqual('label')

    expect(officerCard.textContent.includes('-- Uses of force')).toBeTruthy()
    expect(getByText('Uses of force').className).toEqual('')

    const featuredOfficerCardLink = baseElement.getElementsByClassName(
      'custom-link'
    )[0]

    fireEvent.click(featuredOfficerCardLink)
    expect(mockHistoryPush).toHaveBeenCalledWith(
      '/officers/15248/jayson-germann'
    )
  })

  it('renders correctly with postitive useOfForcesCount', () => {
    const officerData = {
      id: 15248,
      name: 'Jayson Germann',
      badges: ['80', '100'],
      isStarred: true,
      complaintsCount: 0,
      useOfForcesCount: 10,
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

    expect(getByText('Jayson Germann').className).toEqual('officer-name')
    expect(
      officerCard.getElementsByClassName('featured-officer-badges')[0]
        .textContent
    ).toEqual('80, 100')

    expect(officerCard.textContent.includes('-- Allegations')).toBeTruthy()
    expect(getByText('Allegations').className).toEqual('')

    expect(officerCard.textContent.includes('10 Uses of force')).toBeTruthy()
    expect(getByText('Uses of force').className).toEqual('label')

    const featuredOfficerCardLink = baseElement.getElementsByClassName(
      'custom-link'
    )[0]

    fireEvent.click(featuredOfficerCardLink)
    expect(mockHistoryPush).toHaveBeenCalledWith(
      '/officers/15248/jayson-germann'
    )
  })
})
