import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import sinon from 'sinon'
import MockStore from 'redux-mock-store'

import App from 'components/app'

describe('App component', () => {
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
