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
})
