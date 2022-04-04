import sinon from 'sinon'

beforeEach(() => {
  sinon.restore()
})

jest.mock('mapbox-gl/dist/mapbox-gl')
