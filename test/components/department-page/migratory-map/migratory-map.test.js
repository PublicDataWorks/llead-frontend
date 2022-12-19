import React from 'react'
import { render } from '@testing-library/react'
import sinon from 'sinon'
import * as ReactMapboxGl from 'react-mapbox-gl'

import DepartmentMigratoryMap from 'components/department-page/migratory-map'
import FixedArc from 'components/common/map/fixed-arc'
import MigratoryInformationBox from 'components/department-page/migratory-map/information-box'
import DepartmentPoints from 'components/department-page/migratory-map/department-points'

const MockMapComponent = jest.fn(({ children }) => (
  <div>Map Box {children}</div>
))
jest.mock('react-mapbox-gl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => MockMapComponent),
  Marker: jest.fn().mockImplementation(() => <div>Marker</div>),
}))

jest.mock('components/department-page/migratory-map/information-box', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockMigratoryInformationBoxComponent = () => {
  return <div>Migration Information Box</div>
}

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
    MigratoryInformationBox.mockImplementation(
      MockMigratoryInformationBoxComponent
    )
    FixedArc.mockImplementation(MockFixedArcComponent)
  })

  beforeEach(() => {
    DepartmentPoints.mockClear()
    MigratoryInformationBox.mockClear()
    FixedArc.mockClear()
  })

  it('renders correctly', () => {
    const departmentId = 'new-orleans-pd'
    const fetchDepartmentMigratoryDataStub = sinon.stub()
    const departmentData = {
      city: 'department city',
      address: '123 Road Street',
      parish: 'department parish',
      phone: '123456',
      location: [1, 1],
    }

    const container = render(
      <DepartmentMigratoryMap
        id={departmentId}
        department={departmentData}
        fetchDepartmentMigratoryData={fetchDepartmentMigratoryDataStub}
      />
    )

    const { queryByText } = container

    expect(fetchDepartmentMigratoryDataStub).toHaveBeenCalledWith(departmentId)
    expect(MockMapComponent.mock.calls[0][0]).toMatchObject({
      style: 'mapbox://styles/llead/cl2pmpqb4005p14nybpstbchj',
      center: [-90.33, 30.75],
      zoom: [5],
      children: expect.any(Array),
    })
    expect(MigratoryInformationBox).toHaveBeenCalled()
    expect(ReactMapboxGl.Marker.mock.calls[0][0]).toMatchObject({
      coordinates: [1, 1],
      anchor: 'bottom',
      offset: -4,
      children: expect.any(Object),
    })
    expect(DepartmentPoints).toHaveBeenCalled()
    expect(FixedArc).toHaveBeenCalled()
    expect(queryByText('department city').className).toEqual('department-city')
    expect(queryByText('department parish').className).toEqual(
      'department-parish'
    )
    expect(queryByText('123 Road Street').className).toEqual(
      'department-address'
    )
    expect(queryByText('123456').className).toEqual('department-phone')
  })

  it('hides department city', () => {
    const departmentId = 'new-orleans-pd'
    const fetchDepartmentMigratoryDataStub = sinon.stub()
    const departmentData = {
      city: null,
      address: '123 Road Street',
      parish: 'department parish',
      phone: '123456',
      location: [1, 1],
    }

    const container = render(
      <DepartmentMigratoryMap
        id={departmentId}
        department={departmentData}
        fetchDepartmentMigratoryData={fetchDepartmentMigratoryDataStub}
      />
    )

    const { baseElement, queryByText } = container

    expect(queryByText('department parish').className).toEqual(
      'department-parish'
    )
    expect(queryByText('123 Road Street').className).toEqual(
      'department-address'
    )
    expect(queryByText('123456').className).toEqual('department-phone')
    expect(
      baseElement.getElementsByClassName('department-city').length
    ).toEqual(0)
  })

  it('hides department parish', () => {
    const departmentId = 'new-orleans-pd'
    const fetchDepartmentMigratoryDataStub = sinon.stub()
    const departmentData = {
      city: 'department city',
      address: '123 Road Street',
      parish: null,
      phone: '123456',
      location: [1, 1],
    }

    const container = render(
      <DepartmentMigratoryMap
        id={departmentId}
        department={departmentData}
        fetchDepartmentMigratoryData={fetchDepartmentMigratoryDataStub}
      />
    )

    const { baseElement, queryByText } = container

    expect(queryByText('department city').className).toEqual('department-city')
    expect(queryByText('123 Road Street').className).toEqual(
      'department-address'
    )
    expect(queryByText('123456').className).toEqual('department-phone')
    expect(
      baseElement.getElementsByClassName('department-parish').length
    ).toEqual(0)
  })

  it('hides department address', () => {
    const departmentId = 'new-orleans-pd'
    const fetchDepartmentMigratoryDataStub = sinon.stub()
    const departmentData = {
      city: 'department city',
      address: null,
      parish: 'department parish',
      phone: '123456',
      location: [1, 1],
    }

    const container = render(
      <DepartmentMigratoryMap
        id={departmentId}
        department={departmentData}
        fetchDepartmentMigratoryData={fetchDepartmentMigratoryDataStub}
      />
    )

    const { baseElement, queryByText } = container

    expect(queryByText('department city').className).toEqual('department-city')
    expect(queryByText('department parish').className).toEqual(
      'department-parish'
    )
    expect(queryByText('123456').className).toEqual('department-phone')
    expect(
      baseElement.getElementsByClassName('department-address').length
    ).toEqual(0)
  })

  it('hides department phone', () => {
    const departmentId = 'new-orleans-pd'
    const fetchDepartmentMigratoryDataStub = sinon.stub()
    const departmentData = {
      city: 'department city',
      address: '123 Road Street',
      parish: 'department parish',
      phone: null,
      location: [1, 1],
    }

    const container = render(
      <DepartmentMigratoryMap
        id={departmentId}
        department={departmentData}
        fetchDepartmentMigratoryData={fetchDepartmentMigratoryDataStub}
      />
    )

    const { baseElement, queryByText } = container

    expect(queryByText('department city').className).toEqual('department-city')
    expect(queryByText('department parish').className).toEqual(
      'department-parish'
    )
    expect(queryByText('123 Road Street').className).toEqual(
      'department-address'
    )
    expect(
      baseElement.getElementsByClassName('department-phone').length
    ).toEqual(0)
  })
})
