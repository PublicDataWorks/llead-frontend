import React, { useEffect, useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import cx from 'classnames'
import indexOf from 'lodash/indexOf'
import { isMobile } from 'react-device-detect'

import './wrgl-file.scss'

const WRGLFile = (props) => {
  const {
    description,
    downloadUrl,
    name,
    slug,
    url,
    updateExpandedCsvFiles,
    expandedCsvFiles,
  } = props
  const [isExpanded, setExpanded] = useState(false)
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false)
  const [isDescriptionExpandable, setDescriptionExpandable] = useState(false)
  let descriptionRef = useRef()

  const handleClick = () => {
    updateExpandedCsvFiles(slug, isExpanded)
    setExpanded(!isExpanded)
  }

  const handleClickMore = () => {
    setDescriptionExpanded(!isDescriptionExpanded)
  }

  useEffect(() => {
    if (indexOf(expandedCsvFiles, slug) > -1) {
      setExpanded(true)
    }
  }, [expandedCsvFiles])

  useEffect(() => {
    if (descriptionRef.current.clientHeight > 60) {
      setDescriptionExpandable(true)
    }
  }, [description, descriptionRef.current, isExpanded])

  return (
    <div className={cx('wrgl-container', { 'wrgl-expanded': isExpanded })}>
      <div
        onClick={handleClick}
        className='wrgl-header'
        data-testid='test--expand-control'
      >
        <span className='wrgl-arrow' />
        <div className='wrgl-name'>{name}</div>
        <a
          href={downloadUrl}
          className='wrgl-download'
          onClick={(event) => event.stopPropagation()}
        >
          {isMobile ? '' : 'Download .csv'}
        </a>
      </div>
      <div className='wrgl-content'>
        <div
          className={cx('wrgl-description', {
            'wrgl-description-expanded': isDescriptionExpanded,
            'wrgl-description-expandable': isDescriptionExpandable,
          })}
        >
          <div ref={descriptionRef}>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
          <a className='wrgl-description-more-btn' onClick={handleClickMore}>
            ...<span>more</span>
          </a>
        </div>
        <iframe className='wrgl-embed' src={url} />
      </div>
    </div>
  )
}

WRGLFile.propTypes = {
  name: PropTypes.string,
  defaultExpanded: PropTypes.bool,
  description: PropTypes.string,
  downloadUrl: PropTypes.string,
  slug: PropTypes.string,
  url: PropTypes.string,
  updateExpandedCsvFiles: PropTypes.func,
  expandedCsvFiles: PropTypes.array,
}

WRGLFile.defaultProps = {
  name: '',
}

export default WRGLFile
