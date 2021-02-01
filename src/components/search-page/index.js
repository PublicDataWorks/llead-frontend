import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import noop from 'lodash/noop'
import throttle from 'lodash/throttle'

import './search-page.scss'
import Header from 'pages/common/header'
import Footer from 'components/common/footer'
import DepartmentsCarousel from 'components/common/carousel/departments-carousel'
import OfficersCarousel from 'components/common/carousel/officers-carousel'
import { SEARCH_THROTTLE_TIME_OUT } from 'constants/common'

const SearchPage = (props) => {
  const { searchResults, searchQuery, search } = props
  const { departments, officers } = searchResults

  const searchResultsComponents = [
    { key: 'departments', items: departments, component: DepartmentsCarousel },
    { key: 'officers', items: officers, component: OfficersCarousel },
  ]

  const performSearch = useCallback(
    throttle((query) => {
      search(query)
    }, SEARCH_THROTTLE_TIME_OUT),
    [search]
  )

  useEffect(() => {
    if (!isEmpty(searchQuery)) {
      performSearch(searchQuery)
    }
  }, [searchQuery])

  return (
    <>
      <Header />
      <div className='search-page'>
        {map(
          searchResultsComponents,
          ({ component: Component, key, items }) =>
            !isEmpty(items) && <Component items={items} key={key} />
        )}
      </div>
      <Footer />
    </>
  )
}

SearchPage.propTypes = {
  searchResults: PropTypes.object,
  searchQuery: PropTypes.string,
  search: PropTypes.func,
}

SearchPage.defaultProps = {
  searchResults: {},
  search: noop,
}

export default SearchPage
