import React from 'react'
import { render } from '@testing-library/react'

import MainItem from 'components/officer-page/timeline/main-item.js'
import { TIMELINE_KINDS } from 'constants/common'

describe('MainItem component', () => {
  it('should render JOINED component', () => {
    const kind = TIMELINE_KINDS.JOINED

    const container = render(<MainItem kind={kind} />)

    const { baseElement } = container

    const joinedComponent = baseElement.getElementsByClassName(
      'timeline-main-item'
    )[0]

    expect(baseElement.textContent).toEqual('Joined department')
    expect(joinedComponent.classList).toContain('timeline-joined-item')
  })

  it('should render LEFT component', () => {
    const kind = TIMELINE_KINDS.LEFT

    const container = render(<MainItem kind={kind} />)

    const { baseElement } = container

    const leftComponent = baseElement.getElementsByClassName(
      'timeline-main-item'
    )[0]

    expect(baseElement.textContent).toEqual('Left from department')
    expect(leftComponent.classList).toContain('timeline-left-item')
  })
})
