import { formatDocumentDate, formatNumber } from 'utils/formatter'

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

describe('formatNumber', () => {
  it('returns 0 value if input is not a number', () => {
    const localeNumber = formatNumber('not-a-number')
    expect(localeNumber).toEqual('0')
  })

  it('returns locale number string if input is a number', () => {
    const localeNumber = formatNumber('123456789.123')
    expect(localeNumber).toEqual('123,456,789')
  })
})
