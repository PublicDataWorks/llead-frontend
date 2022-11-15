import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import sinon from 'sinon'

import SearchAll from 'components/common/search-feature/search-all'

describe('SearchAll component', () => {
  it('renders correctly', () => {
    const saveRecentItemSpy = sinon.spy()
    const onItemClickSpy = sinon.spy()
    const switchSectionSpy = sinon.spy()

    const props = {
      searchAllResults: {
        agencies: {
          count: 6,
          results: [
            {
              id: 'petersonmouth-department',
              name: 'Petersonmouth Department',
              city: 'Baton Rouge',
              parish: 'East Baton Rouge',
              locationMapUrl: null,
            },
          ],
        },
        officers: {
          count: 7,
          results: [
            {
              id: 9,
              name: 'Robert Craig',
              badges: ['12345'],
              departments: [
                {
                  id: 'petersonmouth-department',
                  name: 'Petersonmouth Department',
                },
              ],
            },
          ],
        },
        documents: {
          count: 8,
          results: [
            {
              id: 22,
              documentType: 'pdf',
              title: 'Especially sense available best.',
              url: 'http://documents.com/hundred/work.pdf',
              incidentDate: '2020-01-06',
              departments: [
                {
                  id: 'petersonmouth-department',
                  name: 'Petersonmouth Department',
                },
              ],
              textContent: 'Text content',
            },
          ],
        },
        articles: {
          count: 8,
          results: [
            {
              id: 25,
              sourceName: 'Source',
              title: 'This is title',
              url: 'http://documents.com/hundred/work.pdf',
              publishedDate: 'Jan 10, 2021',
              author: 'Staff Writer',
              content: 'Text content key',
              contentHighlight: 'Text content <em>key</em>',
              authorHighlight: null,
            },
          ],
        },
      },
      searchQuery: 'test',
      saveRecentItem: saveRecentItemSpy,
      onItemClick: onItemClickSpy,
      switchSection: switchSectionSpy,
    }

    const container = render(<SearchAll {...props} />)

    const { baseElement, getByText, getAllByText } = container

    expect(baseElement.getElementsByClassName('search-result').length).toEqual(
      4
    )
    expect(
      baseElement.getElementsByClassName('search-title')[0].textContent
    ).toEqual('6 results for\u00A0\u201Ctest\u201D\u00A0in\u00A0agencies')
    expect(
      baseElement.getElementsByClassName('search-title')[1].textContent
    ).toEqual('7 results for\u00A0\u201Ctest\u201D\u00A0in\u00A0officers')
    expect(
      baseElement.getElementsByClassName('search-title')[2].textContent
    ).toEqual('8 results for\u00A0\u201Ctest\u201D\u00A0in\u00A0documents')
    expect(
      baseElement.getElementsByClassName('search-title')[3].textContent
    ).toEqual('8 results for\u00A0\u201Ctest\u201D\u00A0in\u00A0articles')

    expect(getByText('+ 1 more').className).toEqual('search-more')
    expect(getByText('+ 2 more').className).toEqual('search-more')
    expect(getAllByText('+ 3 more')[0].className).toEqual('search-more')

    expect(
      baseElement.getElementsByClassName('department-item').length
    ).toEqual(1)
    expect(baseElement.getElementsByClassName('officer-item').length).toEqual(1)
    expect(baseElement.getElementsByClassName('document-item').length).toEqual(
      1
    )
    expect(
      baseElement.getElementsByClassName('news-article-item').length
    ).toEqual(1)

    const departmentShowMoreBtn = getByText('+ 1 more')
    fireEvent.click(departmentShowMoreBtn)

    expect(switchSectionSpy).toHaveBeenCalledWith('agencies')
  })

  it('renders results when count less than show more limit', () => {
    const saveRecentItemSpy = sinon.spy()
    const onItemClickSpy = sinon.spy()
    const switchSectionSpy = sinon.spy()

    const props = {
      searchAllResults: {
        agencies: {
          count: 1,
          results: [
            {
              id: 'petersonmouth-department',
              name: 'Petersonmouth Department',
              city: 'Baton Rouge',
              parish: 'East Baton Rouge',
              locationMapUrl: null,
            },
          ],
        },
        officers: {
          count: 2,
          results: [
            {
              id: 9,
              name: 'Robert Craig',
              badges: ['12345'],
              departments: [
                {
                  id: 'petersonmouth-department',
                  name: 'Petersonmouth Department',
                },
              ],
            },
          ],
        },
        documents: {
          count: 3,
          results: [
            {
              id: 22,
              documentType: 'pdf',
              title: 'Especially sense available best.',
              url: 'http://documents.com/hundred/work.pdf',
              incidentDate: '2020-01-06',
              departments: [
                {
                  id: 'petersonmouth-department',
                  name: 'Petersonmouth Department',
                },
              ],
              textContent: 'Text content',
            },
          ],
        },
        articles: {
          count: 3,
          results: [
            {
              id: 25,
              sourceName: 'Source',
              title: 'This is title',
              url: 'http://documents.com/hundred/work.pdf',
              publishedDate: 'Jan 10, 2021',
              author: 'Staff Writer',
              content: 'Text content key',
              contentHighlight: 'Text content <em>key</em>',
              authorHighlight: null,
            },
          ],
        },
      },
      searchQuery: 'test',
      saveRecentItem: saveRecentItemSpy,
      onItemClick: onItemClickSpy,
      switchSection: switchSectionSpy,
    }

    const container = render(<SearchAll {...props} />)

    const { baseElement } = container

    const showMoreBtns = baseElement.getElementsByClassName('search-more')
    expect(showMoreBtns.length).toEqual(0)
  })

  it('does not renders results when count equal to 0', () => {
    const saveRecentItemSpy = sinon.spy()
    const onItemClickSpy = sinon.spy()
    const switchSectionSpy = sinon.spy()

    const props = {
      searchAllResults: {
        agencies: {
          count: 1,
          results: [
            {
              id: 'petersonmouth-department',
              name: 'Petersonmouth Department',
              city: 'Baton Rouge',
              parish: 'East Baton Rouge',
              locationMapUrl: null,
            },
          ],
        },
        officers: {
          count: 0,
          results: [],
        },
        documents: {
          count: 0,
          results: [],
        },
        articles: {
          count: 0,
          results: [],
        },
      },
      searchQuery: 'test',
      saveRecentItem: saveRecentItemSpy,
      onItemClick: onItemClickSpy,
      switchSection: switchSectionSpy,
    }

    const container = render(<SearchAll {...props} />)

    const { baseElement } = container

    expect(baseElement.getElementsByClassName('search-result').length).toEqual(
      1
    )
    expect(
      baseElement.getElementsByClassName('department-item').length
    ).toEqual(1)
  })
})
