import React from 'react'
import { render } from '@testing-library/react'

import DepartmentMigrationData from 'components/department-page/migratory-map/migration-data'
import FixedArc from 'components/common/map/fixed-arc'
import DepartmentPoints from 'containers/department-page/migratory-map/department-marker-points'

jest.mock(
  'containers/department-page/migratory-map/department-marker-points',
  () => ({
    __esModule: true,
    namedExport: jest.fn(),
    default: jest.fn(),
  })
)

const MockDepartmentPointsComponent = () => {
  return <div>Department Points</div>
}

jest.mock('components/common/map/fixed-arc', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockFixedArcComponent = () => {
  return <div>Fixed Arc</div>
}

describe('Migratory map component', () => {
  beforeAll(() => {
    DepartmentPoints.mockImplementation(MockDepartmentPointsComponent)
    FixedArc.mockImplementation(MockFixedArcComponent)
  })

  beforeEach(() => {
    DepartmentPoints.mockClear()
    FixedArc.mockClear()
  })

  it('renders correctly', () => {
    const graphs = [
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
    ]

    render(<DepartmentMigrationData graphs={graphs} />)

    expect(DepartmentPoints).toHaveBeenCalled()
    expect(FixedArc).toHaveBeenCalled()
  })
})
