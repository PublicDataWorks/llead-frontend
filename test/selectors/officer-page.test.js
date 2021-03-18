import moment from 'moment'

import {
  getIsOfficerRequesting,
  officerSelector,
  documentsSelector,
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

describe('#documentsSelector', () => {
  describe('has data', () => {
    it('returns document data', () => {
      const documentsData = [
        {
          id: 39,
          documentType: 'json',
          title: 'Pattern risk team election myself suffer wind.',
          url: '/glass/shoulder.pdf',
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
          url: '/glass/shoulder.pdf',
          incidentDate: 'May 4, 2020',
          departments: [{ id: 1234, name: 'department name' }],
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
