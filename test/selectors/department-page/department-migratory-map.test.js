import {
  departmentCoordinatesSelector,
  departmentMigratoryGraphsSelector,
  departmentMigratoryInfoSelector,
} from 'selectors/department-page/department-migratory-map'

const migratoryData = {
  nodes: {
    newOrleansPd: {
      name: 'New Orleans Police Department',
      location: [-90.0701, 29.9499],
    },
    southernBrUniversityPd: {
      name: 'Southern - Br University PD',
      location: [-91.191113, 30.5255956],
    },
    newOrleansHarborPd: {
      name: 'New Orleans Harbor PD',
      location: [-90.07642, 29.92065],
    },
  },
  graphs: [
    {
      startNode: 'new-orleans-pd',
      endNode: 'southern-br-university-pd',
      startLocation: [-90.0701, 29.9499],
      endLocation: [-91.191113, 30.5255956],
      year: 1999,
      date: '1999-06-21',
      officerName: 'Tonya Johnese',
      officerId: 1529,
      leftReason: 'Retired',
      isLeft: true,
    },
    {
      startNode: 'new-orleans-pd',
      endNode: 'new-orleans-harbor-pd',
      startLocation: [-90.0701, 29.9499],
      endLocation: [-90.07642, 29.92065],
      year: 1999,
      date: '1999-09-13',
      officerName: 'Michael Allsbrook',
      officerId: 2148,
      leftReason: 'Resignation',
      isLeft: true,
    },
    {
      startNode: 'new-orleans-pd',
      endNode: 'new-orleans-harbor-pd',
      startLocation: [-90.0701, 29.9499],
      endLocation: [-90.07642, 29.92065],
      year: 2001,
      date: '1999-09-13',
      officerName: 'Michael Dean',
      officerId: 2149,
      leftReason: null,
      isLeft: true,
    },
    {
      startNode: 'new-orleans-harbor-pd',
      endNode: 'new-orleans-pd',
      startLocation: [-90.0701, 29.9499],
      endLocation: [-90.07642, 29.92065],
      year: 2009,
      date: '2009-09-13',
      officerName: 'Michael Jordan',
      officerId: 2149,
      leftReason: '',
      isLeft: false,
    },
  ],
}

describe('#departmentCoordinatesSelector', () => {
  describe('has data', () => {
    it('returns map data', () => {
      const state = {
        departmentPage: {
          departmentMigratoryData: migratoryData,
        },
      }

      const data = departmentCoordinatesSelector(state)

      expect(data).toStrictEqual([
        {
          name: 'New Orleans Police Department',
          coordinates: [-90.0701, 29.9499],
        },
        {
          name: 'Southern - Br University PD',
          coordinates: [-91.191113, 30.5255956],
        },
        {
          name: 'New Orleans Harbor PD',
          coordinates: [-90.07642, 29.92065],
        },
      ])
    })

    describe('does not have data', () => {
      it('returns empty data', () => {
        const data = departmentCoordinatesSelector({})

        expect(data).toStrictEqual([])
      })
    })
  })
})

describe('#departmentMigratoryGraphsSelector', () => {
  describe('has data', () => {
    it('returns data', () => {
      const state = {
        departmentPage: {
          departmentMigratoryData: migratoryData,
        },
      }

      const data = departmentMigratoryGraphsSelector(state)

      expect(data).toStrictEqual([
        {
          count: 1,
          startNode: 'new-orleans-pd',
          startLocation: [-90.0701, 29.9499],
          endNode: 'southern-br-university-pd',
          endLocation: [-91.191113, 30.5255956],
          isLeft: true,
        },
        {
          count: 2,
          startNode: 'new-orleans-pd',
          startLocation: [-90.0701, 29.9499],
          endNode: 'new-orleans-harbor-pd',
          endLocation: [-90.07642, 29.92065],
          isLeft: true,
        },
        {
          count: 1,
          startNode: 'new-orleans-harbor-pd',
          startLocation: [-90.0701, 29.9499],
          endNode: 'new-orleans-pd',
          endLocation: [-90.07642, 29.92065],
          isLeft: false,
        },
      ])
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const data = departmentMigratoryGraphsSelector({})

      expect(data).toStrictEqual([])
    })
  })
})

describe('#departmentMigratoryInfoSelector', () => {
  describe('has data', () => {
    it('returns data', () => {
      const state = {
        departmentPage: {
          departmentMigratoryData: migratoryData,
        },
      }

      const data = departmentMigratoryInfoSelector(state)

      expect(data).toStrictEqual({
        years: '1999 - 2009',
        join: {
          count: 1,
          departments: [
            {
              count: 1,
              name: 'New Orleans Harbor PD',
            },
          ],
        },
        left: {
          count: 3,
          departments: [
            {
              count: 2,
              name: 'New Orleans Harbor PD',
            },
            {
              count: 1,
              name: 'Southern - Br University PD',
            },
          ],
        },
      })
    })

    it('returns data', () => {
      const state = {
        departmentPage: {
          departmentMigratoryData: {
            nodes: {
              newOrleansPd: {
                name: 'New Orleans Police Department',
                location: [-90.0701, 29.9499],
              },
              southernBrUniversityPd: {
                name: 'Southern - Br University PD',
                location: [-91.191113, 30.5255956],
              },
            },
            graphs: [
              {
                startNode: 'new-orleans-pd',
                endNode: 'southern-br-university-pd',
                startLocation: [-90.0701, 29.9499],
                endLocation: [-91.191113, 30.5255956],
                year: 1999,
                date: '1999-06-21',
                officerName: 'Tonya Johnese',
                officerId: 1529,
                leftReason: 'Retired',
                isLeft: true,
              },
            ],
          },
        },
      }

      const data = departmentMigratoryInfoSelector(state)

      expect(data).toStrictEqual({
        years: '1999',
        join: {
          count: undefined,
          departments: [],
        },
        left: {
          count: 1,
          departments: [
            {
              count: 1,
              name: 'Southern - Br University PD',
            },
          ],
        },
      })
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const data = departmentMigratoryInfoSelector({})

      expect(data).toStrictEqual({
        years: 'undefined',
        join: {
          count: undefined,
          departments: [],
        },
        left: {
          count: undefined,
          departments: [],
        },
      })
    })
  })
})
