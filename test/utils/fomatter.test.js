import { formatDocumentDate } from 'utils/formatter'

describe('#formatDocumentDate', () => {
  it('returns empty on invalidDate', () => {
    const dateString = formatDocumentDate('adsfads')
    expect(dateString).toBe('')
  })

  it('returns formatted date string', () => {
    const dateString = formatDocumentDate('2020-01-06')
    expect(dateString).toEqual('Jan 6, 2020')
  })
})
