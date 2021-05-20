import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import ReactMarkdown from 'react-markdown'
import './footer.scss'

const Footer = ({ cms, setFooterHeight }) => {
  const { text } = cms

  const footerRef = useRef()

  useEffect(() => {
    if (footerRef.current) {
      setFooterHeight(footerRef.current.clientHeight)
    }
  }, [text])

  return (
    <footer className='footer' ref={footerRef}>
      <ReactMarkdown>{text}</ReactMarkdown>
    </footer>
  )
}

Footer.displayName = 'Footer'

Footer.propTypes = {
  cms: PropTypes.object,
  setFooterHeight: PropTypes.func,
}

Footer.defaultProps = {
  cms: {},
  setFooterHeight: noop,
}
export default Footer
