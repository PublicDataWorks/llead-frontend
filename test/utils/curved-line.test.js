import { createCurvedLine } from 'utils/curved-line'

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
