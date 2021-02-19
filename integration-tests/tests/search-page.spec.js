import { appConfigData } from '../data/common-data'
import { firstSearchData, secondSearchData } from '../data/search-page-data'

describe('Search Page', () => {
  it('redirect to login when not logged in', () => {
    cy.visit('/search')

    cy.location('pathname').should('eq', '/login/')
  })

  describe('render successfully', () => {
    beforeEach(() => {
      cy.login()
      cy.intercept(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/app-config/',
        },
        appConfigData
      )
      cy.intercept(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/search',
          query: { q: 'ba' },
        },
        firstSearchData
      )

      cy.intercept(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/search',
          query: { q: 'baton' },
        },
        secondSearchData
      )
    })

    it('redirect to search when type in input from homepage', () => {
      cy.visit('/')

      cy.location('pathname').should('eq', '/')
      cy.get('.search-input-container').find('.input-field').should('exist')

      cy.get('.search-input-container').find('.input-field').type('f')
      cy.location('pathname').should('eq', '/search/')
    })

    it('render blank search page', () => {
      cy.visit('/search')

      cy.location('pathname').should('eq', '/search')
      cy.get('.search-input-container').find('.input-field').should('exist')
    })

    it('renders found items', () => {
      cy.viewport(1000, 1200)
      cy.visit('/search')

      cy.get('.search-input-container')
        .find('.input-field')
        .as('searchBox')
        .should('exist')

      cy.get('.departments-carousel').should('not.exist')
      cy.get('.officers-carousel').should('not.exist')

      cy.get('@searchBox').type('ba')

      cy.get('.departments-carousel')
        .find('.carousel-title')
        .should('text', 'Departments')
      cy.get('.departments-carousel')
        .find('.swiper-slide')
        .as('departmentSlides')
        .should('length', 3)
      cy.get('@departmentSlides').eq(0).contains('Baton Rouge Department 1')
      cy.get('@departmentSlides').eq(1).contains('New Orleans Department 1')
      cy.get('@departmentSlides').eq(2).contains('Baton Rouge Department 2')
      cy.get('.officers-carousel')
        .find('.carousel-title')
        .should('text', 'Officers')
      cy.get('.officers-carousel')
        .find('.swiper-slide')
        .as('officersSlides')
        .should('length', 4)
      cy.get('@officersSlides').eq(0).contains('Mark Carlson')
      cy.get('@officersSlides').eq(1).contains('Eric Patel')
      cy.get('@officersSlides').eq(2).contains('Lee Allen')
      cy.get('@officersSlides').eq(3).contains('Tina Holder')
      cy.get('.documents-list')
        .find('.documents-list-title')
        .should('text', 'Documents')
      cy.get('.documents-list')
        .find('.document-item')
        .as('documentItems')
        .should('length', 3)
      cy.get('@documentItems').eq(0).contains('Her hard step sea.')
      cy.get('@documentItems')
        .eq(0)
        .find('.document-item-text-content')
        .contains('Text content')
      cy.get('@documentItems')
        .eq(1)
        .contains('Yourself say language meeting ok.')
      cy.get('@documentItems')
        .eq(2)
        .contains('Be decade those someone tough year sing.')

      cy.get('@searchBox').type('ton')

      cy.get('.departments-carousel')
        .find('.carousel-title')
        .should('text', 'Departments')
      cy.get('.departments-carousel')
        .find('.swiper-slide')
        .as('departmentSlides')
        .should('length', 2)
      cy.get('@departmentSlides').eq(0).contains('New Orleans Department 2')
      cy.get('@departmentSlides').eq(1).contains('New Orleans Department 3')
      cy.get('.officers-carousel')
        .find('.carousel-title')
        .should('text', 'Officers')
      cy.get('.officers-carousel')
        .find('.swiper-slide')
        .as('officersSlides')
        .should('length', 1)
      cy.get('@officersSlides').eq(0).contains('Kelly Hunt')
      cy.get('.documents-list')
        .find('.documents-list-title')
        .should('text', 'Documents')
      cy.get('.documents-list')
        .find('.document-item')
        .as('documentItems')
        .should('length', 3)
      cy.get('@documentItems')
        .eq(0)
        .contains('Face growth poor wait follow option better.')
      cy.get('@documentItems')
        .eq(0)
        .find('.document-item-text-content')
        .should('text','...Text content highlight...')
        .get('em')
        .should('text', 'highlight')
      cy.get('@documentItems').eq(1).contains('Performance past from.')
      cy.get('@documentItems')
        .eq(2)
        .contains('Mouth trip too finally society smile man.')

      cy.get('@searchBox').clear()
      cy.get('.departments-carousel').should('not.exist')
      cy.get('.officers-carousel').should('not.exist')
    })
  })
})
