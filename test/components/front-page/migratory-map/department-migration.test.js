import React from 'react'
import { render, act } from '@testing-library/react'
import sinon from 'sinon'

import DepartmentPulses from 'containers/front-page/migratory-map/department-pulses'
import FixedArc from 'components/front-page/migratory-map/fixed-arc'
import AnimatedArc from 'components/front-page/migratory-map/animated-arc'
import DepartmentMigration from 'components/front-page/migratory-map/department-migration'
import { createCurvedLine } from 'utils/curved-line'

jest.mock('containers/front-page/migratory-map/department-pulses', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockDepartmentPulsesComponent = () => {
  return <div>Department Pulses</div>
}

jest.mock('components/front-page/migratory-map/fixed-arc', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockFixedArcComponent = () => {
  return <div>Fixed Arc</div>
}

jest.mock('components/front-page/migratory-map/animated-arc', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockAnimatedArcComponent = () => {
  return <div>Animated Arc</div>
}

beforeAll(() => {
  DepartmentPulses.mockImplementation(MockDepartmentPulsesComponent)
  FixedArc.mockImplementation(MockFixedArcComponent)
  AnimatedArc.mockImplementation(MockAnimatedArcComponent)
})

beforeEach(() => {
  DepartmentPulses.mockClear()
  FixedArc.mockClear()
  AnimatedArc.mockClear()
})

describe('department migration component', () => {
  it('renders correctly', () => {
    const clock = sinon.useFakeTimers()
    const mockSetMapCurrentIndex = sinon.stub()

    const graphs = [
      {
        count: 1,
        date: 'Jun 21, 1999',
        endDepartment: 'Southern - Br University PD',
        endLocation: [-91.191113, 30.5255956],
        endNode: 'southern-br-university-pd',
        officerId: 1529,
        officerName: 'Tonya Johnese',
        startDepartment: 'New Orleans Police Department',
        startLocation: [-90.0701, 29.9499],
        startNode: 'new-orleans-pd',
        year: 1999,
      },
      {
        count: 2,
        date: 'Jun 21, 1999',
        endDepartment: 'Southern - Br University PD',
        endLocation: [-91.191113, 30.5255956],
        endNode: 'southern-br-university-pd',
        officerId: 1529,
        officerName: 'Tony Parker',
        startDepartment: 'New Orleans Police Department',
        startLocation: [-90.0701, 29.9499],
        startNode: 'new-orleans-pd',
        year: 2000,
      },
      {
        count: 2,
        date: 'Jun 21, 1999',
        endDepartment: 'Southern - Br University PD',
        endLocation: [-91.191113, 30.5255956],
        endNode: 'southern-br-university-pd',
        officerId: 1529,
        officerName: 'Tony Parker',
        startDepartment: 'New Orleans Police Department',
        startLocation: [-90.0701, 29.9499],
        startNode: 'new-orleans-pd',
        year: 2001,
      },
      {
        count: 2,
        date: 'Jun 21, 1999',
        endDepartment: 'Southern - Br University PD',
        endLocation: [-91.191113, 30.5255956],
        endNode: 'southern-br-university-pd',
        officerId: 1529,
        officerName: 'Tony Parker',
        startDepartment: 'New Orleans Police Department',
        startLocation: [-90.0701, 29.9499],
        startNode: 'new-orleans-pd',
        year: 2002,
      },
      {
        count: 2,
        date: 'Jun 21, 1999',
        endDepartment: 'Southern - Br University PD',
        endLocation: [-91.191113, 30.5255956],
        endNode: 'southern-br-university-pd',
        officerId: 1529,
        officerName: 'Tony Parker',
        startDepartment: 'New Orleans Police Department',
        startLocation: [-90.0701, 29.9499],
        startNode: 'new-orleans-pd',
        year: 2003,
      },
      {
        count: 2,
        date: 'Jun 21, 1999',
        endDepartment: 'Southern - Br University PD',
        endLocation: [-91.191113, 30.5255956],
        endNode: 'southern-br-university-pd',
        officerId: 1529,
        officerName: 'Tony Parker',
        startDepartment: 'New Orleans Police Department',
        startLocation: [-90.0701, 29.9499],
        startNode: 'new-orleans-pd',
        year: 2004,
      },
    ]

    render(
      <DepartmentMigration
        graphs={graphs}
        setMapCurrentIndex={mockSetMapCurrentIndex}
      />
    )

    act(() => {
      clock.tick(1500*6 + 100)
    })

    expect(mockSetMapCurrentIndex).toHaveBeenCalled()
    expect(DepartmentPulses.mock.calls[0][0]).toEqual({
      currentIndex: 0,
    })

    expect(FixedArc.mock.calls[0][0]).toEqual({
      lines: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: createCurvedLine(graphs[0].startLocation, graphs[0].endLocation).geometry.coordinates,
          },
          properties: {
            officerName: 'Tonya Johnese',
            count: 1,
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: createCurvedLine(graphs[1].startLocation, graphs[1].endLocation).geometry.coordinates,
          },
          properties: {
            officerName: 'Tony Parker',
            count: 2,
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: createCurvedLine(graphs[1].startLocation, graphs[1].endLocation).geometry.coordinates,
          },
          properties: {
            officerName: 'Tony Parker',
            count: 2,
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: createCurvedLine(graphs[1].startLocation, graphs[1].endLocation).geometry.coordinates,
          },
          properties: {
            officerName: 'Tony Parker',
            count: 2,
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: createCurvedLine(graphs[1].startLocation, graphs[1].endLocation).geometry.coordinates,
          },
          properties: {
            officerName: 'Tony Parker',
            count: 2,
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: createCurvedLine(graphs[1].startLocation, graphs[1].endLocation).geometry.coordinates,
          },
          properties: {
            officerName: 'Tony Parker',
            count: 2,
          }
        },
      ],
      currentIndex: 0,
    })

    expect(AnimatedArc.mock.calls[0][0]).toEqual({
      line: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: createCurvedLine(graphs[0].startLocation, graphs[0].endLocation).geometry.coordinates,
        },
        properties: {
          officerName: 'Tonya Johnese',
          count: 1,
        },
      },
      currentIndex: 0,
      lineIndex: 0,
    })
  })
})
