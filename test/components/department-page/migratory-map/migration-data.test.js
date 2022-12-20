import React from 'react'
import { render } from '@testing-library/react'
import * as ReactMapboxGl from 'react-mapbox-gl'

import DepartmentMigrationData from 'components/department-page/migratory-map/migration-data'
import FixedArc from 'components/common/map/fixed-arc'
import DepartmentPoints from 'components/department-page/migratory-map/department-points'

jest.mock('react-mapbox-gl', () => ({
  __esModule: true,
  Marker: jest.fn().mockImplementation(() => <div>Marker</div>),
}))

jest.mock('components/department-page/migratory-map/department-points', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

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
    const departmentData = {
      city: 'department city',
      address: '123 Road Street',
      parish: 'department parish',
      phone: '123456',
      location: [1, 1],
    }

    const nodes = {
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
    }

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

    render(
      <DepartmentMigrationData
        department={departmentData}
        graphs={graphs}
        nodes={nodes}
      />
    )

    expect(ReactMapboxGl.Marker.mock.calls[0][0]).toMatchObject({
      coordinates: [1, 1],
      anchor: 'bottom',
      offset: -4,
      children: expect.any(Object),
    })
    expect(DepartmentPoints).toHaveBeenCalled()
    expect(FixedArc).toHaveBeenCalled()
  })
})
