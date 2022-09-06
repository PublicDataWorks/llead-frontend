import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'
import mapValues from 'lodash/mapValues'

import './front-page.scss'
import DepartmentsCarousel from 'components/common/carousel/departments-carousel'
import OfficersCarousel from 'components/common/carousel/officers-carousel'
import DocumentsCarousel from 'components/common/carousel/documents-carousel'
import NewsArticlesCarousel from 'components/common/carousel/news-articles-carousel'
import Input from 'components/common/inputs/input'
import RecentItemsCarousel from './recent-items-carousel'
import MigratoryPatternMap from './migratory-map'
import IntroSection from 'containers/front-page/intro-section'
import SearchSVG from 'assets/icons/search.svg'
import { FRONT_PAGE_SECTIONS } from 'constants/common'

const FrontPage = (props) => {
  const {
    isLoggedIn,
    isAdmin,
    cms,
    fetchDepartments,
    fetchOfficers,
    fetchDocuments,
    fetchNewsArticles,
    fetchFrontPageOrders,
    fetchMigratoryData,
    departments,
    officers,
    documents,
    newsArticles,
    saveRecentItem,
    removeRecentItem,
    recentItems,
    frontPageOrders,
    changeSearchQuery,
    hideNewsArticle,
    toggleSearchModal,
  } = props

  const departmentRef = useRef(null)
  const officerRef = useRef(null)
  const documentRef = useRef(null)

  useEffect(() => {
    changeSearchQuery('')
    fetchFrontPageOrders()
    fetchDepartments()
    fetchOfficers()
    fetchDocuments()
    fetchNewsArticles()
    fetchMigratoryData()
  }, [])

  const frontPageOrderClasses = mapValues(
    frontPageOrders,
    (value) => `front-order-10${value}`
  )

  const openSearchModal = () => {
    toggleSearchModal(true)
    document.body.style.overflow = 'hidden'
  }

  return (
    <div className='front-page'>
      <ReactMarkdown className='summary'>{cms.summary}</ReactMarkdown>
      <MigratoryPatternMap />
      <IntroSection />
      <div className='search-container'>
        <Input
          iconSrc={SearchSVG}
          placeholder='Search by name, department, or keyword'
          className='search-input'
          onClick={openSearchModal}
          readOnly
        />
      </div>
      {!isEmpty(recentItems) && (
        <RecentItemsCarousel
          isLoggedIn={isLoggedIn}
          items={recentItems}
          saveRecentItem={saveRecentItem}
          removeRecentItem={removeRecentItem}
          className='front-page-carousel'
        />
      )}
      {!isEmpty(departments) && (
        <div className={frontPageOrderClasses[FRONT_PAGE_SECTIONS.DEPARTMENT]}>
          <div className='section-anchor' ref={departmentRef} />
          <DepartmentsCarousel
            items={departments}
            sortedField='size'
            className='front-page-carousel'
          />
        </div>
      )}
      {!isEmpty(officers) && (
        <div className={frontPageOrderClasses[FRONT_PAGE_SECTIONS.OFFICER]}>
          <div className='section-anchor' ref={officerRef} />
          <OfficersCarousel
            items={officers}
            sortedField='most allegations'
            className='front-page-carousel'
          />
        </div>
      )}
      {!isEmpty(newsArticles) && (
        <div
          className={frontPageOrderClasses[FRONT_PAGE_SECTIONS.NEWS_ARTICLE]}
        >
          <div className='section-anchor' />
          <NewsArticlesCarousel
            items={newsArticles}
            saveRecentItem={saveRecentItem}
            sortedField='most recently added'
            className='front-page-carousel'
            isAdmin={isAdmin}
            hideNewsArticle={hideNewsArticle}
          />
        </div>
      )}
      {!isEmpty(documents) && (
        <div className={frontPageOrderClasses[FRONT_PAGE_SECTIONS.DOCUMENT]}>
          <div className='section-anchor' ref={documentRef} />
          <DocumentsCarousel
            items={documents}
            saveRecentItem={saveRecentItem}
            sortedField='most recently added'
            className='front-page-carousel'
          />
        </div>
      )}
    </div>
  )
}

FrontPage.propTypes = {
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
  cms: PropTypes.object,
  departments: PropTypes.array,
  officers: PropTypes.array,
  documents: PropTypes.array,
  newsArticles: PropTypes.array,
  recentItems: PropTypes.array,
  frontPageOrders: PropTypes.object,
  fetchDepartments: PropTypes.func,
  fetchOfficers: PropTypes.func,
  fetchDocuments: PropTypes.func,
  fetchNewsArticles: PropTypes.func,
  fetchFrontPageOrders: PropTypes.func,
  fetchMigratoryData: PropTypes.func,
  saveRecentItem: PropTypes.func,
  removeRecentItem: PropTypes.func,
  changeSearchQuery: PropTypes.func,
  hideNewsArticle: PropTypes.func,
  toggleSearchModal: PropTypes.func,
}

FrontPage.defaultProps = {
  isAdmin: false,
  cms: {},
  departments: [],
  officers: [],
  documents: [],
  newsArticles: [],
  recentItems: [],
  frontPageOrders: {},
  fetchDepartments: noop,
  fetchOfficers: noop,
  fetchDocuments: noop,
  fetchNewsArticles: noop,
  fetchFrontPageOrders: noop,
  fetchMigratoryData: noop,
  saveRecentItem: noop,
  changeSearchQuery: noop,
  hideNewsArticle: noop,
  toggleSearchModal: noop,
}

export default FrontPage
