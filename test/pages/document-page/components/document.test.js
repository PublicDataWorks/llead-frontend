import React from 'react'
import { render, screen } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'

import Document from 'pages/document-page/components/document'

describe('Document component', () => {
  it('should render correctly', () => {
    const documentData = {
      id: 1,
      title: 'Document title',
    }
    const fetchDocumentSpy = sinon.spy()

    render(
      <MemoryRouter initialEntries={['documents/1']}>
        <Route path="documents/:id">
          <Document document={documentData} fetchDocument={fetchDocumentSpy} />
        </Route>
      </MemoryRouter>
    )

    expect(screen.getByRole('heading').textContent).toContain('DOCUMENT 1')
    expect(fetchDocumentSpy).toHaveBeenCalledWith('1')
  })
})
