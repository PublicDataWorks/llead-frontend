import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import noop from 'lodash/noop'

import FeaturedCarousel from './featured-carousel'
import './department-section.scss'

const DepartmentSection = (props) => {
  const {
    items,
    card: Card,
    title,
    searchModalOnOpen,
    section,
    setItemType,
    saveRecentItem,
  } = props

  const cardItems = map(items, (item) => (
    <Card key={item.id} item={item} saveRecentItem={saveRecentItem} />
  ))

  const onSearchModalClick = () => {
    setItemType(section)
    searchModalOnOpen()
  }

  return (
    <div className='department-section-container' data-testid={title}>
      <div className='carousel-header'>
        <div className='carousel-title'>{title}</div>
        <div className='search-icon' onClick={onSearchModalClick} />
      </div>
      <FeaturedCarousel title={title} cards={cardItems} />
    </div>
  )
}

DepartmentSection.propTypes = {
  items: PropTypes.array,
  card: PropTypes.func,
  title: PropTypes.string,
  searchModalOnOpen: PropTypes.func,
  section: PropTypes.string,
  setItemType: PropTypes.func,
  saveRecentItem: PropTypes.func,
}

DepartmentSection.defaultProps = {
  items: [],
  setItemType: noop,
  saveRecentItem: noop,
}

export default DepartmentSection
