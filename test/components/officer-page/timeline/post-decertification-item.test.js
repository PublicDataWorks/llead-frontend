import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import sinon from 'sinon'

import PostDecertificationItem from 'components/officer-page/timeline/post-decertification-item'
import { postCertificationItemUrl } from 'utils/urls'
import {
  ANIMATION_DURATION,
  TRACK_ITEM_TYPES,
  QUICK_ANIMATION_DURATION,
} from 'constants/common'
import * as googleAnalytics from 'utils/google-analytics'

describe('PostDecertificationItem component', () => {
  beforeEach(() => {
    sinon.stub(googleAnalytics, 'analyzeExpandEventCard')
    sinon.stub(googleAnalytics, 'analyzeCopyCardLink')
  })

  it('renders post decertification component', () => {
    const clock = sinon.useFakeTimers()

    const data = {
      department: 'New Orleans PD',
      allegations: 'Allegation title',
    }

    const container = render(<PostDecertificationItem {...data} />)

    const { baseElement, getByTestId } = container

    const decertificationItemTitle = baseElement.getElementsByClassName(
      'post-decertification-item-title'
    )[0]
    expect(decertificationItemTitle.textContent).toEqual(
      'Decertified by the Louisiana Peace Officer Standards and Training Council (POST)'
    )

    expect(
      getByTestId('test--post-decertification-animation').style['height']
    ).toEqual('0px')

    const decertificationItemHeader = baseElement.getElementsByClassName(
      'post-decertification-item-header'
    )[0]

    fireEvent.click(decertificationItemHeader)
    clock.tick(QUICK_ANIMATION_DURATION)

    expect(
      getByTestId('test--post-decertification-animation').style['height']
    ).toEqual('auto')

    const decertificationItemContent = baseElement.getElementsByClassName(
      'post-decertification-item-content'
    )[0]

    const allegation = decertificationItemContent.getElementsByClassName(
      'post-decertification-item-info-row-value'
    )[0]
    expect(allegation.textContent).toEqual('Allegation title')

    const decertificationDescription = decertificationItemContent.getElementsByClassName(
      'post-decertification-item-info-row-value'
    )[1]
    expect(decertificationDescription.textContent).toEqual('New Orleans PD')

    const decertificationCopyLink = decertificationItemContent.getElementsByClassName(
      'post-decertification-item-copy-link'
    )[0]
    expect(decertificationCopyLink.textContent).toEqual('Copy link')
  })

  it('highlights post decertification if it is the hightlighted item', () => {
    const mockScrollIntoView = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView

    const data = {
      department: 'New Orleans PD',
      allegations: 'Allegation title',
      highlight: true,
      showEventDetails: false,
    }

    const container = render(<PostDecertificationItem {...data} />)

    const { baseElement } = container

    const timelineDecertificationItem = baseElement.getElementsByClassName(
      'timeline-post-decertification-item'
    )[0]

    expect(timelineDecertificationItem.classList).toContain(
      'timeline-post-decertification-highlight'
    )
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
    })

    window.HTMLElement.prototype.scrollIntoView = undefined
  })

  it('shows copy description when click on copy guide', () => {
    const clock = sinon.useFakeTimers()

    window.HTMLElement.prototype.scrollIntoView = jest.fn()
    const mockPropmt = jest.fn()
    window.prompt = mockPropmt

    const id = 1
    const officerId = '101'

    const data = {
      id,
      officerId,
      department: 'New Orleans PD',
      allegations: 'Allegation title',
      highlight: true,
      showEventDetails: true,
    }

    const container = render(<PostDecertificationItem {...data} />)

    const { getByText, queryByText } = container

    const copyItem = getByText('Copy link')

    expect(queryByText('Link copied to your clipboard')).toBeFalsy()

    fireEvent.click(copyItem)

    expect(queryByText('Link copied to your clipboard')).toBeTruthy()

    act(() => {
      clock.tick(ANIMATION_DURATION + 100)
    })

    expect(queryByText('Link copied to your clipboard')).toBeFalsy()

    const expectedClipboard = postCertificationItemUrl(officerId, id)

    expect(mockPropmt).toHaveBeenCalledWith(
      'Copy to clipboard: Ctrl+C, Enter',
      expectedClipboard
    )
  })

  it('shows post decertification component when showEventDetails is true', () => {
    const data = {
      department: 'New Orleans PD',
      allegations: 'Allegation title',
      highlight: false,
      showEventDetails: true,
    }

    const container = render(<PostDecertificationItem {...data} />)

    const { baseElement } = container

    const decertificationItemContent = baseElement.getElementsByClassName(
      'post-decertification-item-content'
    )[0]

    expect(decertificationItemContent).toBeTruthy()
  })

  it('analyzes expand post decertification card event', () => {
    const clock = sinon.useFakeTimers()

    const id = 1

    const data = {
      id,
      department: 'New Orleans PD',
      allegations: 'Allegation title',
      highlight: false,
    }

    const container = render(<PostDecertificationItem {...data} />)

    const { baseElement } = container

    const decertificationItemHeader = baseElement.getElementsByClassName(
      'post-decertification-item-header'
    )[0]

    fireEvent.click(decertificationItemHeader)
    clock.tick(QUICK_ANIMATION_DURATION)

    expect(googleAnalytics.analyzeExpandEventCard).toHaveBeenCalledWith({
      type: TRACK_ITEM_TYPES.POST_DECERTIFICATION,
      id,
    })

    googleAnalytics.analyzeExpandEventCard.resetHistory()
    fireEvent.click(decertificationItemHeader)
    expect(googleAnalytics.analyzeExpandEventCard).not.toHaveBeenCalled()
  })

  it('analyzes copy post decertification card link', () => {
    const clock = sinon.useFakeTimers()

    const id = 1

    const data = {
      id,
      department: 'New Orleans PD',
      allegations: 'Allegation title',
      highlight: false,
    }

    const container = render(<PostDecertificationItem {...data} />)

    const { baseElement } = container

    const decertificationItemHeader = baseElement.getElementsByClassName(
      'post-decertification-item-header'
    )[0]

    fireEvent.click(decertificationItemHeader)
    clock.tick(QUICK_ANIMATION_DURATION)

    const copyLink = baseElement.getElementsByClassName(
      'post-decertification-item-copy-link'
    )[0]

    fireEvent.click(copyLink)
    clock.tick(QUICK_ANIMATION_DURATION)

    expect(googleAnalytics.analyzeCopyCardLink).toHaveBeenCalledWith({
      type: TRACK_ITEM_TYPES.POST_DECERTIFICATION,
      id,
    })
  })
})
