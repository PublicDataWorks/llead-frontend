import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import sinon from 'sinon'

import SearchBar from 'components/common/search-feature/search-bar'

describe('Search Bar component', () => {
  it('renders correctly', () => {
    const switchSectionSpy = sinon.spy()

    const props = {
      section: 'all',
      resultCount: {
        all: 9,
        departments: 1,
        officers: 2,
        documents: 3,
        articles: 3,
      },
      switchSection: switchSectionSpy,
      isDepartmentSearch: false,
    }

    const container = render(<SearchBar {...props} />)

    const { baseElement, getByText } = container

    expect(baseElement.getElementsByClassName('swiper-slide').length).toEqual(5)
    expect(getByText('All').classList.value).toContain('is-active')
    expect(getByText('Departments').classList.value).not.toContain('is-active')
    expect(getByText('9').classList.value).toContain('is-active')
  })

  it('searches within department', () => {
    const switchSectionSpy = sinon.spy()

    const props = {
      section: 'all',
      resultCount: {
        all: 9,
        departments: 1,
        officers: 2,
        documents: 3,
        articles: 3,
      },
      switchSection: switchSectionSpy,
      isDepartmentSearch: true,
    }

    const container = render(<SearchBar {...props} />)

    const { baseElement, queryByText } = container

    expect(baseElement.getElementsByClassName('swiper-slide').length).toEqual(3)
    expect(queryByText('all')).toBeFalsy()
    expect(queryByText('departments')).toBeFalsy()
  })

  it('switches sections', () => {
    const switchSectionSpy = sinon.spy()

    const props = {
      section: 'all',
      resultCount: {
        all: 9,
        departments: 1,
        officers: 2,
        documents: 3,
        articles: 3,
      },
      switchSection: switchSectionSpy,
      isDepartmentSearch: false,
    }

    const container = render(<SearchBar {...props} />)

    const { queryByText } = container

    const departmentSection = queryByText('Departments')
    fireEvent.click(departmentSection)

    expect(switchSectionSpy).toHaveBeenCalled()
  })

  it('navigates between slides', async () => {
    const switchSectionSpy = sinon.spy()

    const props = {
      section: 'all',
      resultCount: {
        all: 9,
        departments: 1,
        officers: 2,
        documents: 3,
        articles: 3,
      },
      switchSection: switchSectionSpy,
      isDepartmentSearch: false,
    }

    const container = render(<SearchBar {...props} />)

    const { baseElement } = container

    const prevBtn = baseElement.getElementsByClassName('carousel-prev')[0]
    const nextBtn = baseElement.getElementsByClassName('carousel-next')[0]

    await act(async () => {
      fireEvent.click(nextBtn)
    })

    await act(async () => {
      fireEvent.click(prevBtn)
    })
  })
})
