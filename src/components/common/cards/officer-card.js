import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'
import startCase from 'lodash/startCase'
import noop from 'lodash/noop'

import './officer-card.scss'
import OfficerBadges from 'components/common/items/officer-badges'
import { departmentPath, officerPath } from 'utils/paths'
import CustomLink from '../links/custom-link'

const OfficerCard = (props) => {
  const { id, name, badges, department, className, onItemClick } = props

  return (
    <CustomLink
      className={cx('officer-card', className)}
      to={officerPath(id)}
      onClick={onItemClick}
    >
      <div className='officer-info'>
        <div className='officer-type'>Police Officer</div>
        <div className='officer-name'>{startCase(name)}</div>
        <OfficerBadges badges={badges} />
      </div>
      <div className='officer-card-footer'>
        {!isEmpty(department) && (
          <CustomLink
            to={departmentPath(department.id)}
            className='officer-department-name'
          >
            {department.name}
          </CustomLink>
        )}
      </div>
    </CustomLink>
  )
}

OfficerCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  badges: PropTypes.array,
  department: PropTypes.object,
  className: PropTypes.string,
  onItemClick: PropTypes.func,
}

OfficerCard.defaultProps = {
  badges: [],
  department: {},
  className: '',
  onItemClick: noop,
}

export default OfficerCard
