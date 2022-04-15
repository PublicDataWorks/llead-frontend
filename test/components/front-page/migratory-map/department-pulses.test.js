import React from 'react'
import { render, act } from '@testing-library/react'
import sinon from 'sinon'
import * as ReactMapboxGl from 'react-mapbox-gl'

import DepartmentPulses from 'components/front-page/migratory-map/department-pulses'

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
    const clock = sinon.useFakeTimers()
    const pulsingPoints = [
      {
        'southern-br-university-pd': {
          count: 1,
          location: [-91.191113, 30.5255956],
        },
      },
    ]

    const currentIndex = 0

    render(
      <DepartmentPulses
        pulsingPoints={pulsingPoints}
        currentIndex={currentIndex}
      />
    )

    act(() => {
      clock.tick(2600)
    })

    expect(mockSource.mock.calls[0][0]).toEqual({
      id: 'dot-point', 
      geoJsonSource: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-91.191113, 30.5255956],
            },
            properties: {
              radius: 3.25
            }
          }],
        },
      }
    })
    expect(mockLayer.mock.calls[0][0]).toEqual({
      id: 'layer-with-pulsing-dot',
      type: 'circle',
      sourceId: 'dot-point',
      paint: {
        'circle-color': '#fc8b24',
        'circle-opacity': 0.8,
        'circle-radius': ['*', ['get', 'radius'], 1],
      }
    })
  })
})
