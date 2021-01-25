import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

const Document = (props) => {
  const { document, fetchDocument } = props
  const { id } = useParams()

  useEffect(() => {
    fetchDocument(id)
  }, [id])

  return (
    <div>
      <h2>DOCUMENT {document.id}</h2>
      <div>Title: {document.title}</div>
    </div>
  )
}

Document.propTypes = {
  document: PropTypes.object,
  fetchDocument: PropTypes.func,
}

Document.defaultProps = {
  document: {},
  fetchDocument: noop,
}

export default Document
