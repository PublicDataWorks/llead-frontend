import moment from 'moment'

import {
  getIsOfficerRequesting,
  officerSelector,
  officerRecentDataSelector,
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
