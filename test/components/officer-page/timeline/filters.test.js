import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import TimelineFilters from 'components/officer-page/timeline/filters'

describe('TimelineFilters component', () => {
  const timelineFilterGroups = [
    {
      filterGroupKey: '',
      title: 'All',
    },
    {
      filterGroupKey: 'COMPLAINTS',
      title: 'Complaints',
      count: 3,
    },
    {
      filterGroupKey: 'DOCUMENTS',
      title: 'Documents',
      count: 4,
    },
    {
      filterGroupKey: 'RANKS_AND_UNITS',
      title: 'Rank/unit',
      count: 1,
    },
  ]

  it('renders all timeline filters', () => {
    const container = render(
      <TimelineFilters
        timelineFilterGroups={timelineFilterGroups}
        filterGroupKey=''
      />
    )

    const { baseElement, queryByText } = container

    const filterItems = baseElement.getElementsByClassName('filter-item')
    expect(filterItems.length).toEqual(4)

    const filterAll = queryByText('All')
    expect(filterAll).toBeTruthy()
    expect(filterAll.className).toContain('filter-item-selected')

    const filterComplaints = queryByText('Complaints (3)')
    expect(filterComplaints).toBeTruthy()
    expect(filterComplaints.className).not.toContain('filter-item-selected')

    const filterDocuments = queryByText('Documents (4)')
    expect(filterDocuments).toBeTruthy()
    expect(filterDocuments.className).not.toContain('filter-item-selected')

    const filterRanksAndUnits = queryByText('Rank/unit (1)')
    expect(filterRanksAndUnits).toBeTruthy()
    expect(filterRanksAndUnits.className).not.toContain('filter-item-selected')
  })

  it('changes filter group key when click on item', () => {
    const mockChangeFilterGroupKey = jest.fn()

    const container = render(
      <TimelineFilters
        timelineFilterGroups={timelineFilterGroups}
        changeFilterGroupKey={mockChangeFilterGroupKey}
      />
    )

    const { queryByText } = container

    const filterDocuments = queryByText('Documents (4)')
    fireEvent.click(filterDocuments)

    expect(mockChangeFilterGroupKey).toHaveBeenCalledWith('DOCUMENTS')
  })

  it('highlights filter item', () => {
    const container = render(
      <TimelineFilters
        timelineFilterGroups={timelineFilterGroups}
        filterGroupKey='COMPLAINTS'
      />
    )

    const { queryByText } = container

    const filterAll = queryByText('All')
    expect(filterAll).toBeTruthy()
    expect(filterAll.className).not.toContain('filter-item-selected')

    const filterComplaints = queryByText('Complaints (3)')
    expect(filterComplaints).toBeTruthy()
    expect(filterComplaints.className).toContain('filter-item-selected')

    const filterDocuments = queryByText('Documents (4)')
    expect(filterDocuments).toBeTruthy()
    expect(filterDocuments.className).not.toContain('filter-item-selected')

    const filterRanksAndUnits = queryByText('Rank/unit (1)')
    expect(filterRanksAndUnits).toBeTruthy()
    expect(filterRanksAndUnits.className).not.toContain('filter-item-selected')
  })
})
