import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import qs from 'qs'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import compact from 'lodash/compact'
import filter from 'lodash/filter'
import concat from 'lodash/concat'

import './department-page.scss'
import Header from 'pages/common/header'
import Footer from 'components/common/footer'
import WRGLFile from './wrgl-file'

const Department = (props) => {
  const { department, fetchDepartment } = props
  const { id } = useParams()
  const [expandedCsvFiles, setExpandedCsvFiles] = useState([])
  const location = useLocation()
  const history = useHistory()

  const {
    city,
    complaintsCount,
    documentsCount,
    locationMapUrl,
    name,
    officersCount,
    parish,
    wrglFiles,
  } = department

  const elementStyles = isEmpty(locationMapUrl)
    ? {}
    : { backgroundImage: `url(${locationMapUrl})` }

  useEffect(() => {
    fetchDepartment(id)
  }, [id])

  useEffect(() => {
    const parsedSearch = qs.parse(location.search, {
      ignoreQueryPrefix: true,
      comma: true,
    })
    const { csv } = parsedSearch

    if (isEmpty(csv)) {
      const defaultExpandedCsvFiles = map(
        filter(wrglFiles, 'defaultExpanded'),
        'slug'
      )
      setExpandedCsvFiles(defaultExpandedCsvFiles)
    } else if (isString(csv)) {
      setExpandedCsvFiles([csv])
    } else {
      setExpandedCsvFiles(csv)
    }
  }, [wrglFiles])

  const updateExpandedCsvFiles = (slug, isExpanded) => {
    const parsedSearch = qs.parse(location.search, {
      ignoreQueryPrefix: true,
      comma: true,
    })

    let newExpandedCsvFiles
    if (isExpanded) {
      newExpandedCsvFiles = compact(
        filter(expandedCsvFiles, (item) => item !== slug)
      )
    } else {
      newExpandedCsvFiles = compact(concat(expandedCsvFiles, [slug]))
    }
    history.push({
      search: qs.stringify(
        { ...parsedSearch, csv: newExpandedCsvFiles },
        { arrayFormat: 'comma', encode: false }
      ),
    })
    setExpandedCsvFiles(newExpandedCsvFiles)
  }

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
            <div className='department-wrgl-files'>
              {map(wrglFiles, ({ id, ...rest }) => (
                <WRGLFile
                  key={id}
                  {...rest}
                  expandedCsvFiles={expandedCsvFiles}
                  updateExpandedCsvFiles={updateExpandedCsvFiles}
                />
              ))}
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
