import { snakeToCamel } from 'utils/tools'

describe('#snakeToCamel', () => {
  it('must return normal value', () => {
    const value = '123'

    const expectedValue = '123'

    const parseValue = snakeToCamel(value)

    expect(parseValue).toStrictEqual(expectedValue)
  })

  it('must parse object', () => {
    const snakeObj = {
      normal_attribute: '123',
    }

    const expectedObj = {
      normalAttribute: '123',
    }

    const obj = snakeToCamel(snakeObj)

    expect(obj).toStrictEqual(expectedObj)
  })

  it('must parse array object', () => {
    const snakeObj = [
      {
        normal_attribute: '123',
      },
    ]

    const expectedObj = [
      {
        normalAttribute: '123',
      },
    ]

    const obj = snakeToCamel(snakeObj)

    expect(obj).toStrictEqual(expectedObj)
  })

  it('must parse nested object', () => {
    const snakeObj = {
      normal_attribute: '123',
      nested_attribute: {
        child_attribute: 'value',
      },
    }

    const expectedObj = {
      normalAttribute: '123',
      nestedAttribute: {
        childAttribute: 'value',
      },
    }

    const obj = snakeToCamel(snakeObj)

    expect(obj).toStrictEqual(expectedObj)
  })

  it('must parse nested array  object', () => {
    const snakeObj = {
      normal_attribute: '123',
      nested_attribute: [
        {
          child_attribute: 'value',
        },
      ],
    }

    const expectedObj = {
      normalAttribute: '123',
      nestedAttribute: [
        {
          childAttribute: 'value',
        },
      ],
    }

    const obj = snakeToCamel(snakeObj)

    expect(obj).toStrictEqual(expectedObj)
  })
})
