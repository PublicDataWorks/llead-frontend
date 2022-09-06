import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import sinon from 'sinon'
import MockStore from 'redux-mock-store'

import App from 'components/app'
import * as ScrollToTop from 'components/common/higher-order/scroll-to-top'
import * as DocumentHead from 'containers/common/document-head'
import * as googleAnalytics from 'utils/google-analytics'
import { EVENT_TYPES } from 'constants/common'
import FrontPage from 'containers/front-page'

jest.mock('containers/front-page', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockFrontPageComponent = () => {
  return <div>Front Page</div>
}

describe('App component', () => {
  beforeAll(() => {
    FrontPage.mockImplementation(MockFrontPageComponent)
  })

  beforeEach(() => {
    FrontPage.mockClear()

    const mockScrollToTopComponent = () => <>ScrollToTop</>
    sinon.stub(ScrollToTop, 'default').get(() => mockScrollToTopComponent)

    const mockDocumentHeadComponent = () => <>Document Head</>
    sinon.stub(DocumentHead, 'default').get(() => mockDocumentHeadComponent)

    sinon.stub(googleAnalytics, 'analyzeAction')
  })

  describe('fetch app config', () => {
    it('should fetch app config', () => {
      const fetchAppConfig = sinon.spy()

      render(
        <Provider store={MockStore()()}>
          <App fetchAppConfig={fetchAppConfig} isAppConfigFetched={false} />
        </Provider>
      )

      expect(fetchAppConfig).toHaveBeenCalled()
    })

    it('should analyze accessed page on accessing app', () => {
      const fetchAppConfig = sinon.spy()

      render(
        <Provider store={MockStore()()}>
          <App fetchAppConfig={fetchAppConfig} isAppConfigFetched={false} />
        </Provider>
      )

      expect(googleAnalytics.analyzeAction).toHaveBeenCalledWith({
        type: EVENT_TYPES.ACCESS_PAGE,
        data: { page: '/' },
      })
    })

    it('should not fetch app config if already fetched', () => {
      const fetchAppConfig = sinon.spy()

      render(
        <Provider store={MockStore()()}>
          <App fetchAppConfig={fetchAppConfig} isAppConfigFetched={true} />
        </Provider>
      )

      expect(fetchAppConfig).not.toHaveBeenCalled()
    })
  })

  describe('unauthorized classname', () => {
    it('should add unauthorized to main-container', () => {
      const container = render(
        <Provider store={MockStore()()}>
          <App isLoggedIn={false} isAppConfigFetched={true} />
        </Provider>
      )

      const { baseElement } = container

      const mainContainer = baseElement.getElementsByClassName(
        'main-container'
      )[0]
      expect(mainContainer.classList.value).toContain('unauthorized')
    })

    it('should not add unauthorized to main-container', () => {
      const container = render(
        <Provider store={MockStore()()}>
          <App isLoggedIn={true} isAppConfigFetched={true} />
        </Provider>
      )

      const { baseElement } = container

      const mainContainer = baseElement.getElementsByClassName(
        'main-container'
      )[0]
      expect(mainContainer.classList.value).not.toContain('unauthorized')
    })
  })

  describe('main-container min-height', () => {
    it('should add min-height style to main-container', () => {
      sinon.stub(HTMLElement.prototype, 'clientHeight').get(() => 150)

      const container = render(
        <Provider store={MockStore()()}>
          <App isAppConfigFetched={true} />
        </Provider>
      )

      const { baseElement } = container

      const mainContainer = baseElement.getElementsByClassName(
        'main-container'
      )[0]
      expect(mainContainer.style['min-height']).toBe('calc(100vh - 150px)')
    })
  })

  it('renders ScrollToTop component', () => {
    const container = render(
      <Provider store={MockStore()()}>
        <App isAppConfigFetched={true} />
      </Provider>
    )

    const { baseElement } = container
    expect(baseElement.textContent).toContain('ScrollToTop')
  })

  it('renders DocumentHead component', () => {
    const container = render(
      <Provider store={MockStore()()}>
        <App isAppConfigFetched={true} />
      </Provider>
    )

    const { baseElement } = container
    expect(baseElement.textContent).toContain('Document Head')
  })
})
