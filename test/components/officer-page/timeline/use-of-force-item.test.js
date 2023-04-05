import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import sinon from 'sinon'

import UseOfForceItem from 'components/officer-page/timeline/use-of-force-item'
import { uofItemUrl } from 'utils/urls'
import {
  ANIMATION_DURATION,
  TRACK_ITEM_TYPES,
  QUICK_ANIMATION_DURATION,
} from 'constants/common'
import * as googleAnalytics from 'utils/google-analytics'

describe('UseOfForceItem component', () => {
  beforeEach(() => {
    sinon.stub(googleAnalytics, 'analyzeExpandEventCard')
    sinon.stub(googleAnalytics, 'analyzeCopyCardLink')
  })

  it('renders use of force component', () => {
    const clock = sinon.useFakeTimers()

    const uofData = {
      kind: 'UOF',
      id: 1,
      useOfForceDescription: 'L2-Takedown (w/injury)',
      useOfForceReason: 'Resisting lawful arrest',
      disposition: 'UOF Justified',
      serviceType: 'Call for service',
      citizenInformation: [
        '26-year-old white female',
        '42-year-old asian male',
      ],
      trackingId: 'Complainant',
      details: ['citizen arrested', 'citizen injured', 'officer injured'],
      showEventDetails: false,
    }

    const container = render(<UseOfForceItem {...uofData} />)

    const { baseElement, getByTestId } = container

    const uofItemTitle = baseElement.getElementsByClassName('uof-item-title')[0]
    expect(uofItemTitle.textContent).toEqual('Used force')

    const uofItemSubtitle = baseElement.getElementsByClassName(
      'uof-item-subtitle'
    )[0]
    expect(uofItemSubtitle.textContent).toEqual('L2-Takedown (w/injury)')

    expect(getByTestId('test--uof-animation').style['height']).toEqual('0px')

    const uofItemHeader = baseElement.getElementsByClassName(
      'uof-item-header'
    )[0]

    fireEvent.click(uofItemHeader)
    clock.tick(QUICK_ANIMATION_DURATION)

    expect(getByTestId('test--uof-animation').style['height']).toEqual('auto')

    const uofItemContent = baseElement.getElementsByClassName(
      'uof-item-content'
    )[0]

    const uofForceReason = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[0]
    expect(uofForceReason.textContent).toEqual('Resisting lawful arrest')

    const uofDisposition = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[1]
    expect(uofDisposition.textContent).toEqual('UOF Justified')

    const uofServiceType = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[2]
    expect(uofServiceType.textContent).toEqual('Call for service')

    const citizenInformation1 = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[3]
    expect(citizenInformation1.textContent).toEqual('26-year-old white female')

    const citizenInformation2 = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[4]
    expect(citizenInformation2.textContent).toEqual('42-year-old asian male')

    const uofTrackingID = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[5]
    expect(uofTrackingID.textContent).toEqual('Complainant')

    const uofDetails = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[6]
    const uofDetailItems = uofDetails.getElementsByClassName(
      'uof-item-detail-element'
    )
    expect(uofDetailItems[0].textContent).toEqual('citizen arrested')
    expect(uofDetailItems[1].textContent).toEqual('citizen injured')
    expect(uofDetailItems[2].textContent).toEqual('officer injured')

    const uofCopyLink = uofItemContent.getElementsByClassName(
      'uof-item-copy-link'
    )[0]
    expect(uofCopyLink.textContent).toEqual('Copy link')
  })

  it('renders uof component when missing some data', () => {
    const uofData = {
      kind: 'UOF',
      id: 1,
      useOfForceDescription: 'L2-Takedown (w/injury)',
      useOfForceReason: 'Resisting lawful arrest',
      disposition: 'UOF Justified',
      serviceType: 'Call for service',
      citizenInformation: ['26-year-old white female'],
      trackingId: 'Complainant',
      showEventDetails: false,
    }

    const container = render(<UseOfForceItem {...uofData} />)

    const { baseElement } = container

    const uofItemHeader = baseElement.getElementsByClassName(
      'uof-item-header'
    )[0]
    fireEvent.click(uofItemHeader)

    const uofItemContent = baseElement.getElementsByClassName(
      'uof-item-content'
    )[0]

    const useOfForceReason = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[0]
    expect(useOfForceReason.textContent).toEqual('Resisting lawful arrest')

    const uofDisposition = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[1]
    expect(uofDisposition.textContent).toEqual('UOF Justified')

    const uofServiceType = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[2]
    expect(uofServiceType.textContent).toEqual('Call for service')

    const citizenInformation = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[3]
    expect(citizenInformation.textContent).toEqual('26-year-old white female')

    const uofTrackingID = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[4]
    expect(uofTrackingID.textContent).toEqual('Complainant')

    const uofDetailItems = uofItemContent.getElementsByClassName(
      'uof-item-detail-element'
    )
    expect(uofDetailItems.length).toEqual(0)
  })

  it('highlights uof if it is the hightlighted item', () => {
    const mockScrollIntoView = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView

    const uofData = {
      kind: 'UOF',
      id: 1,
      useOfForceDescription: 'L2-Takedown (w/injury)',
      useOfForceReason: 'Resisting lawful arrest',
      disposition: 'UOF Justified',
      serviceType: 'Call for service',
      citizenInformation: ['26-year-old white female'],
      trackingId: 'Complainant',
      details: ['citizen arrested', 'citizen injured', 'officer injured'],
      highlight: true,
      showEventDetails: false,
    }

    const container = render(<UseOfForceItem {...uofData} />)

    const { baseElement } = container

    const timelineUseOfForceItem = baseElement.getElementsByClassName(
      'timeline-uof-item'
    )[0]

    expect(timelineUseOfForceItem.classList).toContain('timeline-uof-highlight')
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

    const uofId = 1
    const officerId = '101'

    const uofData = {
      id: uofId,
      officerId,
      useOfForceDescription: 'L2-Takedown (w/injury)',
      useOfForceReason: 'Resisting lawful arrest',
      disposition: 'UOF Justified',
      serviceType: 'Call for service',
      citizenInformation: ['26-year-old white female'],
      trackingId: 'Complainant',
      highlight: true,
      showEventDetails: true,
    }

    const container = render(<UseOfForceItem {...uofData} />)

    const { getByText, queryByText } = container

    const copyItem = getByText('Copy link')

    expect(queryByText('Link copied to your clipboard')).toBeFalsy()

    fireEvent.click(copyItem)

    expect(queryByText('Link copied to your clipboard')).toBeTruthy()

    act(() => {
      clock.tick(ANIMATION_DURATION + 100)
    })

    expect(queryByText('Link copied to your clipboard')).toBeFalsy()

    const expectedClipboard = uofItemUrl(officerId, uofId)

    expect(mockPropmt).toHaveBeenCalledWith(
      'Copy to clipboard: Ctrl+C, Enter',
      expectedClipboard
    )
  })

  it('shows uof component when showEventDetails is true', () => {
    const uofData = {
      useOfForceDescription: 'L2-Takedown (w/injury)',
      useOfForceReason: 'Resisting lawful arrest',
      disposition: 'UOF Justified',
      serviceType: 'Call for service',
      citizenInformation: ['26-year-old white female'],
      trackingId: 'Complainant',
      highlight: false,
      showEventDetails: true,
    }

    const container = render(<UseOfForceItem {...uofData} />)

    const { baseElement } = container

    const uofItemContent = baseElement.getElementsByClassName(
      'uof-item-content'
    )[0]

    expect(uofItemContent).toBeTruthy()
  })

  it('analyzes expand use of force card event', () => {
    const clock = sinon.useFakeTimers()

    const uofId = 1

    const uofData = {
      id: uofId,
      forceType: 'Takedown (w/injury)',
      uoftrackingId: 'uof tracking number',
      highlight: false,
    }

    const container = render(<UseOfForceItem {...uofData} />)
    const { baseElement } = container

    const uofItemHeader = baseElement.getElementsByClassName(
      'uof-item-header'
    )[0]

    fireEvent.click(uofItemHeader)
    clock.tick(QUICK_ANIMATION_DURATION)

    expect(googleAnalytics.analyzeExpandEventCard).toHaveBeenCalledWith({
      type: TRACK_ITEM_TYPES.UOF,
      id: uofId,
    })

    googleAnalytics.analyzeExpandEventCard.resetHistory()
    fireEvent.click(uofItemHeader)
    expect(googleAnalytics.analyzeExpandEventCard).not.toHaveBeenCalled()
  })

  it('analyzes copy use of force card link', () => {
    const clock = sinon.useFakeTimers()

    const uofId = 1

    const uofData = {
      id: uofId,
      forceType: 'Takedown (w/injury)',
      uoftrackingId: 'uof tracking number',
      highlight: false,
    }

    const container = render(<UseOfForceItem {...uofData} />)
    const { baseElement } = container

    const uofItemHeader = baseElement.getElementsByClassName(
      'uof-item-header'
    )[0]

    fireEvent.click(uofItemHeader)
    clock.tick(QUICK_ANIMATION_DURATION)

    const uofItemCopyLink = baseElement.getElementsByClassName(
      'uof-item-copy-link'
    )[0]

    fireEvent.click(uofItemCopyLink)
    clock.tick(QUICK_ANIMATION_DURATION)

    expect(googleAnalytics.analyzeCopyCardLink).toHaveBeenCalledWith({
      type: TRACK_ITEM_TYPES.UOF,
      id: uofId,
    })

    googleAnalytics.analyzeCopyCardLink.resetHistory()
    fireEvent.click(uofItemHeader)
    expect(googleAnalytics.analyzeCopyCardLink).not.toHaveBeenCalled()
  })
})
