import React from 'react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import { render, fireEvent } from '@testing-library/react'

import DepartmentDocuments from 'components/department-page/department-documents'

describe('Department Documents component', () => {
  it('should render department documents correctly', () => {
    const paginationData = {
      count: 2,
      limit: 2,
      offset: 2,
    }
    const documentsData = [
      {
        id: 1,
        documentType: 'json',
        title: 'title 1',
        url: 'url 1',
        incidentDate: 'May 04, 2020',
      },
      {
        id: 2,
        documentType: 'jpeg',
        title: 'title 2',
        url: 'url 2',
        incidentDate: 'Jan 21, 2019',
      },
    ]
    const fetchDocumentsSpy = sinon.spy()

    const container = render(
      <MemoryRouter initialEntries={['departments/1']}>
        <Route path='departments/:id'>
          <DepartmentDocuments
            departmentId={1}
            documents={documentsData}
            {...paginationData}
            fetchDocuments={fetchDocumentsSpy}
          />
        </Route>
      </MemoryRouter>
    )

    const { getByText, baseElement } = container

    expect(fetchDocumentsSpy.firstCall.args).toEqual([1, {}])

    expect(getByText(`Documents (${paginationData.count})`)).toBeTruthy()
    expect(
      getByText(`2 of ${paginationData.count} documents displayed`)
    ).toBeTruthy()

    const documentElements = baseElement.getElementsByClassName('document-item')
    const firstDocument = documentElements[0]
    const secondDocument = documentElements[1]

    const firstDocumentTitle = firstDocument.getElementsByClassName(
      'document-item-name'
    )[0]
    expect(firstDocumentTitle.textContent).toEqual('title 1')

    const secondDocumentTitle = secondDocument.getElementsByClassName(
      'document-item-name'
    )[0]
    expect(secondDocumentTitle.textContent).toEqual('title 2')

    const loadMoreButton = getByText('Load 2 more')
    expect(loadMoreButton).toBeTruthy()
    fireEvent.click(loadMoreButton)

    expect(fetchDocumentsSpy.secondCall.args).toEqual([
      1,
      {
        limit: 2,
        offset: 2,
      },
    ])
  })

  it('should search for documents', () => {
    const departmentId = 1
    const paginationData = {
      count: 2,
      limit: 2,
      offset: 2,
    }
    const documentsData = [
      {
        id: 1,
        documentType: 'json',
        title: 'title 1',
        url: 'url 1',
        incidentDate: 'May 04, 2020',
      },
      {
        id: 2,
        documentType: 'jpeg',
        title: 'title 2',
        url: 'url 2',
        incidentDate: 'Jan 21, 2019',
      },
    ]
    const fetchDocumentsSpy = sinon.spy()

    const container = render(
      <MemoryRouter initialEntries={['departments/1']}>
        <Route path='departments/:id'>
          <DepartmentDocuments
            departmentId={departmentId}
            documents={documentsData}
            {...paginationData}
            fetchDocuments={fetchDocumentsSpy}
          />
        </Route>
      </MemoryRouter>
    )

    const { getByPlaceholderText } = container

    const searchInput = getByPlaceholderText(
      'Search by name, department, or keyword'
    )
    fireEvent.change(searchInput, { target: { value: 'text' } })

    expect(fetchDocumentsSpy).toHaveBeenCalledWith(departmentId, { q: 'text' })
  })
})
