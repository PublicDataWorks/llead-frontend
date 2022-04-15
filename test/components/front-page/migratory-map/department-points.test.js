import React from 'react'
import { render } from '@testing-library/react'
import sinon from 'sinon'
import * as ReactMapboxGl from 'react-mapbox-gl'

import DepartmentPoints from 'components/front-page/migratory-map/department-points'

describe('department point component', () => {
  const mockSource = jest.fn(() => <div>Source</div>)
  const mockLayer = jest.fn(() => <div>Layer</div>)

  beforeEach(() => {
    mockSource.mockClear()
    mockLayer.mockClear()

    sinon.stub(ReactMapboxGl, 'Source').value(mockSource)
    sinon.stub(ReactMapboxGl, 'Layer').value(mockLayer)
  })
  
  it('renders correctly', () => {
    const coordinates = [
      [-90.0701, 29.9499],
      [-91.191113, 30.5255956],
    ]

    render(<DepartmentPoints departmentCoordinates={coordinates} />)

    expect(mockSource.mock.calls[0][0]).toEqual({
      id: 'department-location-data', 
      geoJsonSource: { 
        type: 'geojson', 
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: coordinates[0],
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: coordinates[1],
            },
          }]
          }
        }
      })

    expect(mockLayer.mock.calls[0][0]).toEqual({
      id: 'department-point-inner-circle-layer',
      type: 'circle',
      sourceId: 'department-location-data',
      paint: { 'circle-radius': 3, 'circle-color': '#231f20' }
    })
  })
})