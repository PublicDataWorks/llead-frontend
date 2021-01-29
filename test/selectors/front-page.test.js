import {
  analyticSummarySelector,
  departmentsSelector,
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
      },
      {
        id: 2,
        name: 'New Orleans Department',
        city: 'New Orleans',
        parish: 'Orleans',
        locationMapUrl: 'http://mapurl.com/department2',
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
          id: 26,
          name: 'North Paulaberg Department',
        },
      },
      {
        id: 22,
        name: 'Eric Patel',
        badges: ['12345'],
        department: null,
      },
    ]

    const expectedOfficers = [
      {
        name: 'Mark Carlson',
        badges: ['12345', '567'],
        department: {
          name: 'North Paulaberg Department',
        },
      },
      {
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
