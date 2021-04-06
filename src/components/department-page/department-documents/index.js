import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import noop from 'lodash/noop'

import './department-documents.scss'
import SearchSVG from 'assets/icons/search.svg'
import DocumentItem from 'components/common/items/document-item'
import Button from 'components/common/buttons/button'
import Input from 'components/common/inputs/input'
import { formatNumber } from 'utils/formatter'

const DepartmentDocuments = (props) => {
  const {
    departmentId,
    documents,
    fetchDocuments,
    count,
    limit,
    offset,
    saveRecentItem,
  } = props

  const [departmentSearchQuery, setDepartmentSearchQuery] = useState('')

  const handleFetchDocuments = (params = {}) => {
    if (!isEmpty(departmentSearchQuery)) {
      params.q = departmentSearchQuery
    }

    fetchDocuments(departmentId, params)
  }

  const loadMoreDocuments = () => {
    const params = {
      limit,
      offset,
    }
    handleFetchDocuments(params)
  }

  const handleSearch = (event) => {
    setDepartmentSearchQuery(event.target.value)
  }

  useEffect(() => {
    handleFetchDocuments()
  }, [departmentSearchQuery, departmentId])

  return (
    <div className='department-documents'>
      <div className='department-documents-title'>
        Documents ({formatNumber(count)})
      </div>
      <Input
        iconSrc={SearchSVG}
        placeholder='Search Documents'
        onChange={handleSearch}
        value={departmentSearchQuery}
        className='search-input'
      />
      <div className='department-documents-listview'>
        {map(documents, (document) => (
          <DocumentItem
            key={document.id}
            {...document}
            highlighting={!isEmpty(departmentSearchQuery)}
            saveRecentItem={saveRecentItem}
          />
        ))}
      </div>

      <div className='department-documents-count'>
        {formatNumber(documents.length)} of {formatNumber(count)}
        {isEmpty(departmentSearchQuery) ? ' documents ' : ' search results  '}
        displayed
      </div>
      {offset && (
        <Button
          className='department-documents-loadmore'
          onClick={loadMoreDocuments}
        >
          Load {formatNumber(limit)} more
        </Button>
      )}
    </div>
  )
}

DepartmentDocuments.propTypes = {
  departmentId: PropTypes.number,
  departmentSearchQuery: PropTypes.string,
  documents: PropTypes.array,
  fetchDocuments: PropTypes.func,
  count: PropTypes.number,
  limit: PropTypes.number,
  offset: PropTypes.number,
  saveRecentItem: PropTypes.func,
}

DepartmentDocuments.defaultProps = {
  documents: [],
  searchResults: [],
  fetchDocuments: noop,
  saveRecentItem: noop,
}

export default DepartmentDocuments
