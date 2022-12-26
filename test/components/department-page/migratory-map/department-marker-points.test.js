import React from 'react'
import { render, act } from '@testing-library/react'
import sinon from 'sinon'
import * as ReactMapboxGl from 'react-mapbox-gl'
import * as turf from '@turf/turf'

import DepartmentPoints from 'components/department-page/migratory-map/department-marker-points'

describe('department point component', () => {
  let registerCalls = {}
  const mockMouseEnter = jest.fn()
  const mockSource = jest.fn(() => <div>Source</div>)
  const mockPopup = jest.fn(() => <div>Popup</div>)

  const popupCoordinates = [91.00001, 31.00001]
  const popupName = 'Department name'
  const mockMouseEnterEventParams = {
    features: [
      {
        geometry: { coordinates: popupCoordinates },
        properties: { name: popupName },
      },
    ],
  }

  mockMouseEnter.mockImplementation((targetId) => {
    registerCalls[targetId](mockMouseEnterEventParams)
  })
  const mockLayer = jest.fn(({ id, onMouseEnter }) => {
    registerCalls[id] = onMouseEnter

    return <div>Layer</div>
  })

  beforeEach(() => {
    mockSource.mockClear()
    mockLayer.mockClear()
    mockPopup.mockClear()
    mockMouseEnter.mockClear()
    registerCalls = {}

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

    const department = {
      location: [-90.09622, 30.48031],
    }

    render(
      <DepartmentPoints
        department={department}
        departmentCoordinates={departmentCoordinates}
      />
    )

    expect(mockSource.mock.calls[0][0]).toMatchObject({
      id: 'department-backdrop',
      geoJsonSource: {
        type: 'geojson',
        data: {
          type: 'Feature',
          bbox: [
            -97.00968750000014,
            28.438406418194234,
            -82.39787109374994,
            33.04426149544631,
          ],
        },
      },
    })

    expect(mockSource.mock.calls[1][0]).toEqual({
      id: 'department-marker',
      geoJsonSource: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [turf.point(department.location)],
        },
      },
    })

    expect(mockSource.mock.calls[2][0]).toEqual({
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
      id: 'department-backdrop-layer',
      type: 'fill',
      sourceId: 'department-backdrop',
      paint: { 'fill-color': '#ffffff', 'fill-opacity': 0 },
      onMouseEnter: expect.any(Function),
    })

    expect(mockLayer.mock.calls[1][0]).toEqual({
      id: 'department-marker-layer',
      type: 'symbol',
      sourceId: 'department-marker',
      layout: {
        'icon-image': 'red-marker',
        'icon-size': 0.5,
        'icon-anchor': 'bottom',
      },
      before: 'department-backdrop-layer',
    })

    expect(mockLayer.mock.calls[2][0]).toEqual({
      id: 'department-point-inner-circle-layer',
      type: 'circle',
      sourceId: 'department-location-data',
      paint: { 'circle-radius': 3, 'circle-color': '#231f20' },
      onMouseEnter: expect.any(Function),
      before: 'department-marker-layer',
    })
  })

  it('toggles department name when mouse enter and leave', () => {
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

    const department = {
      location: [-90.09622, 30.48031],
    }

    const { queryByText } = render(
      <DepartmentPoints
        department={department}
        departmentCoordinates={departmentCoordinates}
      />
    )

    expect(mockPopup).not.toHaveBeenCalled()

    act(() => {
      mockMouseEnter('department-point-inner-circle-layer')
    })

    let currentMockPopupCall = mockPopup.mock.calls
    expect(queryByText('Popup')).toBeTruthy()
    expect(currentMockPopupCall[currentMockPopupCall.length - 1][0]).toEqual({
      coordinates: popupCoordinates,
      children: popupName,
    })

    act(() => {
      mockMouseEnter('department-backdrop-layer')
    })
    expect(queryByText('Popup')).toBeFalsy()

    act(() => {
      mockMouseEnter('department-backdrop-layer')
    })
    expect(queryByText('Popup')).toBeFalsy()
  })
})
