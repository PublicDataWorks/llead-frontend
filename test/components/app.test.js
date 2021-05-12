import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import sinon from 'sinon'
import MockStore from 'redux-mock-store'

import App from 'components/app'
import * as ScrollToTop from 'components/common/higher-order/scroll-to-top'

describe('App component', () => {
  beforeEach(() => {
    sinon.stub(global, 'scrollTo')
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
    const mockScrollToTopComponent = () => <>ScrollToTop</>
    sinon.stub(ScrollToTop, 'default').get(() => mockScrollToTopComponent)

    const container = render(
      <Provider store={MockStore()()}>
        <App isAppConfigFetched={true} />
      </Provider>
    )

    const { baseElement } = container
    expect(baseElement.textContent).toContain('ScrollToTop')
  })
})
