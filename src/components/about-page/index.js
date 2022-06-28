import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ReactMarkdown from 'react-markdown'
import isEmpty from 'lodash/isEmpty'
import toUpper from 'lodash/toUpper'
import noop from 'lodash/noop'

import './about-page.scss'
import Accordion from 'components/common/accordion/accordion'

const AboutPage = (props) => {
  const { cms, qAA, fetchQAA } = props

  useEffect(() => {
    fetchQAA()
  }, [])

  return (
    <div className='about-page'>
      <div className='summary'>
        <div className='title'>About LLEAD</div>
        <ReactMarkdown className='content'>{cms.summary}</ReactMarkdown>
      </div>

      {!isEmpty(qAA) &&
        qAA.map((group, index) => (
          <div key={index} className='section'>
            <div className='section-name'>{toUpper(group.section)}</div>
            <div className='question'>
              {group.qAndA.map(({ question, answer }, index) => (
                <Accordion key={index} title={question} content={answer} />
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

AboutPage.propTypes = {
  cms: PropTypes.object,
  qAA: PropTypes.array,
  fetchQAA: PropTypes.func,
}

AboutPage.defaultProps = {
  cms: {},
  qAA: [],
  fetchQAA: noop,
}

export default AboutPage
