import React from 'react'
import { render } from '@testing-library/react'

import DepartmentMigratoryMap from 'components/department-page/migratory-map'
import DepartmentMigrationDataContainer from 'containers/department-page/migratory-map/migration-data'
import MigratoryInformationBoxContainer from 'containers/department-page/migratory-map/information-box'
import MapFooterContainer from 'containers/department-page/migratory-map/map-footer'

const MockMapComponent = jest.fn(({ children }) => (
  <div>Map Box {children}</div>
))
jest.mock('react-mapbox-gl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => MockMapComponent),
}))

jest.mock('containers/department-page/migratory-map/information-box', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockMigratoryInformationBoxComponent = () => {
  return <div>Migration Information Box</div>
}

jest.mock('containers/department-page/migratory-map/migration-data', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockMigrationDataContainer = () => {
  return <div>Migration Data Container</div>
}

jest.mock('containers/department-page/migratory-map/map-footer', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockMapFooterContainer = () => {
  return <div>Fixed Arc</div>
}

describe('Migratory map component', () => {
  beforeAll(() => {
    MigratoryInformationBoxContainer.mockImplementation(
      MockMigratoryInformationBoxComponent
    )
    DepartmentMigrationDataContainer.mockImplementation(
      MockMigrationDataContainer
    )
    MapFooterContainer.mockImplementation(MockMapFooterContainer)
  })

  beforeEach(() => {
    MigratoryInformationBoxContainer.mockClear()
    DepartmentMigrationDataContainer.mockClear()
    MapFooterContainer.mockClear()
  })

  it('renders correctly', () => {
    render(<DepartmentMigratoryMap />)

    expect(MockMapComponent.mock.calls[0][0]).toEqual({
      style: 'mapbox://styles/llead/cl2pmpqb4005p14nybpstbchj',
      center: [-90.33, 30.75],
      zoom: [5],
      children: expect.anything(),
    })

    expect(MigratoryInformationBoxContainer).toHaveBeenCalled()
    expect(DepartmentMigrationDataContainer).toHaveBeenCalled()
    expect(MapFooterContainer).toHaveBeenCalled()
  })
})
