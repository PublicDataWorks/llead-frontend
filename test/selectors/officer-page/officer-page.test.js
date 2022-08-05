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
    it('returns officer data', () => {
      const officerData = {
        id: 1,
        name: 'Officer Name',
        badges: ['12345'],
        birthYear: 1962,
        race: 'race',
        gender: 'gender',
        departments: [
          {
            id: 'department-name',
            name: 'Department Name',
            extraDepartmentField: 'should not be included',
          },
        ],
        salary: '54267.789',
        salaryFreq: 'yearly',
        documentsCount: 1,
        complaintsCount: 2,
        extraField: 'should not be included',
        latestRank: 'senior',
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
        salary: '$54,267.79/year',
        description: `${age}-year-old race gender`,
        departments: [
          {
            id: 'department-name',
            name: 'Department Name',
          },
        ],
        latestRank: 'senior',
      })
    })

    it('returns officer data with multi departments', () => {
      const officerData = {
        id: 1,
        name: 'Officer Name',
        badges: ['12345', '56789'],
        birthYear: 1962,
        race: 'race',
        gender: 'gender',
        departments: [
          {
            id: 'department-name',
            name: 'Department Name',
            extraDepartmentField: 'should not be included',
          },
          {
            id: 'related-department-name',
            name: 'Related Department Name',
            extraDepartmentField: 'should not be included',
          },
        ],
        salary: '54267.789',
        salaryFreq: 'yearly',
        documentsCount: 1,
        complaintsCount: 2,
        extraField: 'should not be included',
        latestRank: 'senior',
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
        badges: ['12345', '56789'],
        documentsCount: 1,
        complaintsCount: 2,
        salary: '$54,267.79/year',
        description: `${age}-year-old race gender`,
        departments: [
          {
            id: 'department-name',
            name: 'Department Name',
          },
          {
            id: 'related-department-name',
            name: 'Related Department Name',
          },
        ],
        latestRank: 'senior',
      })
    })

    describe('officer salary', () => {
      it('returns officer data with annual salary', () => {
        const officerData = {
          id: 1,
          salary: '54267.789',
          salaryFreq: 'yearly',
        }
        const state = {
          officerPage: {
            officer: officerData,
          },
        }

        const officer = officerSelector(state)

        expect(officer['salary']).toEqual('$54,267.79/year')
      })

      it('returns officer data with hourly salary', () => {
        const officerData = {
          id: 1,
          salary: '12.24',
          salaryFreq: 'hourly',
        }
        const state = {
          officerPage: {
            officer: officerData,
          },
        }

        const officer = officerSelector(state)

        expect(officer['salary']).toEqual('$12.24/hour')
      })

      it('returns officer data with empty salary', () => {
        const officerData = {
          id: 1,
        }
        const state = {
          officerPage: {
            officer: officerData,
          },
        }

        const officer = officerSelector(state)

        expect(officer['salary']).toBe('')
      })
    })

    describe('officer description', () => {
      it('returns officer data with full description', () => {
        const officerData = {
          id: 1,
          birthYear: 1962,
          race: 'race',
          gender: 'gender',
        }
        const state = {
          officerPage: {
            officer: officerData,
          },
        }

        const age = moment().diff(moment('1962', 'YYYY'), 'years')
        const officer = officerSelector(state)

        expect(officer['description']).toEqual(`${age}-year-old race gender`)
      })

      it('returns officer data with only age & race for description', () => {
        const officerData = {
          id: 1,
          birthYear: 1962,
          race: 'race',
        }
        const state = {
          officerPage: {
            officer: officerData,
          },
        }

        const age = moment().diff(moment('1962', 'YYYY'), 'years')
        const officer = officerSelector(state)

        expect(officer['description']).toEqual(`${age} years old, race`)
      })

      it('returns officer data with only age & gender for description', () => {
        const officerData = {
          id: 1,
          birthYear: 1962,
          gender: 'gender',
        }
        const state = {
          officerPage: {
            officer: officerData,
          },
        }

        const age = moment().diff(moment('1962', 'YYYY'), 'years')
        const officer = officerSelector(state)

        expect(officer['description']).toEqual(`${age} years old, gender`)
      })

      it('returns officer data with empty description', () => {
        const officerData = {
          id: 1,
        }
        const state = {
          officerPage: {
            officer: officerData,
          },
        }

        const officer = officerSelector(state)

        expect(officer['description']).toEqual('')
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
      departments: [
        {
          id: 'department-name-1',
          name: 'Department Name 1',
          extraDepartmentField: 'should not be included',
        },
        {
          id: 'department-name-2',
          name: 'Department Name 2',
          extraDepartmentField: 'should not be included',
        },
      ],
      latestRank: 'senior',
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
      departments: [
        {
          id: 'department-name-1',
          name: 'Department Name 1',
        },
        {
          id: 'department-name-2',
          name: 'Department Name 2',
        },
      ],
      latestRank: 'senior',
    })
  })
})
