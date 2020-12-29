import { getDocument } from 'pages/document-page/services/selectors'

describe('#getDocument', () => {
  it('returns document data', () => {
    const documentData = {
      id: 1,
      title: 'title',
    }
    const state = {
      documentPage: {
        document: documentData,
      },
    }

    const document = getDocument(state)

    expect(document).toBe(documentData)
  })
})
