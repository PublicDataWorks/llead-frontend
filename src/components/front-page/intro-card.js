import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import './intro-card.scss'
import { formatDate, stringifyTotalItems } from 'utils/formatter'

const IntroCard = (props) => {
  const {
    cardIndex,
    content,
    setCardIndex,
    analyticSummary,
    lastCardIndex,
  } = props

  const {
    documentsCount,
    newsArticlesCount,
    officersCount,
    departmentsCount,
  } = analyticSummary

  const today = new Date()
    .toLocaleString('en-CA', { timeZone: 'America/Chicago' })
    .slice(0, 10)
  const listIndex = [...Array(lastCardIndex + 1).keys()]

  const handleClick = (index) => {
    setCardIndex(index)
  }

  const mapAnalyticItems = {
    agencies: departmentsCount,
    officers: officersCount,
    documents: documentsCount,
    'news articles': newsArticlesCount,
  }

  return (
    <div className='intro-card'>
      <div className='layer1'>
        <div className='navigation-bar'>
          {listIndex.map((i) => (
            <div
              key={i}
              className={cx('bar', { highlight: i === cardIndex })}
            />
          ))}
        </div>
        {!isEmpty(content) && (
          <div className='content' onClick={() => handleClick(cardIndex + 1)}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
        {!isEmpty(analyticSummary) && cardIndex === lastCardIndex && (
          <div className='overview'>
            <div className='date'>
              As of {formatDate(today)}, LLEAD includes...
            </div>
            {map(mapAnalyticItems, (itemCount, itemName) => (
              <div className='item' key={itemName}>
                {stringifyTotalItems(itemCount, itemName)}
              </div>
            ))}
          </div>
        )}
        <div className='navigation-button'>
          <div
            className='previous-button'
            disabled={cardIndex === 0}
            onClick={() => handleClick(cardIndex - 1)}
          >
            &nbsp;
          </div>
          <div
            className='next-button'
            disabled={cardIndex === lastCardIndex}
            onClick={() => handleClick(cardIndex + 1)}
          >
            &nbsp;
          </div>
        </div>
      </div>
      <div className='layer2' />
      <div className='layer3' />
    </div>
  )
}

IntroCard.propTypes = {
  cardIndex: PropTypes.number,
  content: PropTypes.string,
  setCardIndex: PropTypes.func,
  analyticSummary: PropTypes.object,
  lastCardIndex: PropTypes.number,
}

IntroCard.defaultProps = {
  content: '',
  analyticSummary: {},
}

export default IntroCard
