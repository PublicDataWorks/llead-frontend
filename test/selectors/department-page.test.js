import {
  getIsDepartmentRequesting,
  departmentSelector,
  documentsSelector,
  documentsPaginationSelector,
  departmentRecentDataSelector,
  featuredOfficersSelector,
  featuredDocumentsSelector,
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
        city: 'News Orleans',
        address: '1 Third St #1, New Orleans, LA 70130',
        phone: '(504) 891-7585',
        documentsCount: 3,
        recentDocumentsCount: 2,
        datasetsCount: 5,
        recentDatasetsCount: 1,
        locationMapUrl: 'Map URL',
        parish: 'Orleans Parish',
        officersCount: 1000,
        newsArticlesCount: 123,
        recentNewsArticlesCount: 12,
        incidentForceCount: 1,
        dataPeriod: '1998-2019',
        sustainedComplaintsCount: 10,
        complaintsCount: 40,
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
        id: 1,
        name: 'Department data',
        city: 'News Orleans',
        address: '1 Third St #1, New Orleans, LA 70130',
        phone: '(504) 891-7585',
        documentsCount: 3,
        recentDocumentsCount: 2,
        datasetsCount: 5,
        recentDatasetsCount: 1,
        locationMapUrl: 'Map URL',
        parish: 'Orleans Parish',
        officersCount: 1000,
        newsArticlesCount: 123,
        recentNewsArticlesCount: 12,
        incidentForceCount: 1,
        dataPeriod: '1998-2019',
        complaintsCount: 40,
        sustainedComplaintPercentage: 25,
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

    it('returns no sustained allegations if no allegations', () => {
      const departmentData = {
        id: 1,
        name: 'Department data',
        city: 'News Orleans',
        sustainedComplaintsCount: 10,
        complaintsCount: 0,
      }

      const state = {
        departmentPage: {
          department: departmentData,
        },
      }

      const department = departmentSelector(state)

      expect(department).toStrictEqual({
        id: 1,
        name: 'Department data',
        city: 'News Orleans',
        complaintsCount: 0,
        sustainedComplaintPercentage: 0,
        wrglFiles: [],
      })
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

describe('#featuredOfficersSelector', () => {
  describe('has data', () => {
    it('returns featured officers data', () => {
      const featuredOfficersData = [
        {
          id: 15248,
          name: 'Jayson Germann',
          badges: [84],
          isStarred: true,
          complaintsCount: 84,
          useOfForcesCount: 0,
        },
        {
          id: 2436,
          name: 'Derrick Burmaster',
          badges: [85],
          isStarred: false,
          complaintsCount: 80,
          useOfForcesCount: 15,
        },
      ]
      const state = {
        departmentPage: {
          featuredOfficers: featuredOfficersData,
        },
      }

      const featuredOfficers = featuredOfficersSelector(state)

      expect(featuredOfficers).toStrictEqual([
        {
          id: 15248,
          name: 'Jayson Germann',
          badges: [84],
          isStarred: true,
          complaintsCount: 84,
          useOfForcesCount: 0,
        },
        {
          id: 2436,
          name: 'Derrick Burmaster',
          badges: [85],
          isStarred: false,
          complaintsCount: 80,
          useOfForcesCount: 15,
        },
      ])
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const state = {
        departmentPage: {},
      }
      const featuredOfficers = featuredOfficersSelector(state)

      expect(featuredOfficers).toStrictEqual([])
    })
  })
})
