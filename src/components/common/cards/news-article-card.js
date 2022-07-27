import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import noop from 'lodash/noop'

import './news-article-card.scss'
import OuterLink from 'components/common/links/outer-link'
import { RECENT_ITEM_TYPES } from 'constants/common'
import RemoveSVG from 'assets/icons/remove.svg'

const NewsArticleCard = (props) => {
  const {
    id,
    title,
    url,
    publishedDate,
    sourceName,
    removeRecentItem,
    saveRecentItem,
    className,
    recentData,
    hidable,
    hideNewsArticle,
  } = props

  const [isCardHidden, setIsCardHidden] = useState(false)
  const [isHideConfirmation, setIsHideConfirmation] = useState(false)

  const handleClick = () => {
    saveRecentItem({
      type: RECENT_ITEM_TYPES.NEWS_ARTICLE,
      id: id,
      data: recentData,
    })
  }

  const toggleHideConfirmation = (e) => {
    e.stopPropagation()
    setIsHideConfirmation(!isHideConfirmation)
  }

  const handleHideConfirmClick = (e) => {
    e.stopPropagation()
    hideNewsArticle(id)
    setIsCardHidden(true)
  }

  return (
    <OuterLink
      href={url}
      className={cx('news-article-card', className, {
        hidden: isCardHidden,
      })}
      onClick={handleClick}
      removeRecentItem={removeRecentItem}
      removeData={{
        id,
        type: RECENT_ITEM_TYPES.NEWS_ARTICLE,
      }}
      isDisabled={isHideConfirmation}
    >
      <div className='news-article-info'>
        <div className='news-article-type'>news article</div>
        {hidable && (
          <img
            className='hide-btn'
            src={RemoveSVG}
            onClick={toggleHideConfirmation}
          />
        )}
        <div className='news-article-preview-container'>
          <div className='news-article-preview' />
        </div>
        <div className='news-article-title'>{title}</div>
      </div>
      <div className='news-article-card-footer'>
        <div className='news-article-subtitle'>{sourceName}</div>
        <div className='news-article-subtitle'>{publishedDate}</div>
      </div>
      {isHideConfirmation && (
        <div className='hide-backdrop'>
          <div className='hide-comfirmation'>
            <div className='confirmation-text'>
              Are you sure you want to delete this article?
            </div>
            <div className='btn-group'>
              <div className='cancel-btn' onClick={toggleHideConfirmation}>
                Cancel
              </div>
              <div className='delete-btn' onClick={handleHideConfirmClick}>
                Delete
              </div>
            </div>
          </div>
        </div>
      )}
    </OuterLink>
  )
}

NewsArticleCard.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  publishedDate: PropTypes.string,
  sourceName: PropTypes.string,
  removeRecentItem: PropTypes.func,
  saveRecentItem: PropTypes.func,
  className: PropTypes.string,
  recentData: PropTypes.object,
  hidable: PropTypes.bool,
  hideNewsArticle: PropTypes.func,
}

NewsArticleCard.defaultProps = {
  title: '',
  url: '',
  publishedDate: '',
  sourceName: '',
  className: '',
  recentData: {},
  hideNewsArticle: noop,
}

export default NewsArticleCard
