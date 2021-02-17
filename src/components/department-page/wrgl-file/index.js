import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import cx from 'classnames'
import indexOf from 'lodash/indexOf'

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

  return (
    <div className={cx('wrgl-container', { 'wrgl-expanded': isExpanded })}>
      <div
        onClick={handleClick}
        className='wrgl-header'
        data-testid='expand--control'
      >
        <span className='wrgl-arrow' />
        <div className='wrgl-name'>{name}</div>
        <a
          className='wrgl-download'
          href={downloadUrl}
          onClick={(event) => event.stopPropagation()}
        >
          Download .csv
        </a>
      </div>
      <div className='wrgl-content'>
        <div
          className={cx('wrgl-description', {
            'wrgl-description-expanded': isDescriptionExpanded,
          })}
        >
          <ReactMarkdown>{description}</ReactMarkdown>
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
