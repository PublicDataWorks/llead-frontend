import {
  getIsDepartmentRequesting,
  departmentSelector,
  departmentRecentDataSelector,
  featuredOfficersSelector,
  featuredDocumentsSelector,
  featuredNewsArticlesSelector,
  datasetsSelector,
  searchItemsSelector,
  searchItemsPaginationSelector,
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

describe('#featuredDocumentsSelector', () => {
  describe('has data', () => {
    it('returns featured documents data', () => {
      const featuredDocumentsData = [
        {
          id: 15248,
          title: 'Appeal hearing: Eric Curlee  on 2020-3-12',
          url: 'https://i.imgur.com/nHTFohI.csv',
          isStarred: true,
          incidentDate: '2020-03-12',
          previewImageUrl: 'https://i.imgur.com/nHTFohI.csv',
          pagesCount: 5,
        },
        {
          id: 770,
          title: 'Appeal hearing: Santiago St. Clair  on 2020-12-10',
          url: 'https://i.imgur.com/nHTFohI.csv',
          isStarred: false,
          incidentDate: '2020-12-10',
          previewImageUrl: 'https://i.imgur.com/nHTFohI.csv',
          pagesCount: 5,
        },
      ]
      const state = {
        departmentPage: {
          featuredDocuments: featuredDocumentsData,
        },
      }

      const featuredDocuments = featuredDocumentsSelector(state)

      expect(featuredDocuments).toStrictEqual([
        {
          id: 15248,
          title: 'Appeal hearing: Eric Curlee  on 2020-3-12',
          url: 'https://i.imgur.com/nHTFohI.csv',
          isStarred: true,
          incidentDate: '2020-03-12',
          previewImageUrl: 'https://i.imgur.com/nHTFohI.csv',
          pagesCount: 5,
        },
        {
          id: 770,
          title: 'Appeal hearing: Santiago St. Clair  on 2020-12-10',
          url: 'https://i.imgur.com/nHTFohI.csv',
          isStarred: false,
          incidentDate: '2020-12-10',
          previewImageUrl: 'https://i.imgur.com/nHTFohI.csv',
          pagesCount: 5,
        },
      ])
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const state = {
        departmentPage: {},
      }
      const featuredDocuments = featuredOfficersSelector(state)

      expect(featuredDocuments).toStrictEqual([])
    })
  })
})

describe('#featuredNewsArticlesSelector', () => {
  it('returns featured news articles data', () => {
    const featuredNewsArticlesData = [
      {
        id: 15248,
        title: 'Appeal hearing: Eric Curlee  on 2020-3-12',
        url: 'https://i.imgur.com/nHTFohI.csv',
        isStarred: true,
        publishedDate: '2020-03-12',
        sourceDisplayName: 'The lens',
      },
      {
        id: 770,
        title: 'Appeal hearing: Santiago St. Clair  on 2020-12-10',
        url: 'https://i.imgur.com/nHTFohI.csv',
        isStarred: false,
        publishedDate: '2020-12-10',
        sourceDisplayName: 'The lens',
      },
    ]
    const state = {
      departmentPage: {
        featuredNewsArticles: featuredNewsArticlesData,
      },
    }

    const featuredNewsArticles = featuredNewsArticlesSelector(state)

    expect(featuredNewsArticles).toStrictEqual([
      {
        id: 15248,
        title: 'Appeal hearing: Eric Curlee  on 2020-3-12',
        url: 'https://i.imgur.com/nHTFohI.csv',
        isStarred: true,
        publishedDate: '2020-03-12',
        sourceDisplayName: 'The lens',
      },
      {
        id: 770,
        title: 'Appeal hearing: Santiago St. Clair  on 2020-12-10',
        url: 'https://i.imgur.com/nHTFohI.csv',
        isStarred: false,
        publishedDate: '2020-12-10',
        sourceDisplayName: 'The lens',
      },
    ])
  })

  it('returns empty data if no data', () => {
    const state = {
      departmentPage: {},
    }
    const featuredNewsArticles = featuredOfficersSelector(state)

    expect(featuredNewsArticles).toStrictEqual([])
  })
})

describe('#datasetsSelector', () => {
  it('returns datasets', () => {
    const datasetsData = [
      {
        id: 1,
        name: 'Personnel (NOPD)',
        slug: 'per-new-orleans-pd',
        description: '',
        url: 'https://i.imgur.com/nHTFohI.csv',
        downloadUrl: 'https://i.imgur.com/nHTFohI.csv',
        defaultExpanded: true,
      },
    ]
    const state = {
      departmentPage: {
        datasets: datasetsData,
      },
    }

    const datasets = datasetsSelector(state)

    expect(datasets).toStrictEqual([
      {
        id: 1,
        name: 'Personnel (NOPD)',
        slug: 'per-new-orleans-pd',
        description: '',
        url: 'https://i.imgur.com/nHTFohI.csv',
        downloadUrl: 'https://i.imgur.com/nHTFohI.csv',
        defaultExpanded: true,
      },
    ])
  })

  it('returns empty data if no data', () => {
    const state = {
      departmentPage: {},
    }
    const datasets = featuredOfficersSelector(state)

    expect(datasets).toStrictEqual([])
  })
})

describe('#searchItemsSelector', () => {
  it('has data of officer', () => {
    const officerData = [
      {
        id: 15248,
        name: 'Jayson Germann',
        badges: ['84'],
        complaintsCount: 84,
        useOfForcesCount: 0,
      },
    ]

    const state = {
      departmentPage: {
        searchItems: officerData,
        searchItemsPagination: {
          kind: 'officers',
        },
      },
    }

    const officer = searchItemsSelector(state)

    expect(officer).toStrictEqual([
      {
        id: 15248,
        name: 'Jayson Germann',
        badges: ['84'],
        complaintsCount: 84,
        useOfForcesCount: 0,
      },
    ])
  })

  it('does not have data', () => {
    const state = {
      departmentPage: {},
    }
    const items = searchItemsSelector(state)

    expect(items).toStrictEqual([])
  })
})

describe('#searchItemsPaginationSelector', () => {
  it('has data', () => {
    const searchItemsPaginationData = {
      limit: 2,
      offset: 2,
      count: 1,
    }
    const state = {
      departmentPage: {
        searchItemsPagination: searchItemsPaginationData,
      },
    }

    const searchItemsPagination = searchItemsPaginationSelector(state)

    expect(searchItemsPagination).toStrictEqual({
      limit: 2,
      offset: 2,
      count: 1,
    })
  })

  it('does not have data', () => {
    const searchItemsPagination = searchItemsPaginationSelector({})

    expect(searchItemsPagination).toStrictEqual({})
  })
})
