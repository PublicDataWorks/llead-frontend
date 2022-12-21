import { MAP_HIGHLIGHTED_LINE_COLOR, MAP_LINE_COLOR } from 'constants/common'
import { createCurvedLine, createMapCurvedLine } from 'utils/curved-line'

describe('#curvedLine', () => {
  it('returns curved line from 2 points', () => {
    const result = createCurvedLine([0, 0], [1, 1])

    const expectedResult = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: expect.any(Array),
      },
    }

    expect(result).toMatchObject(expectedResult)
  })
})

describe('#createMapCurvedLine', () => {
  it('returns curved line of left movement', () => {
    const graph = {
      count: 1,
      startNode: 'new-orleans-pd',
      startLocation: [-90.0701, 29.9499],
      endNode: 'southern-br-university-pd',
      endLocation: [-91.191113, 30.5255956],
      isLeft: true,
    }
    const result = createMapCurvedLine(graph)

    const expectedResult = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: expect.any(Array),
      },
      properties: {
        count: 1,
        color: MAP_HIGHLIGHTED_LINE_COLOR,
      },
    }

    expect(result).toMatchObject(expectedResult)
  })

  it('returns curved line of join movement', () => {
    const graph = {
      count: 1,
      startNode: 'new-orleans-pd',
      startLocation: [-90.0701, 29.9499],
      endNode: 'southern-br-university-pd',
      endLocation: [-91.191113, 30.5255956],
      isLeft: false,
    }
    const result = createMapCurvedLine(graph)

    const expectedResult = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: expect.any(Array),
      },
      properties: {
        count: 1,
        color: MAP_LINE_COLOR,
      },
    }

    expect(result).toMatchObject(expectedResult)
  })
})
