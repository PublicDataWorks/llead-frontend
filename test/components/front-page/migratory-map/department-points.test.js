import React from 'react'
import { render, act } from '@testing-library/react'
import sinon from 'sinon'
import * as ReactMapboxGl from 'react-mapbox-gl'

import DepartmentPoints from 'components/front-page/migratory-map/department-points'

describe('department point component', () => {
  const mockMouseEnter = jest.fn()
  const mockSource = jest.fn(() => <div>Source</div>)
  const mockPopup = jest.fn(() => <div>Popup</div>)

  const popupCoordinates = [91.00001, 31.00001]
  const popupName = 'Department name'
  const mockEvent = {
    features: [
      {
        geometry: { coordinates: popupCoordinates },
        properties: { name: popupName },
      },
    ],
  }
  const mockLayer = jest.fn(({ onMouseEnter }) => {
    mockMouseEnter.mockImplementation(() => {
      onMouseEnter(mockEvent)
    })
    return <div>Layer</div>
  })

  beforeEach(() => {
    mockSource.mockClear()
    mockLayer.mockClear()
    mockPopup.mockClear()
    mockMouseEnter.mockClear()

    sinon.stub(ReactMapboxGl, 'Source').value(mockSource)
    sinon.stub(ReactMapboxGl, 'Layer').value(mockLayer)
    sinon.stub(ReactMapboxGl, 'Popup').value(mockPopup)
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
              properties: {
                name: departmentCoordinates[0].name,
              },
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: departmentCoordinates[1].coordinates,
              },
              properties: {
                name: departmentCoordinates[1].name,
              },
            },
          ],
        },
      },
    })

    expect(mockLayer.mock.calls[0][0]).toEqual({
      id: 'department-point-inner-circle-layer',
      onMouseEnter: expect.any(Function),
      type: 'circle',
      sourceId: 'department-location-data',
      paint: { 'circle-radius': 3, 'circle-color': '#231f20' },
    })

    expect(mockPopup).not.toHaveBeenCalled()

    act(() => {
      mockMouseEnter()
    })

    expect(mockPopup.mock.calls[0][0]).toEqual({
      coordinates: popupCoordinates,
      children: popupName,
    })
  })
})
