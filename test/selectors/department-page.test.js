import {
  departmentSelector,
  documentsSelector,
  documentsPaginationSelector,
} from 'selectors/department-page'

describe('#departmentSelector', () => {
  describe('has data', () => {
    it('returns department data', () => {
      const departmentData = {
        id: 1,
        name: 'Department data',
        wrglFiles: [
          {
            id: 2,
            name: 'Com Madison Village pd',
            slug: 'com-madisonville-pd',
            extraField: 'field',
          },
        ],
      }
      const state = {
        departmentPage: {
          department: departmentData,
        },
      }

      const department = departmentSelector(state)

      expect(department).toStrictEqual({
        ...departmentData,
        wrglFiles: [
          {
            id: 2,
            name: 'Com Madison Village pd',
            slug: 'com-madisonville-pd',
          },
        ],
      })
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const department = departmentSelector({})

      expect(department).toStrictEqual({ wrglFiles: [] })
    })
  })
})

describe('#documentsSelector', () => {
  describe('has data', () => {
    it('returns department data', () => {
      const documentsData = [
        {
          id: 39,
          documentType: 'json',
          title: 'Pattern risk team election myself suffer wind.',
          url: '/glass/shoulder.pdf',
          incidentDate: '2020-05-04',
          previewImageUrl: '/him/process.jpg',
          pagesCount: 15,
          extraField: 'data',
        },
      ]
      const state = {
        departmentPage: {
          documents: documentsData,
        },
      }

      const documents = documentsSelector(state)

      expect(documents).toStrictEqual([
        {
          id: 39,
          documentType: 'json',
          title: 'Pattern risk team election myself suffer wind.',
          url: '/glass/shoulder.pdf',
          incidentDate: 'May 4, 2020',
          previewImageUrl: '/him/process.jpg',
          pagesCount: 15,
        },
      ])
    })
  })

  describe('does not have data', () => {
    it('returns falsy data', () => {
      const documents = documentsSelector([])

      expect(documents).toStrictEqual([])
    })
  })
})

describe('#documentsPaginationSelector', () => {
  describe('has data', () => {
    it('returns department data', () => {
      const documentsPaginationData = {
        limit: 2,
        offset: 2,
        count: 1,
        extraField: 'data',
      }
      const state = {
        departmentPage: {
          documentsPagination: documentsPaginationData,
        },
      }

      const documentsPagination = documentsPaginationSelector(state)

      expect(documentsPagination).toStrictEqual({
        limit: 2,
        offset: 2,
        count: 1,
      })
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const documentsPagination = documentsPaginationSelector({})

      expect(documentsPagination).toStrictEqual({})
    })
  })
})
