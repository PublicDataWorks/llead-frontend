import {
  timelineSelector,
  timelineFilterGroupsSelector,
  hasEventDetailsSelector,
} from 'selectors/officer-page/timeline'

describe('#timelineSelector', () => {
  it('returns all timeline data on empty filter group key', () => {
    const timelineData = [
      {
        id: '123',
        kind: 'COMPLAINT',
        date: '2019-06-13',
        year: 2019,
        ruleViolation: 'officer rule violation 2019-06-13',
        paragraphViolation: 'officer paragraph violation 2019-06-13',
        disposition: 'officer dispostion 2019-06-13',
        action: 'officer action 2019-06-13',
        trackingNumber: '13-06',
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
        ruleViolation: 'officer rule violation 2019-03-10',
        paragraphViolation: 'officer paragraph violation 2019-03-10',
        disposition: 'officer dispostion 2019-03-10',
        action: 'officer action 2019-03-10',
        trackingNumber: '10-03',
      },
      {
        kind: 'SALARY_CHANGE',
        year: 2019,
        annualSalary: '65k',
        date: '2019-06-13',
      },
      {
        id: '125',
        kind: 'COMPLAINT',
        date: '2018-10-20',
        year: 2018,
        ruleViolation: 'officer rule violation 2018-10-20',
        paragraphViolation: 'officer paragraph violation 2018-10-20',
        disposition: 'officer dispostion 2018-10-20',
        action: 'officer action 2018-10-20',
        trackingNumber: '20-10',
      },
      {
        id: '126',
        kind: 'COMPLAINT',
        date: null,
        year: null,
        ruleViolation: 'officer rule violation of unknowed time',
        paragraphViolation: 'officer paragraph violation of unknowed time',
        disposition: 'officer dispostion of unknowed time',
        action: 'officer action of unknowed time',
        trackingNumber: '123-456',
      },
      {
        id: '127',
        kind: 'COMPLAINT',
        date: null,
        year: 2018,
        ruleViolation: 'officer rule violation year 2018',
        paragraphViolation: 'officer paragraph violation year 2018',
        disposition: 'officer dispostion year 2018',
        action: 'officer action year 2018',
        trackingNumber: '2018',
      },
      {
        id: '128',
        kind: 'COMPLAINT',
        date: '2019-03-10',
        year: 2019,
        ruleViolation: 'officer rule violation 2019-03-10 no1',
        paragraphViolation: 'officer paragraph violation 2019-03-10 no1',
        disposition: 'officer dispostion 2019-03-10 no1',
        action: 'officer action 2019-03-10 no1',
        trackingNumber: '10-03-1',
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
    ]
    const state = {
      officerPage: {
        timeline: timelineData,
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
            rankDesc: 'Senior police officer',
          },
          {
            kind: 'SALARY_CHANGE',
            annualSalary: '65k',
          },
          {
            id: '123',
            kind: 'COMPLAINT',
            ruleViolation: 'Officer rule violation 2019-06-13',
            paragraphViolation: 'Officer paragraph violation 2019-06-13',
            disposition: 'Officer dispostion 2019-06-13',
            action: 'Officer action 2019-06-13',
            trackingNumber: '13-06',
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
        ],
      },
      {
        groupName: 'Mar 10, 2019',
        isDateEvent: true,
        items: [
          {
            id: '124',
            kind: 'COMPLAINT',
            trackingNumber: '10-03',
            ruleViolation: 'Officer rule violation 2019-03-10',
            paragraphViolation: 'Officer paragraph violation 2019-03-10',
            disposition: 'Officer dispostion 2019-03-10',
            action: 'Officer action 2019-03-10',
          },
          {
            id: '128',
            kind: 'COMPLAINT',
            trackingNumber: '10-03-1',
            ruleViolation: 'Officer rule violation 2019-03-10 no1',
            paragraphViolation: 'Officer paragraph violation 2019-03-10 no1',
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
      },
      {
        groupName: '2018',
        isDateEvent: false,
        items: [
          {
            kind: 'JOINED',
          },
          {
            id: '127',
            kind: 'COMPLAINT',
            trackingNumber: '2018',
            ruleViolation: 'Officer rule violation year 2018',
            paragraphViolation: 'Officer paragraph violation year 2018',
            disposition: 'Officer dispostion year 2018',
            action: 'Officer action year 2018',
          },
        ],
      },
      {
        groupName: 'Oct 20, 2018',
        isDateEvent: true,
        items: [
          {
            kind: 'LEFT',
          },
          {
            id: '125',
            kind: 'COMPLAINT',
            trackingNumber: '20-10',
            ruleViolation: 'Officer rule violation 2018-10-20',
            paragraphViolation: 'Officer paragraph violation 2018-10-20',
            disposition: 'Officer dispostion 2018-10-20',
            action: 'Officer action 2018-10-20',
          },
        ],
      },
      {
        groupName: 'No Date',
        isDateEvent: false,
        items: [
          {
            id: '126',
            kind: 'COMPLAINT',
            trackingNumber: '123-456',
            ruleViolation: 'Officer rule violation of unknowed time',
            paragraphViolation: 'Officer paragraph violation of unknowed time',
            disposition: 'Officer dispostion of unknowed time',
            action: 'Officer action of unknowed time',
          },
        ],
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
        ruleViolation: 'officer rule violation 2019-06-13',
        paragraphViolation: 'officer paragraph violation 2019-06-13',
        disposition: 'officer dispostion 2019-06-13',
        action: 'officer action 2019-06-13',
        trackingNumber: '13-06',
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
        ruleViolation: 'officer rule violation 2019-03-10',
        paragraphViolation: 'officer paragraph violation 2019-03-10',
        disposition: 'officer dispostion 2019-03-10',
        action: 'officer action 2019-03-10',
        trackingNumber: '10-03',
      },
      {
        kind: 'SALARY_CHANGE',
        year: 2019,
        annualSalary: '65k',
        date: '2019-06-13',
      },
      {
        id: '125',
        kind: 'COMPLAINT',
        date: '2018-10-20',
        year: 2018,
        ruleViolation: 'officer rule violation 2018-10-20',
        paragraphViolation: 'officer paragraph violation 2018-10-20',
        disposition: 'officer dispostion 2018-10-20',
        action: 'officer action 2018-10-20',
        trackingNumber: '20-10',
      },
      {
        id: '126',
        kind: 'COMPLAINT',
        date: null,
        year: null,
        ruleViolation: 'officer rule violation of unknowed time',
        paragraphViolation: 'officer paragraph violation of unknowed time',
        disposition: 'officer dispostion of unknowed time',
        action: 'officer action of unknowed time',
        trackingNumber: '123-456',
      },
      {
        id: '127',
        kind: 'COMPLAINT',
        date: null,
        year: 2018,
        ruleViolation: 'officer rule violation year 2018',
        paragraphViolation: 'officer paragraph violation year 2018',
        disposition: 'officer dispostion year 2018',
        action: 'officer action year 2018',
        trackingNumber: '2018',
      },
      {
        id: '128',
        kind: 'COMPLAINT',
        date: '2019-03-10',
        year: 2019,
        ruleViolation: 'officer rule violation 2019-03-10 no1',
        paragraphViolation: 'officer paragraph violation 2019-03-10 no1',
        disposition: 'officer dispostion 2019-03-10 no1',
        action: 'officer action 2019-03-10 no1',
        trackingNumber: '10-03-1',
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
    ]
    const state = {
      officerPage: {
        timeline: timelineData,
        filterGroupKey: 'COMPLAINTS',
      },
    }

    const timeline = timelineSelector(state)

    expect(timeline).toStrictEqual([
      {
        groupName: 'Jun 13, 2019',
        isDateEvent: true,
        items: [
          {
            id: '123',
            kind: 'COMPLAINT',
            ruleViolation: 'Officer rule violation 2019-06-13',
            paragraphViolation: 'Officer paragraph violation 2019-06-13',
            disposition: 'Officer dispostion 2019-06-13',
            action: 'Officer action 2019-06-13',
            trackingNumber: '13-06',
          },
        ],
      },
      {
        groupName: 'Mar 10, 2019',
        isDateEvent: true,
        items: [
          {
            id: '124',
            kind: 'COMPLAINT',
            trackingNumber: '10-03',
            ruleViolation: 'Officer rule violation 2019-03-10',
            paragraphViolation: 'Officer paragraph violation 2019-03-10',
            disposition: 'Officer dispostion 2019-03-10',
            action: 'Officer action 2019-03-10',
          },
          {
            id: '128',
            kind: 'COMPLAINT',
            trackingNumber: '10-03-1',
            ruleViolation: 'Officer rule violation 2019-03-10 no1',
            paragraphViolation: 'Officer paragraph violation 2019-03-10 no1',
            disposition: 'Officer dispostion 2019-03-10 no1',
            action: 'Officer action 2019-03-10 no1',
          },
        ],
      },
      {
        groupName: '2018',
        isDateEvent: false,
        items: [
          {
            id: '127',
            kind: 'COMPLAINT',
            trackingNumber: '2018',
            ruleViolation: 'Officer rule violation year 2018',
            paragraphViolation: 'Officer paragraph violation year 2018',
            disposition: 'Officer dispostion year 2018',
            action: 'Officer action year 2018',
          },
        ],
      },
      {
        groupName: 'Oct 20, 2018',
        isDateEvent: true,
        items: [
          {
            id: '125',
            kind: 'COMPLAINT',
            trackingNumber: '20-10',
            ruleViolation: 'Officer rule violation 2018-10-20',
            paragraphViolation: 'Officer paragraph violation 2018-10-20',
            disposition: 'Officer dispostion 2018-10-20',
            action: 'Officer action 2018-10-20',
          },
        ],
      },
      {
        groupName: 'No Date',
        isDateEvent: false,
        items: [
          {
            id: '126',
            kind: 'COMPLAINT',
            trackingNumber: '123-456',
            ruleViolation: 'Officer rule violation of unknowed time',
            paragraphViolation: 'Officer paragraph violation of unknowed time',
            disposition: 'Officer dispostion of unknowed time',
            action: 'Officer action of unknowed time',
          },
        ],
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
        id: '123',
        kind: 'COMPLAINT',
        date: '2019-06-13',
        year: 2019,
        ruleViolation: 'officer rule violation 2019-06-13',
        paragraphViolation: 'officer paragraph violation 2019-06-13',
        disposition: 'officer dispostion 2019-06-13',
        action: 'officer action 2019-06-13',
        trackingNumber: '13-06',
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
        ruleViolation: 'officer rule violation 2019-03-10',
        paragraphViolation: 'officer paragraph violation 2019-03-10',
        disposition: 'officer dispostion 2019-03-10',
        action: 'officer action 2019-03-10',
        trackingNumber: '10-03',
      },
      {
        kind: 'SALARY_CHANGE',
        year: 2019,
        annualSalary: '65k',
        date: '2019-06-13',
      },
      {
        id: '125',
        kind: 'COMPLAINT',
        date: '2018-10-20',
        year: 2018,
        ruleViolation: 'officer rule violation 2018-10-20',
        paragraphViolation: 'officer paragraph violation 2018-10-20',
        disposition: 'officer dispostion 2018-10-20',
        action: 'officer action 2018-10-20',
        trackingNumber: '20-10',
      },
      {
        id: '126',
        kind: 'COMPLAINT',
        date: null,
        year: null,
        ruleViolation: 'officer rule violation of unknowed time',
        paragraphViolation: 'officer paragraph violation of unknowed time',
        disposition: 'officer dispostion of unknowed time',
        action: 'officer action of unknowed time',
        trackingNumber: '123-456',
      },
      {
        id: '127',
        kind: 'COMPLAINT',
        date: null,
        year: 2018,
        ruleViolation: 'officer rule violation year 2018',
        paragraphViolation: 'officer paragraph violation year 2018',
        disposition: 'officer dispostion year 2018',
        action: 'officer action year 2018',
        trackingNumber: '2018',
      },
      {
        id: '128',
        kind: 'COMPLAINT',
        date: '2019-03-10',
        year: 2019,
        ruleViolation: 'officer rule violation 2019-03-10 no1',
        paragraphViolation: 'officer paragraph violation 2019-03-10 no1',
        disposition: 'officer dispostion 2019-03-10 no1',
        action: 'officer action 2019-03-10 no1',
        trackingNumber: '10-03-1',
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
    ]
    const state = {
      officerPage: {
        timeline: timelineData,
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
        title: 'Complaints',
        count: 6,
      },
      {
        filterGroupKey: 'DOCUMENTS',
        title: 'Documents',
        count: 2,
      },
      {
        filterGroupKey: 'RANKS_AND_UNITS',
        title: 'Rank/unit',
        count: 1,
      },
    ]

    expect(timelineFilterGroups).toStrictEqual(expectedTimelineFilterGroups)
  })

  it('returns empty array if there is no filter groups', () => {
    const state = {
      officerPage: {
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
        ruleViolation: 'officer rule violation 2019-06-13',
        paragraphViolation: 'officer paragraph violation 2019-06-13',
        disposition: 'officer dispostion 2019-06-13',
        action: 'officer action 2019-06-13',
        trackingNumber: '13-06',
      },
      {
        kind: 'JOINED',
        date: '2019-06-13',
        year: 2019,
      },
    ]
    const state = {
      officerPage: {
        timeline: timelineData,
      },
    }
    const hasEventDetails = hasEventDetailsSelector(state)

    expect(hasEventDetails).toBe(true)
  })

  it('returns false if timeline has no complaints', () => {
    const timelineData = [
      {
        kind: 'JOINED',
        date: '2019-06-13',
        year: 2019,
      },
    ]
    const state = {
      officerPage: {
        timeline: timelineData,
      },
    }
    const hasEventDetails = hasEventDetailsSelector(state)

    expect(hasEventDetails).toBe(false)
  })
})
