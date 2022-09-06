import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import map from 'lodash/map'

import './officer-item.scss'
import { officerPath } from 'utils/paths'
import CustomLink from 'components/common/links/custom-link'

const OfficerItem = (props) => {
  const { id, name, departments, onItemClick } = props

  const departmentNames = map(departments, 'name', []).join(' | ')

  return (
    <CustomLink to={officerPath(id, name)} onClick={onItemClick}>
      <div className='officer-item'>
        <div className='officer-item-department'>
          Police Officer | {departmentNames}
        </div>
        <div className='officer-item-name'>{name}</div>
      </div>
    </CustomLink>
  )
}

OfficerItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  departments: PropTypes.array,
  onItemClick: PropTypes.func,
}

OfficerItem.defaultProps = {
  name: '',
  departments: [],
  onItemClick: noop,
}

export default OfficerItem
