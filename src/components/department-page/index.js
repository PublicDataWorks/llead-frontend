import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import qs from 'qs'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import reduce from 'lodash/reduce'
import isString from 'lodash/isString'
import compact from 'lodash/compact'
import filter from 'lodash/filter'
import concat from 'lodash/concat'

import './department-page.scss'
import Header from 'pages/common/header'
import Footer from 'components/common/footer'
import WRGLFile from './wrgl-file'
import Button from 'components/common/buttons/button'
import DocumentCard from 'components/common/cards/document-card'

const Department = (props) => {
  const {
    department,
    fetchDepartment,
    documents,
    fetchDocuments,
    count,
    limit,
    offset,
    isRequesting,
  } = props
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
    dataPeriod,
  } = department

  const elementStyles = isEmpty(locationMapUrl)
    ? {}
    : { backgroundImage: `url(${locationMapUrl})` }

  const joinedDataPeriod = useMemo(
    () =>
      reduce(dataPeriod, (acc, element, key) => [
        acc,
        key !== dataPeriod.length - 1 ? ', ' : ' and ',
        element,
      ]),
    [dataPeriod]
  )

  const handleLoadMore = () => {
    fetchDocuments(id, { limit, offset })
  }

  useEffect(() => {
    fetchDepartment(id)
    fetchDocuments(id)
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
          {!isRequesting && !isEmpty(department) && (
            <>
              {!isEmpty(joinedDataPeriod) && (
                <div className='department-period'>
                  Data for this department is limited to the years&nbsp;
                  {joinedDataPeriod}
                </div>
              )}
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

                <div className='department-documents'>
                  <div className='department-documents-title'>
                    Documents ({count})
                  </div>
                  <div className='department-documents-listview'>
                    {map(documents, ({ id, ...rest }) => (
                      <DocumentCard key={id} {...rest} />
                    ))}
                  </div>
                  <div className='department-documents-count'>
                    {documents.length} of {count} documents displayed
                  </div>
                  {offset && (
                    <Button
                      className='department-documents-loadmore'
                      onClick={handleLoadMore}
                    >
                      Load {limit} more
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

Department.propTypes = {
  department: PropTypes.object,
  documents: PropTypes.array,
  fetchDepartment: PropTypes.func,
  fetchDocuments: PropTypes.func,
  count: PropTypes.number,
  limit: PropTypes.number,
  offset: PropTypes.number,
  fetchPagination: PropTypes.func,
  isRequesting: PropTypes.bool,
}

Department.defaultProps = {
  department: {},
  documents: [],
  fetchDepartment: noop,
  fetchDocuments: noop,
  fetchPagination: noop,
  isRequesting: false,
}

export default Department
