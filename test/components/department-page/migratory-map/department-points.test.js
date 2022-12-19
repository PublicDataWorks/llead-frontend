import React from 'react'
import { render } from '@testing-library/react'
import sinon from 'sinon'
import * as ReactMapboxGl from 'react-mapbox-gl'

import DepartmentPoints from 'components/department-page/migratory-map/department-points'

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
    const departmentCoordinates = [
      {
        name: '22nd District Attorney',
        coordinates: [-90.0701, 29.9499],
      },
      {
        name: 'Alcohol & Tobacco Control',
        coordinates: [-91.191113, 30.5255956],
      },
    ]

    render(<DepartmentPoints departmentCoordinates={departmentCoordinates} />)

    expect(mockSource.mock.calls[0][0]).toEqual({
      id: 'department-location-data',
      geoJsonSource: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: departmentCoordinates[0].coordinates,
              },
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: departmentCoordinates[1].coordinates,
              },
            },
          ],
        },
      },
    })

    expect(mockLayer.mock.calls[0][0]).toEqual({
      id: 'department-point-layer',
      type: 'circle',
      sourceId: 'department-location-data',
      paint: { 'circle-radius': 3, 'circle-color': '#231f20' },
    })
  })
})
