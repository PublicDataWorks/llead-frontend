import {
  getIsDepartmentRequesting,
  departmentSelector,
  documentsSelector,
  documentsPaginationSelector,
  departmentRecentDataSelector,
} from 'selectors/department-page'

describe('#getIsDepartmentRequesting', () => {
  it('returns isRequesting', () => {
    const state = {
      departmentPage: {
        isRequesting: true,
      },
    }
    const isRequesting = getIsDepartmentRequesting(state)

    expect(isRequesting).toBe(true)
  })
})

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

      expect(department).toStrictEqual({})
    })
  })
})

describe('#departmentRecentDataSelector', () => {
  it('returns departmentRecentData', () => {
    const departmentData = {
      id: 1,
      name: 'Department data',
      city: 'Baton Rouge',
      parish: 'East Baton Rouge',
      locationMapUrl: 'http://mapurl.com/department1',
      extraField: 'field',
    }
    const state = {
      departmentPage: {
        department: departmentData,
      },
    }

    const departmentRecentData = departmentRecentDataSelector(state)

    expect(departmentRecentData).toStrictEqual({
      id: 1,
      name: 'Department data',
      city: 'Baton Rouge',
      parish: 'East Baton Rouge',
      locationMapUrl: 'http://mapurl.com/department1',
    })
  })
})

describe('#documentsSelector', () => {
  describe('has data', () => {
    it('returns documents data', () => {
      const documentsData = [
        {
          id: 39,
          documentType: 'json',
          title: 'Pattern risk team election myself suffer wind.',
          url: 'http://documents.com/glass/shoulder.pdf',
          incidentDate: '2020-05-04',
          extraField: 'data',
          departments: [
            {
              id: 22,
              name: 'Petersonmouth Department',
            },
          ],
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
          url: 'http://documents.com/glass/shoulder.pdf',
          incidentDate: 'May 4, 2020',
          recentData: {
            id: 39,
            documentType: 'json',
            title: 'Pattern risk team election myself suffer wind.',
            url: 'http://documents.com/glass/shoulder.pdf',
            incidentDate: 'May 4, 2020',
            departments: [
              {
                id: 22,
                name: 'Petersonmouth Department',
              },
            ],
          },
        },
      ])
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const state = {
        departmentPage: {},
      }
      const documents = documentsSelector(state)

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
