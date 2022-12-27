import React from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import sinon from 'sinon'

import DepartmentPulses from 'containers/front-page/migratory-map/department-pulses'
import FixedArc from 'components/common/map/fixed-arc'
import AnimatedArc from 'components/front-page/migratory-map/animated-arc'
import DepartmentMigration from 'components/front-page/migratory-map/department-migration'
import { createCurvedLine } from 'utils/curved-line'
import { MAP_LINE_COLOR, MAP_HIGHLIGHTED_LINE_COLOR } from 'constants/common'

jest.mock('containers/front-page/migratory-map/department-pulses', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockDepartmentPulsesComponent = () => {
  return <div>Department Pulses</div>
}

jest.mock('components/common/map/fixed-arc', () => ({
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
        leftReason: 'Retired',
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
        leftReason: '',
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
        leftReason: 'Resignation',
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
        leftReason: '',
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
        leftReason: '',
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
        leftReason: '',
      },
    ]

    const container = render(
      <DepartmentMigration
        graphs={graphs}
        setMapCurrentIndex={mockSetMapCurrentIndex}
      />
    )

    const { baseElement } = container

    const replayButton = baseElement.getElementsByClassName('replay-button')

    act(() => {
      clock.tick(1500 * 6 + 100)
    })

    expect(mockSetMapCurrentIndex).toHaveBeenCalledWith(5)
    expect(DepartmentPulses.mock.calls[0][0]).toEqual({
      currentIndex: 0,
    })

    expect(FixedArc.mock.calls[0][0]).toEqual({
      lines: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: createCurvedLine(
              graphs[0].startLocation,
              graphs[0].endLocation
            ).geometry.coordinates,
          },
          properties: {
            count: 1,
            color: MAP_HIGHLIGHTED_LINE_COLOR,
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: createCurvedLine(
              graphs[1].startLocation,
              graphs[1].endLocation
            ).geometry.coordinates,
          },
          properties: {
            count: 2,
            color: MAP_LINE_COLOR,
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: createCurvedLine(
              graphs[1].startLocation,
              graphs[1].endLocation
            ).geometry.coordinates,
          },
          properties: {
            count: 2,
            color: MAP_HIGHLIGHTED_LINE_COLOR,
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: createCurvedLine(
              graphs[1].startLocation,
              graphs[1].endLocation
            ).geometry.coordinates,
          },
          properties: {
            count: 2,
            color: MAP_LINE_COLOR,
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: createCurvedLine(
              graphs[1].startLocation,
              graphs[1].endLocation
            ).geometry.coordinates,
          },
          properties: {
            count: 2,
            color: MAP_LINE_COLOR,
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: createCurvedLine(
              graphs[1].startLocation,
              graphs[1].endLocation
            ).geometry.coordinates,
          },
          properties: {
            count: 2,
            color: MAP_LINE_COLOR,
          },
        },
      ],
      currentIndex: 0,
    })

    expect(AnimatedArc.mock.calls[0][0]).toEqual({
      line: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: createCurvedLine(
            graphs[0].startLocation,
            graphs[0].endLocation
          ).geometry.coordinates,
        },
        properties: {
          count: 1,
          color: MAP_HIGHLIGHTED_LINE_COLOR,
        },
      },
      currentIndex: 0,
      lineIndex: 0,
    })

    fireEvent.click(replayButton[0])
    expect(mockSetMapCurrentIndex).toHaveBeenCalledWith(0)
  })
})
