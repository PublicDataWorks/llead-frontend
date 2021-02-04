import React from 'react'
import PropTypes from 'prop-types'
import reduce from 'lodash/reduce'

const ArrayWithSeparator = (props) => {
  const { items, separator } = props
  return <>{reduce(items, (acc, element) => [acc, separator, element])}</>
}

ArrayWithSeparator.propTypes = {
  items: PropTypes.array,
  separator: PropTypes.string,
}

ArrayWithSeparator.defaultProps = {
  items: [],
  separator: '',
}

export default ArrayWithSeparator
