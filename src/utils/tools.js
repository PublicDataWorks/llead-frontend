import { createSelectorCreator, defaultMemoize } from 'reselect'
import isObject from 'lodash/isObject'
import forIn from 'lodash/forIn'
import camelCase from 'lodash/camelCase'
import isArray from 'lodash/isArray'
import map from 'lodash/map'
import isEqual from 'lodash/isEqual'

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
)

export const snakeToCamel = (data) => {
  if (isArray(data)) {
    return map(data, (item) => snakeToCamel(item))
  } else if (isObject(data)) {
    const camelObj = {}
    forIn(data, (value, key) => {
      const newValue = snakeToCamel(value)
      const newKey = camelCase(key)
      camelObj[newKey] = newValue
    })
    return camelObj
  } else {
    return data
  }
}
