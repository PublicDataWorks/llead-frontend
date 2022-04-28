import React from 'react'
import { render } from '@testing-library/react'
import { lineString } from '@turf/turf'
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
  })
})
