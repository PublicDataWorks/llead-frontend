import React from 'react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import { render, fireEvent } from '@testing-library/react'
import Modal from 'react-modal'

import FeaturedSearch from 'components/department-page/featured-search'

describe('featured search component', () => {
  beforeEach(() => {
    Modal.setAppElement(document.createElement('div'))
  })
  it('renders search officers correctly', () => {
    const officersData = [
      {
        id: 15248,
        name: 'Jayson Germann',
        badges: ['84'],
        complaintsCount: 84,
        useOfForcesCount: 0,
      },
      {
        id: 2436,
        name: 'Derrick Burmaster',
        badges: ['85'],
        complaintsCount: 80,
        useOfForcesCount: 15,
      },
    ]

    const fetchSearchItemsSpy = sinon.spy()

    const container = render(
      <MemoryRouter initialEntries={['departments/1']}>
        <Route path='departments/:id/'>
          <FeaturedSearch
            isSearchModalOpen={true}
            departmentId={'1'}
            departmentName='Deparment name'
            searchItems={officersData}
            fetchSearchItems={fetchSearchItemsSpy}
            itemType={'officers'}
          />
        </Route>
      </MemoryRouter>
    )

    const {
      getByText,
      getAllByText,
      getByPlaceholderText,
      baseElement,
    } = container

    expect(fetchSearchItemsSpy.firstCall.args).toEqual([
      '1',
      {
        q: '',
        kind: 'officers',
      },
    ])

    const featuredSearchModal = baseElement.getElementsByClassName(
      'featured-search-modal'
    )[0]

    expect(
      getByPlaceholderText('Search officers in Deparment name').className
    ).toEqual('transparent-input')
    expect(
      featuredSearchModal.getElementsByClassName('card-collection')[0]
    ).toBeTruthy()
    expect(getAllByText('Police Officer')).toBeTruthy()
    expect(getByText('Jayson Germann').className).toEqual('officer-name')
    expect(getByText('Derrick Burmaster').className).toEqual('officer-name')
  })

  it('does not render results if items are empty', () => {
    const itemsData = []

    const fetchSearchItemsSpy = sinon.spy()

    const container = render(
      <MemoryRouter initialEntries={['departments/1']}>
        <Route path='departments/:id/'>
          <FeaturedSearch
            isSearchModalOpen={true}
            departmentId={'1'}
            departmentName='Deparment name'
            searchItems={itemsData}
            fetchSearchItems={fetchSearchItemsSpy}
            itemType={'officers'}
          />
        </Route>
      </MemoryRouter>
    )

    const { baseElement } = container

    expect(fetchSearchItemsSpy.firstCall.args).toEqual([
      '1',
      {
        q: '',
        kind: 'officers',
      },
    ])

    const featuredSearchModal = baseElement.getElementsByClassName(
      'featured-search-modal'
    )[0]

    expect(
      featuredSearchModal.getElementsByClassName('card-collection')[0]
    ).toBeFalsy()
  })

  it('searches for officers', () => {
    const officersData = [
      {
        id: 15248,
        name: 'Jayson Germann',
        badges: ['84'],
        complaintsCount: 84,
        useOfForcesCount: 0,
      },
      {
        id: 2436,
        name: 'Derrick Burmaster',
        badges: ['85'],
        complaintsCount: 80,
        useOfForcesCount: 15,
      },
    ]

    const fetchSearchItemsSpy = sinon.spy()

    const container = render(
      <MemoryRouter initialEntries={['departments/1']}>
        <Route path='departments/:id/'>
          <FeaturedSearch
            isSearchModalOpen={true}
            departmentId={'1'}
            departmentName='Deparment name'
            searchItems={officersData}
            fetchSearchItems={fetchSearchItemsSpy}
            itemType={'officers'}
          />
        </Route>
      </MemoryRouter>
    )

    const { getByPlaceholderText } = container

    const searchInput = getByPlaceholderText(
      'Search officers in Deparment name'
    )

    fireEvent.change(searchInput, { target: { value: 'text' } })

    expect(fetchSearchItemsSpy).toHaveBeenCalledWith('1', {
      q: 'text',
      kind: 'officers',
    })
  })
})
