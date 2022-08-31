import React from 'react'
import { render, act } from '@testing-library/react'
import { lineString } from '@turf/turf'
import sinon from 'sinon'
import * as ReactMapboxGl from 'react-mapbox-gl'
import AnimatedArc, {
  areEqual,
} from 'components/front-page/migratory-map/animated-arc'

describe('animated arc component', () => {
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
    const line = lineString([
      [-76.091308, 18.427501],
      [-76.695556, 18.729501],
      [-77.695556, 18.729501],
    ])
    const currentIndex = 0
    const lineIndex = 0

    render(
      <AnimatedArc
        line={line}
        currentIndex={currentIndex}
        lineIndex={lineIndex}
      />
    )

    act(() => {
      clock.tick(1500)
    })

    expect(mockSource.mock.calls[1][0]).toEqual({
      id: 'animated-line-0',
      geoJsonSource: {
        type: 'geojson',
        data: line,
      },
    })

    expect(mockLayer.mock.calls[0][0]).toEqual({
      id: 'animated-layer-0',
      type: 'line',
      sourceId: 'animated-line-0',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': ['get', 'color'],
        'line-width': ['get', 'count'],
        'line-opacity': 0.7,
      },
    })
  })

  it('does not render if line index is not equal to current index', () => {
    const line = lineString([
      [-76.091308, 18.427501],
      [-76.695556, 18.729501],
    ])
    const currentIndex = 1
    const lineIndex = 0

    render(
      <AnimatedArc
        line={line}
        currentIndex={currentIndex}
        lineIndex={lineIndex}
      />
    )

    expect(mockSource.mock.calls[0]).toBeFalsy()
    expect(mockLayer.mock.calls[0]).toBeFalsy()
  })
})

describe('Animated Arc memo check test suite', () => {
  it('returns true when currentIndex equal to 0', () => {
    const prevProps = {
      otherProps: 'any',
    }
    const nextProps = {
      otherProps: 'any',
      currentIndex: 0,
      lineIndex: 1,
    }

    expect(areEqual(prevProps, nextProps)).toBe(false)
  })

  it('returns true when currentIndex equal to lineIndex', () => {
    const prevProps = {
      otherProps: 'any',
    }
    const nextProps = {
      otherProps: 'any',
      currentIndex: 1,
      lineIndex: 1,
    }

    expect(areEqual(prevProps, nextProps)).toBe(false)
  })

  it('returns false', () => {
    const prevProps = {
      otherProps: 'any',
    }
    const nextProps = {
      otherProps: 'any',
      currentIndex: 2,
      lineIndex: 1,
    }

    expect(areEqual(prevProps, nextProps)).toBe(true)
  })
})
