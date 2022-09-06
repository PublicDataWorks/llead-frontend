import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

import Menu from 'components/common/menu'
import sinon from 'sinon'

describe('Menu component', () => {
  it('renders correctly', () => {
    const closeMenuStub = sinon.stub()

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <Menu closeMenu={closeMenuStub} />
        </Route>
      </MemoryRouter>
    )
    const { baseElement, getByText } = container

    expect(baseElement.getElementsByClassName('close-btn')).toBeTruthy()
    expect(getByText('About').className).toEqual('about')
    expect(getByText('Contact').className).toEqual('contact')
  })

  it('triggers closeMenu', () => {
    const closeMenuStub = sinon.stub()

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <Menu closeMenu={closeMenuStub} />
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container

    const closeBtn = baseElement.getElementsByClassName('close-btn')[0]

    fireEvent.click(closeBtn)
    expect(closeMenuStub).toHaveBeenCalled()
  })

  it('redirects to about page', () => {
    const closeMenuStub = sinon.stub()

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <Menu closeMenu={closeMenuStub} />
        </Route>
        <Route path='/about/'>
          <div className='about-page'>About Page</div>
        </Route>
      </MemoryRouter>
    )
    const { baseElement, getByText } = container

    const aboutBtn = getByText('About')
    fireEvent.click(aboutBtn)

    expect(baseElement.getElementsByClassName('about-page').length).toEqual(1)
  })

  it('redirects to contact page', () => {
    const closeMenuStub = sinon.stub()

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <Menu closeMenu={closeMenuStub} />
        </Route>
        <Route path='/contact/'>
          <div className='contact-page'>Contact Page</div>
        </Route>
      </MemoryRouter>
    )
    const { baseElement, getByText } = container

    const aboutBtn = getByText('Contact')
    fireEvent.click(aboutBtn)

    expect(baseElement.getElementsByClassName('contact-page').length).toEqual(1)
  })
})
