import { analyzeExpandEventCard } from 'utils/google-analytics'

describe('#analyzeExpandEventCard', () => {
  const mockGtag = jest.fn()

  beforeEach(() => {
    mockGtag.mockClear()

    const originalWindow = { ...window }
    const windowSpy = jest.spyOn(global, 'window', 'get')
    windowSpy.mockImplementation(() => ({
      ...originalWindow, // In case you need other window properties to be in place
      gtag: mockGtag,
    }))
  })

  it('calls gtag event', () => {
    const eventCard = {
      type: 'card type',
      id: 'card id',
    }

    analyzeExpandEventCard(eventCard)

    expect(mockGtag).toHaveBeenCalledWith('event', 'card_expand', {
      category: 'card type',
      'card type': 'card id',
    })
  })
})
