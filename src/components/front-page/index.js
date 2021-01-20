import React from 'react'
import PropTypes from 'prop-types'

import Header from 'components/common/header'
import Footer from 'components/common/footer'
import './front-page.scss'

const FrontPage = (props) => {
  const { cms } = props

  return (
    <>
      <Header />
      <div className='front-page'>
        <div className='content-container'>
          <div
            className='summary'
            data-testid='test--summary'
            dangerouslySetInnerHTML={{ __html: cms.summary }}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}

FrontPage.propTypes = {
  cms: PropTypes.object,
}

FrontPage.defaultProps = {
  cms: {},
}

export default FrontPage
