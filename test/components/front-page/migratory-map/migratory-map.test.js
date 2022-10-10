import React from 'react'
import { render } from '@testing-library/react'
import sinon from 'sinon'
import * as ReactMapboxGl from 'react-mapbox-gl'

import DepartmentPoints from 'containers/front-page/migratory-map/department-points'
import DepartmentMigration from 'containers/front-page/migratory-map/department-migration'
import MigrationDetailsBox from 'containers/front-page/migratory-map/migration-details'
import MigratoryMap from 'components/front-page/migratory-map/index'

jest.mock('containers/front-page/migratory-map/department-points', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockDepartmentPointsComponent = () => {
  return <div>Department Points</div>
}

jest.mock('containers/front-page/migratory-map/department-migration', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockDepartmentMigrationComponent = () => {
  return <div>Department Migration</div>
}

jest.mock('containers/front-page/migratory-map/migration-details', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockMigrationDetailsBoxComponent = () => {
  return <div>Migration Details Box</div>
}

describe('department migration component', () => {
  const mockReactMapbox = jest.fn(({ children }) => (
    <div>Map Box {children}</div>
  ))
  const mockZoomControl = jest.fn(() => <div>Zoom Control</div>)
  const mockRotationControl = jest.fn(() => <div>Rotation Control</div>)

  beforeAll(() => {
    DepartmentPoints.mockImplementation(MockDepartmentPointsComponent)
    DepartmentMigration.mockImplementation(MockDepartmentMigrationComponent)
    MigrationDetailsBox.mockImplementation(MockMigrationDetailsBoxComponent)
  })

  beforeEach(() => {
    mockReactMapbox.mockClear()
    mockZoomControl.mockClear()
    mockRotationControl.mockClear()
    DepartmentPoints.mockClear()
    DepartmentMigration.mockClear()
    MigrationDetailsBox.mockClear()

    sinon.stub(ReactMapboxGl, 'default').returns(mockReactMapbox)
    sinon.stub(ReactMapboxGl, 'ZoomControl').value(mockZoomControl)
    sinon.stub(ReactMapboxGl, 'RotationControl').value(mockRotationControl)
  })
  it('renders correctly', () => {
    render(<MigratoryMap />)

    expect(MigrationDetailsBox).toHaveBeenCalled()
    expect(mockReactMapbox.mock.calls[0][0]).toMatchObject({
      style: 'mapbox://styles/llead/cl2pmpqb4005p14nybpstbchj',
      center: [-90.798844, 31.158971],
      zoom: [6.6],
      children: expect.any(Array),
    })
    expect(mockZoomControl.mock.calls[0][0]).toEqual({
      position: 'top-left',
    })
    expect(mockRotationControl.mock.calls[0][0]).toEqual({
      position: 'top-left',
      style: { borderTopWidth: 0 },
    })

    expect(DepartmentMigration).toHaveBeenCalled()
    expect(DepartmentPoints).toHaveBeenCalled()
  })
})
