import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'

import './department-page.scss'
import Header from 'pages/common/header'
import Footer from 'components/common/footer'

const Department = (props) => {
  const { department, fetchDepartment } = props
  const { id } = useParams()

  const {
    city,
    complaintsCount,
    documentsCount,
    locationMapUrl,
    name,
    officersCount,
    parish,
  } = department

  const elementStyles = isEmpty(locationMapUrl)
    ? {}
    : { backgroundImage: `url(${locationMapUrl})` }

  useEffect(() => {
    fetchDepartment(id)
  }, [id])

  return (
    <>
      <Header />
      <div className='department-page'>
        <div className='page-container'>
          <div className='department-content'>
            <div className='department-title'>Police Department</div>
            <div className='department-name'>{name}</div>
            <div className='department-basic-info'>
              <div className='department-map' style={elementStyles} />
              <div className='department-location'>
                <div className='department-city'>{city}</div>
                <div className='department-parish'>{parish}</div>
              </div>
              <div className='department-summary'>
                <div>{officersCount} officers</div>
                <div>{complaintsCount} complaints</div>
                <div>{documentsCount} documents</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

Department.propTypes = {
  department: PropTypes.object,
  fetchDepartment: PropTypes.func,
}

Department.defaultProps = {
  department: {},
  fetchDepartment: noop,
}

export default Department
