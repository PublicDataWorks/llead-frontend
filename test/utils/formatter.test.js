import {
  formatDocumentDate,
  formatNumber,
  stringifyTotalItems,
  formatDataPeriods,
} from 'utils/formatter'

describe('#formatDocumentDate', () => {
  it('returns empty on invalidDate', () => {
    const dateString = formatDocumentDate('adsfads')
    expect(dateString).toBe('')
  })

  it('returns formatted date string', () => {
    const dateString = formatDocumentDate('2020-01-06')
    expect(dateString).toEqual('Jan 6, 2020')
  })

  it('returns emtpy on empty date', () => {
    const dateString = formatDocumentDate('')
    expect(dateString).toBe('')
  })
})

describe('#formatNumber', () => {
  it('returns 0 value if input is not a number', () => {
    const localeNumber = formatNumber('not-a-number')
    expect(localeNumber).toEqual('0')
  })

  it('returns locale number string if input is a number', () => {
    const localeNumber = formatNumber('123456789.123')
    expect(localeNumber).toEqual('123,456,789')
  })
})

describe('#stringifyTotalItems', () => {
  it('returns stringified plural item name and count', () => {
    const stringifiedItem = stringifyTotalItems(123456, 'document')

    expect(stringifiedItem).toEqual('123,456 documents')
  })

  it('returns stringified singular item name and count', () => {
    const stringifiedItem = stringifyTotalItems(1, 'document')
    expect(stringifiedItem).toEqual('1 document')
  })
})

describe('#formatDataPeriods', () => {
  it('formatted data period with comma and "and"', () => {
    const formattedItem = formatDataPeriods(['123', '456-789', '1012'])

    expect(formattedItem).toEqual('123, 456-789 and 1012')
  })
})
