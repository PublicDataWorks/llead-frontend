import {
  timelineSelector,
  timelineFilterGroupsSelector,
  hasEventDetailsSelector,
  timelinePeriodSelector,
  isDownloadingFileSelector,
} from 'selectors/officer-page/timeline'

describe('#timelineSelector', () => {
  it('returns all timeline data on empty filter group key', () => {
    const timelineData = [
      {
        id: 22,
        year: 2019,
        date: '2019-06-13',
        publishedDate: '2019-06-13',
        kind: 'NEWS_ARTICLE',
        sourceName: 'The Lens NOLA',
        title: 'News Article 2019-06-13',
        url: 'url',
      },
      {
        id: '123',
        kind: 'COMPLAINT',
        date: '2019-06-13',
        year: 2019,
        disposition: 'officer dispostion 2019-06-13',
        action: 'officer action 2019-06-13',
        trackingId: '13-06',
        allegation: 'rule 01',
        allegationDesc:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        id: 39,
        documentType: 'pdf',
        title: 'Document 2019-06-13',
        url: 'url',
        incidentDate: '2019-06-13',
        previewImageUrl: 'previewImageUrl',
        pagesCount: 24,
        departments: [
          {
            id: 10031,
            name: 'Department',
          },
        ],
        kind: 'DOCUMENT',
        date: '2019-06-13',
        year: 2019,
      },
      {
        kind: 'JOINED',
        date: '2019-06-13',
        year: 2019,
      },
      {
        kind: 'LEFT',
        date: '2019-06-13',
        year: 2019,
      },
      {
        id: '124',
        kind: 'COMPLAINT',
        date: '2019-03-10',
        year: 2019,
        disposition: 'officer dispostion 2019-03-10',
        action: 'officer action 2019-03-10',
        trackingId: '10-03',
        allegation: 'rule 01',
        allegationDesc:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        kind: 'SALARY_CHANGE',
        year: 2019,
        salary: '65123.23',
        salaryFreq: 'yearly',
        date: '2019-06-13',
      },
      {
        id: '125',
        kind: 'COMPLAINT',
        date: '2018-10-20',
        year: 2018,
        disposition: 'officer dispostion 2018-10-20',
        action: 'officer action 2018-10-20',
        trackingId: '20-10',
      },
      {
        kind: 'SALARY_CHANGE',
        year: 2018,
        salary: '12.57',
        salaryFreq: 'hourly',
        date: '2018-10-20',
      },
      {
        id: '126',
        kind: 'COMPLAINT',
        date: null,
        year: null,
        disposition: 'officer dispostion of unknowed time',
        action: 'officer action of unknowed time',
        trackingId: '123-456',
      },
      {
        id: '127',
        kind: 'COMPLAINT',
        date: null,
        year: 2018,
        disposition: 'officer dispostion year 2018',
        action: 'officer action year 2018',
        trackingId: '2018',
      },
      {
        id: '128',
        kind: 'COMPLAINT',
        date: '2019-03-10',
        year: 2019,
        disposition: 'officer dispostion 2019-03-10 no1',
        action: 'officer action 2019-03-10 no1',
        trackingId: '10-03-1',
      },
      {
        kind: 'JOINED',
        date: null,
        year: 2018,
      },
      {
        kind: 'LEFT',
        date: '2018-10-20',
        year: 2018,
      },
      {
        id: 39,
        documentType: 'pdf',
        title: 'Document 2019-03-10',
        url: 'url',
        incidentDate: '2019-03-10',
        previewImageUrl: 'previewImageUrl',
        pagesCount: 24,
        departments: [
          {
            id: 10031,
            name: 'Department',
          },
        ],
        kind: 'DOCUMENT',
        date: '2019-03-10',
        year: 2019,
      },
      {
        kind: 'RANK_CHANGE',
        year: 2019,
        rankDesc: 'senior police officer',
        date: '2019-06-13',
      },
      {
        year: 2019,
        date: '2019-06-13',
        kind: 'UNIT_CHANGE',
        departmentCode: '610',
        departmentDesc: 'detective area - central',
        prevDepartmentCode: '177',
        prevDepartmentDesc: 'superior area',
      },
      {
        year: 2018,
        date: null,
        kind: 'UNIT_CHANGE',
        departmentCode: '193',
        departmentDesc: 'gang investigation division',
        prevDepartmentCode: null,
        prevDepartmentDesc: null,
      },
      {
        year: 2019,
        date: '2019-06-13',
        kind: 'UOF',
        id: 1,
        useOfForceDescription: 'L2-Takedown (w/injury)',
        useOfForceReason: 'Resisting lawful arrest',
        disposition: 'UOF Justified',
        serviceType: 'call for service',
        citizenInformation: '26-year-old white female',
        trackingId: 'Complainant',
        citizenArrested: 'yes',
        citizenInjured: 'yes',
        citizenHospitalized: 'no',
        officerInjured: 'yes',
      },
      {
        id: 1,
        kind: 'APPEAL',
        year: 2019,
        date: '2019-06-13',
        chargingSupervisor: 'Paul Fontenot',
        appealDisposition: 'appeal upheld',
        actionAppealed: 'suspension',
        motions: 'amicable settlement',
      },
      {
        year: 2018,
        date: null,
        kind: 'POST_DECERTIFICATION',
        id: 1,
        department: 'New Orleans Police Department',
        allegations: ['gang investigation division'],
      },
      {
        year: 2018,
        date: null,
        id: 1,
        kind: 'BRADY_LIST',
        allegationDesc: 'amicable settlement',
        department: 'New Orleans Police Department',
        chargingDepartment: 'NYPD',
        sourceDepartment: 'Philadelphia PD',
        trackingIdOg: '123-abc',
        disposition: 'officer dispostion 2018',
        action: 'officer action 2018',
      },
    ]
    const state = {
      officerPage: {
        timeline: {
          timeline: timelineData,
        },
      },
    }

    const timeline = timelineSelector(state)

    expect(timeline).toStrictEqual([
      {
        groupName: 'Jun 13, 2019',
        isDateEvent: true,
        items: [
          {
            kind: 'JOINED',
          },
          {
            kind: 'LEFT',
          },
          {
            kind: 'RANK_CHANGE',
            rank: 'Senior police officer',
          },
          {
            kind: 'UNIT_CHANGE',
            departmentCode: '610',
            departmentDesc: 'Detective area - central',
            prevDepartmentCode: '177',
            prevDepartmentDesc: 'Superior area',
          },
          {
            kind: 'SALARY_CHANGE',
            salary: '$65,123.23/year',
          },
          {
            id: '123',
            kind: 'COMPLAINT',
            disposition: 'Officer dispostion 2019-06-13',
            action: 'Officer action 2019-06-13',
            trackingId: '13-06',
            allegation: 'rule 01',
            allegationDesc:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          },
          {
            kind: 'UOF',
            id: 1,
            useOfForceDescription: 'L2-Takedown (w/injury)',
            useOfForceReason: 'Resisting lawful arrest',
            disposition: 'UOF Justified',
            serviceType: 'Call for service',
            citizenInformation: '26-year-old white female',
            trackingId: 'Complainant',
            details: ['citizen arrested', 'citizen injured', 'officer injured'],
          },
          {
            id: 1,
            kind: 'APPEAL',
            year: 2019,
            date: 'Jun 13, 2019',
            chargingSupervisor: 'Paul Fontenot',
            appealDisposition: 'Appeal upheld',
            actionAppealed: 'suspension',
            motions: 'amicable settlement',
          },
          {
            id: 39,
            documentType: 'pdf',
            title: 'Document 2019-06-13',
            url: 'url',
            incidentDate: 'Jun 13, 2019',
            previewImageUrl: 'previewImageUrl',
            pagesCount: 24,
            departments: [
              {
                id: 10031,
                name: 'Department',
              },
            ],
            kind: 'DOCUMENT',
            recentData: {
              id: 39,
              documentType: 'pdf',
              title: 'Document 2019-06-13',
              url: 'url',
              incidentDate: 'Jun 13, 2019',
              previewImageUrl: 'previewImageUrl',
              pagesCount: 24,
              departments: [
                {
                  id: 10031,
                  name: 'Department',
                },
              ],
            },
          },
          {
            id: 22,
            title: 'News Article 2019-06-13',
            url: 'url',
            kind: 'NEWS_ARTICLE',
            publishedDate: 'Jun 13, 2019',
            date: 'Jun 13, 2019',
            sourceName: 'The Lens NOLA',
            recentData: {
              id: 22,
              title: 'News Article 2019-06-13',
              url: 'url',
              publishedDate: 'Jun 13, 2019',
              date: 'Jun 13, 2019',
              sourceName: 'The Lens NOLA',
            },
          },
        ],
        leftGroup: true,
        year: 2019,
      },
      {
        groupName: 'Mar 10, 2019',
        isDateEvent: true,
        items: [
          {
            id: '124',
            kind: 'COMPLAINT',
            trackingId: '10-03',
            disposition: 'Officer dispostion 2019-03-10',
            action: 'Officer action 2019-03-10',
            allegation: 'rule 01',
            allegationDesc:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          },
          {
            id: '128',
            kind: 'COMPLAINT',
            trackingId: '10-03-1',
            disposition: 'Officer dispostion 2019-03-10 no1',
            action: 'Officer action 2019-03-10 no1',
          },
          {
            id: 39,
            documentType: 'pdf',
            title: 'Document 2019-03-10',
            url: 'url',
            incidentDate: 'Mar 10, 2019',
            previewImageUrl: 'previewImageUrl',
            pagesCount: 24,
            departments: [
              {
                id: 10031,
                name: 'Department',
              },
            ],
            kind: 'DOCUMENT',
            recentData: {
              id: 39,
              documentType: 'pdf',
              title: 'Document 2019-03-10',
              url: 'url',
              incidentDate: 'Mar 10, 2019',
              previewImageUrl: 'previewImageUrl',
              pagesCount: 24,
              departments: [
                {
                  id: 10031,
                  name: 'Department',
                },
              ],
            },
          },
        ],
        leftGroup: true,
        year: 2019,
      },
      {
        groupName: '2018',
        isDateEvent: false,
        items: [
          {
            kind: 'JOINED',
          },
          {
            kind: 'UNIT_CHANGE',
            departmentCode: '193',
            departmentDesc: 'Gang investigation division',
            prevDepartmentCode: null,
            prevDepartmentDesc: null,
          },
          {
            id: '127',
            kind: 'COMPLAINT',
            trackingId: '2018',
            disposition: 'Officer dispostion year 2018',
            action: 'Officer action year 2018',
          },
          {
            kind: 'POST_DECERTIFICATION',
            id: 1,
            department: 'New Orleans Police Department',
            allegations: 'gang investigation division',
          },
          {
            id: 1,
            date: null,
            kind: 'BRADY_LIST',
            allegationDesc: 'amicable settlement',
            department: 'New Orleans Police Department',
            chargingDepartment: 'NYPD',
            sourceDepartment: 'Philadelphia PD',
            trackingIdOg: '123-abc',
            disposition: 'Officer dispostion 2018',
            action: 'Officer action 2018',
          },
        ],
        leftGroup: false,
        year: 2018,
      },
      {
        groupName: 'Oct 20, 2018',
        isDateEvent: true,
        items: [
          {
            kind: 'LEFT',
          },
          {
            kind: 'SALARY_CHANGE',
            salary: '$12.57/hour',
          },
          {
            id: '125',
            kind: 'COMPLAINT',
            trackingId: '20-10',
            disposition: 'Officer dispostion 2018-10-20',
            action: 'Officer action 2018-10-20',
          },
        ],
        leftGroup: false,
        year: 2018,
      },
      {
        groupName: 'No Date',
        isDateEvent: false,
        items: [
          {
            id: '126',
            kind: 'COMPLAINT',
            trackingId: '123-456',
            disposition: 'Officer dispostion of unknowed time',
            action: 'Officer action of unknowed time',
          },
        ],
        leftGroup: true,
        year: null,
      },
    ])
  })

  it('handles rank change rows', () => {
    const timelineData = [
      {
        kind: 'RANK_CHANGE',
        year: 2019,
        rankDesc: 'senior police officer',
        rankCode: '123985',
        date: '2019-06-13',
      },
      {
        kind: 'RANK_CHANGE',
        year: 2018,
        rankCode: '0992834',
        date: null,
      },
    ]
    const state = {
      officerPage: {
        timeline: {
          timeline: timelineData,
        },
      },
    }

    const timeline = timelineSelector(state)

    expect(timeline).toStrictEqual([
      {
        groupName: 'Jun 13, 2019',
        isDateEvent: true,
        items: [
          {
            kind: 'RANK_CHANGE',
            rank: 'Senior police officer',
          },
        ],
        leftGroup: true,
        year: 2019,
      },
      {
        groupName: '2018',
        isDateEvent: false,
        items: [
          {
            kind: 'RANK_CHANGE',
            rank: '0992834',
          },
        ],
        leftGroup: false,
        year: 2018,
      },
    ])
  })

  it('returns specific timeline data', () => {
    const timelineData = [
      {
        id: '123',
        kind: 'COMPLAINT',
        date: '2019-06-13',
        year: 2019,
        disposition: 'officer dispostion 2019-06-13',
        action: 'officer action 2019-06-13',
        trackingId: '13-06',
        allegationDesc:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      },
      {
        id: 39,
        documentType: 'pdf',
        title: 'Document 2019-06-13',
        url: 'url',
        incidentDate: '2019-06-13',
        previewImageUrl: 'previewImageUrl',
        pagesCount: 24,
        departments: [
          {
            id: 10031,
            name: 'Department',
          },
        ],
        kind: 'DOCUMENT',
        date: '2019-06-13',
        year: 2019,
      },
      {
        kind: 'JOINED',
        date: '2019-06-13',
        year: 2019,
      },
      {
        kind: 'LEFT',
        date: '2019-06-13',
        year: 2019,
      },
      {
        id: '124',
        kind: 'COMPLAINT',
        date: '2019-03-10',
        year: 2019,
        disposition: 'officer dispostion 2019-03-10',
        action: 'officer action 2019-03-10',
        trackingId: '10-03',
      },
      {
        kind: 'SALARY_CHANGE',
        year: 2019,
        salary: '65123.23',
        salaryFreq: 'yearly',
        date: '2019-06-13',
      },
      {
        id: '125',
        kind: 'COMPLAINT',
        date: '2018-10-20',
        year: 2018,
        disposition: 'officer dispostion 2018-10-20',
        action: 'officer action 2018-10-20',
        trackingId: '20-10',
      },
      {
        id: '126',
        kind: 'COMPLAINT',
        date: null,
        year: null,
        disposition: 'officer dispostion of unknowed time',
        action: 'officer action of unknowed time',
        trackingId: '123-456',
      },
      {
        id: '127',
        kind: 'COMPLAINT',
        date: null,
        year: 2018,
        disposition: 'officer dispostion year 2018',
        action: 'officer action year 2018',
        trackingId: '2018',
      },
      {
        id: '128',
        kind: 'COMPLAINT',
        date: '2019-03-10',
        year: 2019,
        disposition: 'officer dispostion 2019-03-10 no1',
        action: 'officer action 2019-03-10 no1',
        trackingId: '10-03-1',
      },
      {
        kind: 'JOINED',
        date: null,
        year: 2018,
      },
      {
        kind: 'LEFT',
        date: '2018-10-20',
        year: 2018,
      },
      {
        id: 39,
        documentType: 'pdf',
        title: 'Document 2019-03-10',
        url: 'url',
        incidentDate: '2019-03-10',
        previewImageUrl: 'previewImageUrl',
        pagesCount: 24,
        departments: [
          {
            id: 10031,
            name: 'Department',
          },
        ],
        kind: 'DOCUMENT',
        date: '2019-03-10',
        year: 2019,
      },
      {
        kind: 'RANK_CHANGE',
        year: 2019,
        rankDesc: 'senior police officer',
        date: '2019-06-13',
      },
      {
        year: 2019,
        date: '2019-06-13',
        kind: 'UNIT_CHANGE',
        departmentCode: '610',
        departmentDesc: 'detective area - central',
        prevDepartmentCode: '177',
        prevDepartmentDesc: 'superior area',
      },
      {
        year: 2018,
        date: null,
        kind: 'UNIT_CHANGE',
        departmentCode: '193',
        departmentDesc: 'gang investigation division',
        prevDepartmentCode: null,
        prevDepartmentDesc: null,
      },
    ]
    const state = {
      officerPage: {
        timeline: {
          timeline: timelineData,
        },
        filterGroupKey: 'RANKS_AND_UNITS',
      },
    }

    const timeline = timelineSelector(state)

    expect(timeline).toStrictEqual([
      {
        groupName: 'Jun 13, 2019',
        isDateEvent: true,
        items: [
          {
            kind: 'RANK_CHANGE',
            rank: 'Senior police officer',
          },
          {
            kind: 'UNIT_CHANGE',
            departmentCode: '610',
            departmentDesc: 'Detective area - central',
            prevDepartmentCode: '177',
            prevDepartmentDesc: 'Superior area',
          },
        ],
        leftGroup: true,
        year: 2019,
      },
      {
        groupName: '2018',
        isDateEvent: false,
        items: [
          {
            kind: 'UNIT_CHANGE',
            departmentCode: '193',
            departmentDesc: 'Gang investigation division',
            prevDepartmentCode: null,
            prevDepartmentDesc: null,
          },
        ],
        leftGroup: false,
        year: 2018,
      },
    ])
  })

  it('returns empty data', () => {
    const state = {
      officerPage: {},
    }
    const timeline = timelineSelector(state)

    expect(timeline).toStrictEqual([])
  })
})

describe('#timelineFilterGroupsSelector', () => {
  it('returns timeline filter grouped data', () => {
    const timelineData = [
      {
        year: 2019,
        publishedDate: '2019-06-13',
        kind: 'NEWS_ARTICLE',
        id: 22,
        sourceName: 'The Lens NOLA',
        title: 'News Article 2019-06-13',
        url: 'url',
      },
      {
        id: '123',
        kind: 'COMPLAINT',
        date: '2019-06-13',
        year: 2019,
        disposition: 'officer dispostion 2019-06-13',
        action: 'officer action 2019-06-13',
        trackingId: '13-06',
        allegationDesc:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      },
      {
        id: 39,
        documentType: 'pdf',
        title: 'Document 2019-06-13',
        url: 'url',
        incidentDate: '2019-06-13',
        previewImageUrl: 'previewImageUrl',
        pagesCount: 24,
        departments: [
          {
            id: 10031,
            name: 'Department',
          },
        ],
        kind: 'DOCUMENT',
        date: '2019-06-13',
        year: 2019,
      },
      {
        kind: 'JOINED',
        date: '2019-06-13',
        year: 2019,
      },
      {
        kind: 'LEFT',
        date: '2019-06-13',
        year: 2019,
      },
      {
        id: '124',
        kind: 'COMPLAINT',
        date: '2019-03-10',
        year: 2019,
        disposition: 'officer dispostion 2019-03-10',
        action: 'officer action 2019-03-10',
        trackingId: '10-03',
      },
      {
        kind: 'SALARY_CHANGE',
        year: 2019,
        salary: '65,123.23',
        salaryFreq: 'yearly',
        date: '2019-06-13',
      },
      {
        id: '125',
        kind: 'COMPLAINT',
        date: '2018-10-20',
        year: 2018,
        disposition: 'officer dispostion 2018-10-20',
        action: 'officer action 2018-10-20',
        trackingId: '20-10',
      },
      {
        id: '126',
        kind: 'COMPLAINT',
        date: null,
        year: null,
        disposition: 'officer dispostion of unknowed time',
        action: 'officer action of unknowed time',
        trackingId: '123-456',
      },
      {
        id: '127',
        kind: 'COMPLAINT',
        date: null,
        year: 2018,
        disposition: 'officer dispostion year 2018',
        action: 'officer action year 2018',
        trackingId: '2018',
      },
      {
        id: '128',
        kind: 'COMPLAINT',
        date: '2019-03-10',
        year: 2019,
        disposition: 'officer dispostion 2019-03-10 no1',
        action: 'officer action 2019-03-10 no1',
        trackingId: '10-03-1',
      },
      {
        kind: 'JOINED',
        date: null,
        year: 2018,
      },
      {
        kind: 'LEFT',
        date: '2018-10-20',
        year: 2018,
      },
      {
        id: 39,
        documentType: 'pdf',
        title: 'Document 2019-03-10',
        url: 'url',
        incidentDate: '2019-03-10',
        previewImageUrl: 'previewImageUrl',
        pagesCount: 24,
        departments: [
          {
            id: 10031,
            name: 'Department',
          },
        ],
        kind: 'DOCUMENT',
        date: '2019-03-10',
        year: 2019,
      },
      {
        kind: 'RANK_CHANGE',
        year: 2019,
        rankDesc: 'senior police officer',
        date: '2019-06-13',
      },
      {
        year: 2019,
        date: '2019-06-13',
        kind: 'UNIT_CHANGE',
        departmentCode: 'current department code',
        departmentDesc: 'current department desc',
        prevDepartmentCode: 'previous code',
        prevDepartmentDesc: 'previous desc',
      },
      {
        year: 2018,
        date: null,
        kind: 'UNIT_CHANGE',
        departmentCode: 'No date current department code',
        departmentDesc: 'No date current department desc',
        prevDepartmentCode: 'No date previous code',
        prevDepartmentDesc: 'No date previous desc',
      },
    ]
    const state = {
      officerPage: {
        timeline: {
          timeline: timelineData,
        },
      },
    }

    const timelineFilterGroups = timelineFilterGroupsSelector(state)

    const expectedTimelineFilterGroups = [
      {
        filterGroupKey: '',
        title: 'All',
      },
      {
        filterGroupKey: 'COMPLAINTS',
        title: 'Allegations',
        count: 6,
      },
      {
        filterGroupKey: 'DOCUMENTS',
        title: 'Documents',
        count: 2,
      },
      {
        filterGroupKey: 'NEWS_ARTICLES',
        title: 'News Articles',
        count: 1,
      },
      {
        filterGroupKey: 'RANKS_AND_UNITS',
        title: 'Rank/Unit',
        count: 3,
      },
    ]

    expect(timelineFilterGroups).toStrictEqual(expectedTimelineFilterGroups)
  })

  it('returns empty array if there is no filter groups', () => {
    const state = {
      officerPage: {
        timeline: {
          timeline: [
            {
              kind: 'JOINED',
              date: null,
              year: 2018,
            },
            {
              kind: 'LEFT',
              date: '2018-10-20',
              year: 2018,
            },
          ],
        },
      },
    }

    const timelineFilterGroups = timelineFilterGroupsSelector(state)

    expect(timelineFilterGroups).toStrictEqual([])
  })
})

describe('#hasEventDetailsSelector', () => {
  it('returns true if timeline has some complaints', () => {
    const timelineData = [
      {
        id: '123',
        kind: 'COMPLAINT',
        date: '2019-06-13',
        year: 2019,
        disposition: 'officer dispostion 2019-06-13',
        action: 'officer action 2019-06-13',
        trackingId: '13-06',
        allegationDesc:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      },
      {
        kind: 'JOINED',
        date: '2019-06-13',
        year: 2019,
      },
    ]
    const state = {
      officerPage: {
        timeline: {
          timeline: timelineData,
        },
      },
    }
    const hasEventDetails = hasEventDetailsSelector(state)

    expect(hasEventDetails).toBe(true)
  })

  it('returns true if timeline has some uses of force', () => {
    const timelineData = [
      {
        id: 1,
        year: 2019,
        date: '2019-06-13',
        kind: 'UOF',
        forceType: 'Takedown (w/injury)',
        forceDescription: 'L2-Takedown (w/injury)',
        forceReason: 'Resisting lawful arrest',
        disposition: 'UOF Justified',
        serviceType: 'call for service',
        citizenInvolvement: 'Complainant',
        citizenAge: 26,
        citizenRace: 'white',
        citizenSex: 'female',
        uoftrackingId: 'Complainant',
        citizenArrested: 'yes',
        citizenInjured: 'yes',
        citizenHospitalized: 'no',
        officerInjured: 'yes',
      },
      {
        kind: 'JOINED',
        date: '2019-06-13',
        year: 2019,
      },
    ]
    const state = {
      officerPage: {
        timeline: {
          timeline: timelineData,
        },
      },
    }
    const hasEventDetails = hasEventDetailsSelector(state)

    expect(hasEventDetails).toBe(true)
  })

  it('returns false if timeline has no complaints and uses of force', () => {
    const timelineData = [
      {
        kind: 'JOINED',
        date: '2019-06-13',
        year: 2019,
      },
    ]
    const state = {
      officerPage: {
        timeline: {
          timeline: timelineData,
        },
      },
    }
    const hasEventDetails = hasEventDetailsSelector(state)

    expect(hasEventDetails).toBe(false)
  })
})

describe('#timelinePeriodSelector', () => {
  it('returns formatted timeline period', () => {
    const timelineData = {
      officerPage: {
        timeline: {
          timelinePeriod: ['2013', '2015', '2017-2019'],
        },
      },
    }

    const timelinePeriod = timelinePeriodSelector(timelineData)

    expect(timelinePeriod).toEqual('2013, 2015 and 2017-2019')
  })

  it('returns undefined on no timeline period data', () => {
    const timelineData = {
      officerPage: {},
    }

    const timelinePeriod = timelinePeriodSelector(timelineData)

    expect(timelinePeriod).toBeFalsy()
  })
})

describe('#isDownloadingFileSelector', () => {
  it('returns download file status', () => {
    const timelineData = {
      officerPage: {
        isDownloading: true,
      },
    }

    const isDownloadingFile = isDownloadingFileSelector(timelineData)

    expect(isDownloadingFile).toEqual(true)
  })

  it('returns false on undefined data', () => {
    const timelineData = {
      officerPage: {},
    }

    const isDownloadingFile = isDownloadingFileSelector(timelineData)

    expect(isDownloadingFile).toEqual(false)
  })
})
