import React from 'react'
import PropTypes from 'prop-types'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const DocumentHead = (props) => {
  const { documentHead } = props

  const { title } = documentHead

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </HelmetProvider>
  )
}

DocumentHead.propTypes = {
  documentHead: PropTypes.object,
}

export default DocumentHead
