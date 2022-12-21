import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './information-box.scss'
import MigratoryInformationTable from './information-table'

const MigratoryInformationBox = (props) => {
  const { information } = props
  const { years, left, join } = information

  const [isInfoTableOpen, setIsInfoTableOpen] = useState(false)
  const [isLeft, setIsLeft] = useState()

  const handleInfoBoxOnClick = (isLeft) => {
    setIsLeft(isLeft)
    setIsInfoTableOpen(true)
  }

  return (
    <>
      <div className='migratory-information-box'>
        <div className='migratory-year'>{years}</div>
        <div
          className='migratory-row migratory-join'
          onClick={() => handleInfoBoxOnClick(false)}
        >
          Officers joining from other agencies
          <div className='migratory-join-count'>
            <div className='count'>{join.count}</div>
            <div className='info-icon' />
          </div>
        </div>
        <div
          className='migratory-row migratory-left'
          onClick={() => handleInfoBoxOnClick(true)}
        >
          Officers leaving to join other agencies
          <div className='migratory-left-count'>
            <div className='count'>{left.count}</div>
            <div className='info-icon' />
          </div>
        </div>
      </div>
      <MigratoryInformationTable
        isLeft={isLeft}
        isShowing={isInfoTableOpen}
        migratoryInformation={isLeft ? left : join}
        closeInformationTable={() => setIsInfoTableOpen(false)}
      />
    </>
  )
}

MigratoryInformationBox.propTypes = {
  information: PropTypes.object,
}

MigratoryInformationBox.defaultProps = {
  information: {},
}

export default MigratoryInformationBox
