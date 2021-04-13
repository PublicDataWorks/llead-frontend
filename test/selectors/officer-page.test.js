import moment from 'moment'

import {
  getIsOfficerRequesting,
  officerSelector,
  documentsSelector,
  officerRecentDataSelector,
  timelineSelector,
} from 'selectors/officer-page'

describe('#getIsOfficerRequesting', () => {
  it('returns isOfficerRequesting', () => {
    const state = {
      officerPage: {
        isOfficerRequesting: true,
      },
    }
    const isOfficerRequesting = getIsOfficerRequesting(state)

    expect(isOfficerRequesting).toBe(true)
  })
})

describe('#officerSelector', () => {
  describe('has data', () => {
    it('returns department data', () => {
      const officerData = {
        id: 1,
        name: 'Officer Name',
        badges: ['12345'],
        birthYear: 1962,
        race: 'race',
        gender: 'gender',
        department: {
          id: 100,
          name: 'Department Name',
          extraDepartmentField: 'should not be included',
        },
        annualSalary: '57k',
        documentsCount: 1,
        complaintsCount: 2,
        dataPeriod: ['2012', '2018-2020'],
        extraField: 'should not be included',
        documentsDataPeriod: ['2015-2016'],
        complaintsDataPeriod: ['2012', '2014', '2016-2018'],
      }
      const state = {
        officerPage: {
          officer: officerData,
        },
      }

      const age = moment().diff(moment('1962', 'YYYY'), 'years')
      const officer = officerSelector(state)

      expect(officer).toStrictEqual({
        id: 1,
        name: 'Officer Name',
        badges: ['12345'],
        documentsCount: 1,
        complaintsCount: 2,
        dataPeriod: '2012 and 2018-2020',
        documentsDataPeriod: '2015-2016',
        complaintsDataPeriod: '2012, 2014 and 2016-2018',
        annualSalary: '$57k/year',
        description: `${age}-year-old gender race`,
        department: {
          id: 100,
          name: 'Department Name',
        },
      })
    })

    it('returns department data with empty annualSalary', () => {
      const officerData = {
        id: 1,
        name: 'Officer Name',
        badges: ['12345'],
        birthYear: 1962,
        race: 'race',
        gender: 'gender',
        department: {
          id: 100,
          name: 'Department Name',
          extraDepartmentField: 'should not be included',
        },
        documentsCount: 1,
        complaintsCount: 2,
        dataPeriod: ['2012', '2018-2020'],
        extraField: 'should not be included',
        documentsDataPeriod: ['2015-2016'],
        complaintsDataPeriod: ['2012', '2014', '2016-2018'],
      }
      const state = {
        officerPage: {
          officer: officerData,
        },
      }

      const age = moment().diff(moment('1962', 'YYYY'), 'years')
      const officer = officerSelector(state)

      expect(officer).toStrictEqual({
        id: 1,
        name: 'Officer Name',
        badges: ['12345'],
        documentsCount: 1,
        complaintsCount: 2,
        annualSalary: '',
        description: `${age}-year-old gender race`,
        department: {
          id: 100,
          name: 'Department Name',
        },
        dataPeriod: '2012 and 2018-2020',
        documentsDataPeriod: '2015-2016',
        complaintsDataPeriod: '2012, 2014 and 2016-2018',
      })
    })

    it('returns department data with empty description', () => {
      const officerData = {
        id: 1,
        name: 'Officer Name',
        badges: ['12345'],
        department: {
          id: 100,
          name: 'Department Name',
          extraDepartmentField: 'should not be included',
        },
        annualSalary: '57k',
        documentsCount: 1,
        complaintsCount: 2,
        dataPeriod: ['2012', '2018-2020'],
        extraField: 'should not be included',
        documentsDataPeriod: ['2015-2016'],
        complaintsDataPeriod: ['2012', '2014', '2016-2018'],
      }
      const state = {
        officerPage: {
          officer: officerData,
        },
      }

      const officer = officerSelector(state)

      expect(officer).toStrictEqual({
        id: 1,
        name: 'Officer Name',
        badges: ['12345'],
        documentsCount: 1,
        complaintsCount: 2,
        annualSalary: '$57k/year',
        description: '',
        department: {
          id: 100,
          name: 'Department Name',
        },
        dataPeriod: '2012 and 2018-2020',
        documentsDataPeriod: '2015-2016',
        complaintsDataPeriod: '2012, 2014 and 2016-2018',
      })
    })

    it('returns department data with empty dataPeriods', () => {
      const officerData = {
        id: 1,
        name: 'Officer Name',
        badges: ['12345'],
        department: {
          id: 100,
          name: 'Department Name',
          extraDepartmentField: 'should not be included',
        },
        annualSalary: '57k',
        documentsCount: 1,
        complaintsCount: 2,
        dataPeriod: [],
        extraField: 'should not be included',
        documentsDataPeriod: [],
        complaintsDataPeriod: [],
      }
      const state = {
        officerPage: {
          officer: officerData,
        },
      }

      const officer = officerSelector(state)

      expect(officer).toStrictEqual({
        id: 1,
        name: 'Officer Name',
        badges: ['12345'],
        documentsCount: 1,
        complaintsCount: 2,
        annualSalary: '$57k/year',
        description: '',
        department: {
          id: 100,
          name: 'Department Name',
        },
        dataPeriod: undefined,
        documentsDataPeriod: undefined,
        complaintsDataPeriod: undefined,
      })
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const department = officerSelector({})

      expect(department).toStrictEqual({})
    })
  })
})

describe('#officerRecentDataSelector', () => {
  it('returns officerRecentData', () => {
    const officerData = {
      id: 1,
      name: 'Officer Name',
      badges: ['12345'],
      department: {
        id: 100,
        name: 'Department Name',
        extraDepartmentField: 'should not be included',
      },
      extraField: 'field',
    }
    const state = {
      officerPage: {
        officer: officerData,
      },
    }

    const officerRecentData = officerRecentDataSelector(state)

    expect(officerRecentData).toStrictEqual({
      id: 1,
      name: 'Officer Name',
      badges: ['12345'],
      department: {
        id: 100,
        name: 'Department Name',
      },
    })
  })
})

describe('#documentsSelector', () => {
  describe('has data', () => {
    it('returns document data', () => {
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
              id: 1234,
              name: 'department name',
              extraField: 'data',
            },
          ],
        },
      ]
      const state = {
        officerPage: {
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
          departments: [{ id: 1234, name: 'department name' }],
          recentData: {
            id: 39,
            documentType: 'json',
            title: 'Pattern risk team election myself suffer wind.',
            url: 'http://documents.com/glass/shoulder.pdf',
            incidentDate: 'May 4, 2020',
            departments: [{ id: 1234, name: 'department name' }],
          },
        },
      ])
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const state = {
        officerPage: {},
      }
      const documents = documentsSelector(state)

      expect(documents).toStrictEqual([])
    })
  })
})

describe('#timelineSelector', () => {
  describe('has data', () => {
    it('returns timeline data', () => {
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
              paragraphViolation:
                'Officer paragraph violation of unknowed time',
              disposition: 'Officer dispostion of unknowed time',
              action: 'Officer action of unknowed time',
            },
          ],
        },
      ])
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const state = {
        officerPage: {},
      }
      const timeline = documentsSelector(state)

      expect(timeline).toStrictEqual([])
    })
  })
})
