import {
  analyticSummarySelector,
  departmentsSelector,
  documentsSelector,
  officersSelector,
} from 'selectors/front-page'

describe('#analyticSummarySelector', () => {
  describe('has data', () => {
    it('returns analytic summary data', () => {
      const rawAnalyticSummary = {
        departmentsCount: 4,
        officersCount: 5,
        documentsCount: 6,
        recentDays: 30,
        recentDepartmentsCount: 1,
        recentOfficersCount: 2,
        recentDocumentsCount: 3,
      }

      const expectedAnalyticSummary = {
        departmentsCount: 4,
        officersCount: 5,
        documentsCount: 6,
        recentDays: 30,
        recentDepartmentsCount: 1,
        recentOfficersCount: 2,
        recentDocumentsCount: 3,
      }

      const state = {
        frontPage: {
          analyticSummary: rawAnalyticSummary,
        },
      }

      const analyticSummary = analyticSummarySelector(state)

      expect(analyticSummary).toStrictEqual(expectedAnalyticSummary)
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const analyticSummary = analyticSummarySelector({})

      expect(analyticSummary).toStrictEqual({})
    })
  })
})

describe('#departmentsSelector', () => {
  it('returns department data', () => {
    const rawDepartments = [
      {
        id: 1,
        name: 'Baton Rouge Department',
        city: 'Baton Rouge',
        parish: 'East Baton Rouge',
        locationMapUrl: 'http://mapurl.com/department1',
        extraField: 'field',
      },
      {
        id: 2,
        name: 'New Orleans Department',
        city: 'New Orleans',
        parish: 'Orleans',
        locationMapUrl: 'http://mapurl.com/department2',
        extraField: 'field',
      },
    ]

    const expectedDepartments = [
      {
        id: 1,
        name: 'Baton Rouge Department',
        city: 'Baton Rouge',
        parish: 'East Baton Rouge',
        locationMapUrl: 'http://mapurl.com/department1',
      },
      {
        id: 2,
        name: 'New Orleans Department',
        city: 'New Orleans',
        parish: 'Orleans',
        locationMapUrl: 'http://mapurl.com/department2',
      },
    ]

    const state = {
      frontPage: {
        departments: rawDepartments,
      },
    }

    const departments = departmentsSelector(state)

    expect(departments).toStrictEqual(expectedDepartments)
  })
})

describe('#officersSelector', () => {
  it('returns officers data', () => {
    const rawOfficers = [
      {
        id: 23,
        name: 'Mark Carlson',
        badges: ['12345', '567'],
        department: {
          id: 'north-paulaberg-department',
          name: 'North Paulaberg Department',
        },
        extraField: 'data',
      },
      {
        id: 22,
        name: 'Eric Patel',
        badges: ['12345'],
        department: null,
        extraField: 'data',
      },
    ]

    const expectedOfficers = [
      {
        id: 23,
        name: 'Mark Carlson',
        badges: ['12345', '567'],
        department: {
          id: 'north-paulaberg-department',
          name: 'North Paulaberg Department',
        },
      },
      {
        id: 22,
        name: 'Eric Patel',
        badges: ['12345'],
        department: {},
      },
    ]

    const state = {
      frontPage: {
        officers: rawOfficers,
      },
    }

    const officers = officersSelector(state)

    expect(officers).toStrictEqual(expectedOfficers)
  })
})

describe('#documentsSelector', () => {
  it('returns documents data', () => {
    const rawDocuments = [
      {
        id: 36,
        documentType: 'csv',
        title: 'Her hard step sea.',
        url: 'http://documents.com/century/five.pdf',
        previewImageUrl: '/cell/least.jpg',
        incidentDate: '2020-01-06',
        pagesCount: 5,
        departments: [
          {
            id: 22,
            name: 'Petersonmouth Department',
          },
        ],
        extraField: 'data',
      },
      {
        id: 35,
        documentType: 'webm',
        title: 'Yourself say language meeting ok.',
        url: 'http://documents.com/national/must.pdf',
        previewImageUrl: '/production/activity.jpg',
        incidentDate: '2020-01-06',
        pagesCount: 5,
        departments: [
          {
            id: 22,
            name: 'Petersonmouth Department',
          },
        ],
        extraField: 'data',
      },
    ]

    const expectedDocuments = [
      {
        id: 36,
        documentType: 'csv',
        title: 'Her hard step sea.',
        url: 'http://documents.com/century/five.pdf',
        previewImageUrl: '/cell/least.jpg',
        incidentDate: 'Jan 6, 2020',
        pagesCount: 5,
        departments: [
          {
            id: 22,
            name: 'Petersonmouth Department',
          },
        ],
      },
      {
        id: 35,
        documentType: 'webm',
        title: 'Yourself say language meeting ok.',
        url: 'http://documents.com/national/must.pdf',
        previewImageUrl: '/production/activity.jpg',
        incidentDate: 'Jan 6, 2020',
        pagesCount: 5,
        departments: [
          {
            id: 22,
            name: 'Petersonmouth Department',
          },
        ],
      },
    ]

    const state = {
      frontPage: {
        documents: rawDocuments,
      },
    }

    const documents = documentsSelector(state)

    expect(documents).toStrictEqual(expectedDocuments)
  })
})
