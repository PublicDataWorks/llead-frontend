import {
  departmentCoordinatesSelector,
  migrationDetailsSelector,
  migratoryGraphsSelector,
  pulsingPointsSelector,
} from 'selectors/front-page/migratory-map'

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
    },
    {
      startNode: 'new-orleans-pd',
      endNode: 'new-orleans-harbor-pd',
      startLocation: [-90.0701, 29.9499],
      endLocation: [-90.07642, 29.92065],
      year: 2009,
      date: '2009-09-13',
      officerName: 'Michael Jordan',
      officerId: 2149,
    },
  ],
}

describe('#departmentCoordinatesSelector', () => {
  describe('has data', () => {
    it('returns map data', () => {
      const state = {
        frontPage: {
          migratoryData: migratoryData,
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
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const data = departmentCoordinatesSelector({})

      expect(data).toStrictEqual([])
    })
  })
})

describe('#migratoryGraphsSelector', () => {
  describe('has data', () => {
    it('returns data', () => {
      const state = {
        frontPage: {
          migratoryData: migratoryData,
        },
      }

      const expectedResult = migratoryData.graphs
      expectedResult['count'] = 1

      const data = migratoryGraphsSelector(state)

      expect(data).toStrictEqual(expectedResult)
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const data = migratoryGraphsSelector({})

      expect(data).toStrictEqual([])
    })
  })
})

describe('#pulsingPointsSelector', () => {
  describe('has data', () => {
    it('returns data', () => {
      const state = {
        frontPage: {
          migratoryData: migratoryData,
        },
      }

      const data = pulsingPointsSelector(state)

      expect(data).toStrictEqual([
        {
          'southern-br-university-pd': {
            count: 1,
            location: [-91.191113, 30.5255956],
          },
        },
        {
          'new-orleans-harbor-pd': {
            count: 1,
            location: [-90.07642, 29.92065],
          },
          'southern-br-university-pd': {
            count: 1,
            location: [-91.191113, 30.5255956],
          },
        },
        {
          'new-orleans-harbor-pd': {
            count: 2,
            location: [-90.07642, 29.92065],
          },
          'southern-br-university-pd': {
            count: 1,
            location: [-91.191113, 30.5255956],
          },
        },
      ])
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const data = pulsingPointsSelector({})

      expect(data).toStrictEqual([])
    })
  })
})

describe('#migrationDetailsSelector', () => {
  describe('has data', () => {
    it('returns data', () => {
      const state = {
        frontPage: {
          migratoryData: migratoryData,
          mapCurrentIndex: 0,
        },
      }

      const data = migrationDetailsSelector(state)

      expect(data).toStrictEqual({
        startDepartment: 'New Orleans Police Department',
        endDepartment: 'Southern - Br University PD',
        officerName: 'Tonya Johnese',
        date: 'Jun 21, 1999',
      })
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const data = migrationDetailsSelector({})

      expect(data).toStrictEqual({})
    })
  })
})
