import { getDocument } from 'pages/document-page/services/selectors'

describe('#getDocument', () => {
  describe('has data', () => {
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

      expect(document).toStrictEqual(documentData)
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const document = getDocument({})

      expect(document).toStrictEqual({})
    })
  })
})
