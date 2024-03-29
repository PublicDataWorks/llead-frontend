import {
  departmentsSelector,
  documentsSelector,
  officersSelector,
  newsArticlesSelector,
  frontPageOrdersSelector,
  findingsSelector,
} from 'selectors/front-page'

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
        departments: [
          {
            id: 'north-paulaberg-department',
            name: 'North Paulaberg Department',
          },
          {
            id: 'harmonbury-department',
            name: 'Harmonbury Department',
          },
        ],
        latestRank: 'senior',
        extraField: 'data',
      },
      {
        id: 22,
        name: 'Eric Patel',
        badges: ['12345'],
        departments: [],
        latestRank: 'junior',
        extraField: 'data',
      },
    ]

    const expectedOfficers = [
      {
        id: 23,
        name: 'Mark Carlson',
        badges: ['12345', '567'],
        departments: [
          {
            id: 'north-paulaberg-department',
            name: 'North Paulaberg Department',
          },
          {
            id: 'harmonbury-department',
            name: 'Harmonbury Department',
          },
        ],
        latestRank: 'senior',
      },
      {
        id: 22,
        name: 'Eric Patel',
        badges: ['12345'],
        departments: [],
        latestRank: 'junior',
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

describe('#newsArticlesSelector', () => {
  it('returns news articles data', () => {
    const rawNewsArticles = [
      {
        id: 1,
        sourceName: 'The lens',
        url: 'https://i.imgur.com/news-article1.pdf',
        title: 'news-article-1',
        date: 'Nov 9, 2020',
        redundantField: 'data',
      },
      {
        id: 2,
        sourceName: 'The advocate',
        url: 'https://i.imgur.com/news-article2.pdf',
        title: 'news-article-2',
        date: 'Nov 10, 2020',
        redundantField: 'data',
      },
    ]

    const expectedNewsArticles = [
      {
        id: 1,
        sourceName: 'The lens',
        url: 'https://i.imgur.com/news-article1.pdf',
        title: 'news-article-1',
        publishedDate: 'Nov 9, 2020',
        date: 'Nov 9, 2020',
      },
      {
        id: 2,
        sourceName: 'The advocate',
        url: 'https://i.imgur.com/news-article2.pdf',
        title: 'news-article-2',
        publishedDate: 'Nov 10, 2020',
        date: 'Nov 10, 2020',
      },
    ]

    const state = {
      frontPage: {
        newsArticles: rawNewsArticles,
      },
    }

    const newsArticles = newsArticlesSelector(state)

    expect(newsArticles).toStrictEqual(expectedNewsArticles)
  })
})

describe('#frontPageOrdersSelector', () => {
  it('returns front page orders data', () => {
    const rawOrdersData = [
      {
        section: 'DEPARTMENT',
        order: 1,
      },
      {
        section: 'OFFICER',
        order: 2,
      },
    ]

    const expectedOrdersData = {
      DEPARTMENT: 1,
      OFFICER: 2,
    }

    const state = {
      frontPage: {
        frontPageOrders: rawOrdersData,
      },
    }

    const ordersData = frontPageOrdersSelector(state)

    expect(ordersData).toStrictEqual(expectedOrdersData)
  })
})

describe('#findingsSelector', () => {
  it('returns findings data', () => {
    const rawFindings = {
      backgroundImageUrl: 'http://llead.co/findings/background/Frame_6.png',
      title: 'LLEAD FINDINGS',
      description:
        'LLEAD consolidates personnel, police misconduct, use of force, and other related datasets from over 500 law enforcement agencies in the state of Louisiana. Visit the findings page to explore our internal investigations, along with news articles and academic research citing LLEAD’s data.',
      cardImageUrl: 'http://llead.co/findings/card/police_department.jpeg',
      cardTitle:
        'Many law enforcement agencies failing to report information on departing officers, group finds',
      cardAuthor: 'Richard A.Webster',
      cardDepartment: 'New Orleans Police Department',
    }

    const expectedFindings = {
      backgroundImageUrl: 'http://llead.co/findings/background/Frame_6.png',
      title: 'LLEAD FINDINGS',
      description:
        'LLEAD consolidates personnel, police misconduct, use of force, and other related datasets from over 500 law enforcement agencies in the state of Louisiana. Visit the findings page to explore our internal investigations, along with news articles and academic research citing LLEAD’s data.',
      cardImageUrl: 'http://llead.co/findings/card/police_department.jpeg',
      cardTitle:
        'Many law enforcement agencies failing to report information on departing officers, group finds',
      cardAuthor: 'Richard A.Webster',
      cardDepartment: 'New Orleans Police Department',
    }

    const state = {
      frontPage: {
        findings: rawFindings,
      },
    }

    const findings = findingsSelector(state)

    expect(findings).toStrictEqual(expectedFindings)
  })
})
