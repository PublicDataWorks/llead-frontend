import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import sinon from 'sinon'

import OuterLink from 'components/common/links/outer-link'

describe('OuterLink component', () => {
  it('should render correctly', () => {
    const windowOpenStub = sinon.stub(window, 'open')
    const onClickSpy = sinon.spy()
    const link = '/link'
    const container = render(
      <OuterLink href={link} onClick={onClickSpy}>
        Outer Link
      </OuterLink>
    )

    const { getByText } = container
    const outerLinkElement = getByText('Outer Link')
    fireEvent.click(outerLinkElement)

    expect(windowOpenStub).toHaveBeenCalledWith(
      link,
      '_blank',
      'noopener noreferrer'
    )
    expect(onClickSpy).toHaveBeenCalled()
  })

  it('handles removing item correctly', () => {
    const link = '/link'
    const removeRecentItemStub = sinon.stub()
    sinon.stub(window, 'open')
    const removeData = { abc: '123' }
    const container = render(
      <OuterLink
        href={link}
        isLoggedIn={true}
        removeRecentItem={removeRecentItemStub}
        removeData={removeData}
      >
        Outer Link
      </OuterLink>
    )

    const { baseElement } = container
    const removeIconItem = baseElement.getElementsByClassName('remove-btn')[0]
    fireEvent.click(removeIconItem)

    expect(removeRecentItemStub).toHaveBeenCalledWith(removeData)
  })

  it('does not show remove button if anonymous user', () => {
    const link = '/link'
    const removeRecentItemStub = sinon.stub()
    sinon.stub(window, 'open')
    const removeData = { abc: '123' }
    const container = render(
      <OuterLink
        href={link}
        isLoggedIn={false}
        removeRecentItem={removeRecentItemStub}
        removeData={removeData}
      >
        Outer Link
      </OuterLink>
    )

    const { baseElement } = container

    expect(baseElement.getElementsByClassName('remove-btn').length).toEqual(0)
  })

  it('handles disabling correctly', () => {
    const windowOpenStub = sinon.stub(window, 'open')
    const onClickSpy = sinon.spy()
    const link = '/link'
    const container = render(
      <OuterLink href={link} onClick={onClickSpy} isDisabled={true}>
        Outer Link
      </OuterLink>
    )

    const { getByText } = container
    const outerLinkElement = getByText('Outer Link')
    fireEvent.click(outerLinkElement)

    expect(windowOpenStub).not.toHaveBeenCalled()
    expect(onClickSpy).not.toHaveBeenCalled()
  })
})
