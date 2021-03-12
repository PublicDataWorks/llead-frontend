import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import noop from 'lodash/noop'

import SearchSVG from 'assets/icons/search.svg'
import DocumentItem from 'components/common/items/document-item'
import Button from 'components/common/buttons/button'
import Input from 'components/common/inputs/input'

const DepartmentDocuments = (props) => {
  const {
    departmentId,
    documents,
    fetchDocuments,
    count,
    limit,
    offset,
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
      <div className='department-documents-title'>Documents ({count})</div>
      <Input
        iconSrc={SearchSVG}
        placeholder='Search by name, department, or keyword'
        onChange={handleSearch}
        value={departmentSearchQuery}
        className='search-input'
      />
      <div className='department-documents-listview'>
        {map(documents, ({ id, ...rest }) => (
          <DocumentItem key={id} {...rest} />
        ))}
      </div>

      <div className='department-documents-count'>
        {documents.length} of {count}
        {isEmpty(departmentSearchQuery) ? ' documents ' : ' search results  '}
        displayed
      </div>
      {offset && (
        <Button
          className='department-documents-loadmore'
          onClick={loadMoreDocuments}
        >
          Load {limit} more
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
}

DepartmentDocuments.defaultProps = {
  documents: [],
  searchResults: [],
  fetchDocuments: noop,
}

export default DepartmentDocuments
