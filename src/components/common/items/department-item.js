import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import './department-item.scss'
import { departmentPath } from 'utils/paths'
import CustomLink from 'components/common/links/custom-link'

const DepartmentItem = (props) => {
  const { id, name, parish, onItemClick } = props

  return (
    <CustomLink to={departmentPath(id)} onClick={onItemClick}>
      <div className='department-item'>
        <div className='department-item-parish'>
          Agency {parish ? '|' : ''} <span>{parish}</span>
        </div>
        <div className='department-item-name'>{name}</div>
      </div>
    </CustomLink>
  )
}

DepartmentItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  parish: PropTypes.string,
  onItemClick: PropTypes.func,
}

DepartmentItem.defaultProps = {
  id: '',
  name: '',
  parish: '',
  onItemClick: noop,
}

export default DepartmentItem
