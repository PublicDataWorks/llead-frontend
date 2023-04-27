import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import './findings.scss'
import Button from 'components/common/buttons/button'
import { FINDINGS_PAGE } from 'constants/paths'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'

const Findings = (props) => {
  const { fetchFindings, findings } = props

  const toFindingsPage = () => {
    location.href = FINDINGS_PAGE
  }

  const {
    backgroundImageUrl,
    title,
    description,
    cardImageUrl,
    cardTitle,
    cardAuthor,
    cardDepartment,
  } = findings

  useEffect(() => {
    fetchFindings()
  }, [])

  return (
    !isEmpty(findings) && (
      <div
        className='findings'
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className='findings-intro'>
          <div className='findings-title'>{title}</div>
          <div className='findings-description'>{description}</div>
          <Button className='findings-readmore' onClick={toFindingsPage}>
            Read more
          </Button>
        </div>
        <div className='findings-card'>
          <div className='findings-card-layer1'>
            <div className='findings-card-layer1-body'>
              <img src={cardImageUrl} className='findings-card-layer1-image' />
              <div className='findings-card-layer1-department'>
                {cardDepartment}
              </div>
              <div className='findings-card-layer1-title'>{cardTitle}</div>
            </div>
            <div className='findings-card-layer1-footer'>by {cardAuthor}</div>
          </div>
          <div className='findings-card-layer2'>
            <div className='findings-card-layer2-image' />
          </div>
          <div className='findings-card-layer3'>
            <div className='findings-card-layer3-image' />
          </div>
        </div>
      </div>
    )
  )
}

Findings.propTypes = {
  findings: PropTypes.object,
  fetchFindings: PropTypes.func,
}

Findings.defaultProps = {
  findings: {},
  fetchFindings: noop,
}

export default Findings
