import {
  formatDate,
  formatNumber,
  stringifyTotalItems,
  formatDataPeriods,
  formatTimelineDate,
  formatSalary,
} from 'utils/formatter'

describe('#formatDate', () => {
  it('returns empty on invalidDate', () => {
    const dateString = formatDate('adsfads')
    expect(dateString).toBe('')
  })

  it('returns formatted date string', () => {
    const dateString = formatDate('2020-01-06')
    expect(dateString).toEqual('Jan 6, 2020')
  })

  it('returns emtpy on empty date', () => {
    const dateString = formatDate('')
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

describe('#formatTimelineDate', () => {
  it('formatted timeline with year only', () => {
    const dateString = formatTimelineDate('1980')

    expect(dateString).toEqual('1980')
  })

  it('formatted timeline with full date string', () => {
    const dateString = formatTimelineDate('1980-12-20')

    expect(dateString).toEqual('Dec 20, 1980')
  })

  it('formatted timeline with empty date string', () => {
    const dateString = formatTimelineDate('')

    expect(dateString).toEqual('No Date')
  })

  it('formatted timeline with invalid date string', () => {
    const dateString = formatTimelineDate('abcsadsf')

    expect(dateString).toEqual('No Date')
  })
})

describe('#formatSalary', () => {
  it('formats annual salary', () => {
    const salary = formatSalary('1900531.231', 'yearly')
    expect(salary).toEqual('$1,900,531.23/year')
  })

  it('formats hourly salary', () => {
    const salary = formatSalary('29.1450', 'hourly')
    expect(salary).toEqual('$29.15/hour')
  })

  it('returns salary with default frequence if salaryFreq does not match patterns', () => {
    const salary = formatSalary('29.1450', 'daily')
    expect(salary).toEqual('$29.15 daily')
  })

  it('returns salary only if salaryFreq does not exist', () => {
    const salary = formatSalary('29.1450')
    expect(salary).toEqual('$29.15')
  })

  it('returns empty if salary does not exist', () => {
    const salary = formatSalary(null, null)
    expect(salary).toEqual('')
  })
})
