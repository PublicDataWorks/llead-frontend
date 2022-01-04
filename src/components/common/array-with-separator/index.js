import React from 'react'
import PropTypes from 'prop-types'
import reduce from 'lodash/reduce'

const ArrayWithSeparator = (props) => {
  const { items, separator, isEllipsis } = props

  return (
    <>
      {reduce(items, (acc, element) => [acc, separator, element])}
      {isEllipsis && ' ...'}
    </>
  )
}

ArrayWithSeparator.propTypes = {
  items: PropTypes.array,
  separator: PropTypes.string,
  isEllipsis: PropTypes.bool,
}

ArrayWithSeparator.defaultProps = {
  items: [],
  separator: '',
  isEllipsis: false,
}

export default ArrayWithSeparator
