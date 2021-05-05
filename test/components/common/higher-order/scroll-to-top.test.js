import React, { useEffect } from 'react'
import { render } from '@testing-library/react'
import { Route, MemoryRouter, Switch, useHistory } from 'react-router-dom'
import sinon from 'sinon'

import ScrollToTop from 'components/common/higher-order/scroll-to-top'

describe('ScrollToTop component', () => {
  it('should scroll to top on pathname change', () => {
    sinon.stub(global, 'scrollTo')

    const mockRoutingComponent = () => {
      const history = useHistory()

      useEffect(() => {
        history.push('/any')
      }, [])
      return <>Routing Component</>
    }

    const mockOtherComponent = () => {
      return <>Other Component</>
    }

    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
        <Switch>
          <Route path='/' component={mockRoutingComponent} exact />
          <Route path='/any' component={mockOtherComponent} exact />
        </Switch>
      </MemoryRouter>
    )

    expect(global.scrollTo).toHaveBeenCalledWith(0, 0)
    expect(global.scrollTo).toHaveBeenCalledTimes(2)
  })
})
