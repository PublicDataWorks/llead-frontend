import React from 'react'
import { render } from '@testing-library/react'
import { length, along, lineString } from '@turf/turf'
import sinon from 'sinon'
import * as ReactMapboxGl from 'react-mapbox-gl'

import FixedArc from 'components/front-page/migratory-map/fixed-arc'

describe('fixed arc component', () => {
  const mockSource = jest.fn(() => <div>Source</div>)
  const mockLayer = jest.fn(() => <div>Layer</div>)

  beforeEach(() => {
    mockSource.mockClear()
    mockLayer.mockClear()

    sinon.stub(ReactMapboxGl, 'Source').value(mockSource)
    sinon.stub(ReactMapboxGl, 'Layer').value(mockLayer)
  })

  it('renders correctly', () => {
    const line = lineString([
      [-76.091308, 18.427501],
      [-76.695556, 18.729501],
    ])
    line.properties.officerName = 'Tonya Johnese'

    const officerData = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: along(line, length(line) / 2).geometry.coordinates,
      },
      properties: {
        officerName: 'Tonya Johnese',
      },
    }

    const lines = [line]

    const stableLineData = {
      type: 'FeatureCollection',
      features: lines,
    }

    const currentIndex = 0

    render(<FixedArc lines={lines} currentIndex={currentIndex} />)

    expect(mockSource.mock.calls[0][0]).toEqual({
      id: 'stable-lines',
      geoJsonSource: {
        type: 'geojson',
        data: stableLineData,
      },
    })

    expect(mockLayer.mock.calls[0][0]).toEqual({
      id: 'stable-layer',
      type: 'line',
      sourceId: 'stable-lines',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#005ef4',
        'line-width': ['get', 'count'],
        'line-opacity': 0.2,
      },
    })

    expect(mockSource.mock.calls[1][0]).toEqual({
      id: 'officer-name',
      geoJsonSource: {
        type: 'geojson',
        data: officerData,
      },
    })

    expect(mockLayer.mock.calls[1][0]).toEqual({
      id: 'officer-layer',
      type: 'symbol',
      sourceId: 'officer-name',
      layout: {
        'symbol-placement': 'point',
        'text-anchor': 'center',
        'text-field': '{officerName}',
        'text-size': 14,
      },
    })
  })

  it('does not render officer name if it is not the first five', () => {
    const line = lineString([
      [-76.091308, 18.427501],
      [-76.695556, 18.729501],
    ])
    line.properties.officerName = 'Tonya Johnese'

    const lines = [line, line, line, line, line, line]

    const stableLineData = {
      type: 'FeatureCollection',
      features: lines,
    }

    const currentIndex = 5

    render(<FixedArc lines={lines} currentIndex={currentIndex} />)

    expect(mockSource.mock.calls[0][0]).toEqual({
      id: 'stable-lines',
      geoJsonSource: {
        type: 'geojson',
        data: stableLineData,
      },
    })

    expect(mockLayer.mock.calls[0][0]).toEqual({
      id: 'stable-layer',
      type: 'line',
      sourceId: 'stable-lines',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#005ef4',
        'line-width': ['get', 'count'],
        'line-opacity': 0.2,
      },
    })

    expect(mockSource.mock.calls[1]).toBeFalsy()
    expect(mockLayer.mock.calls[1]).toBeFalsy()
  })
})
