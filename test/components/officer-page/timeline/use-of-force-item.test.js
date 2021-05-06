import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import sinon from 'sinon'

import UseOfForceItem from 'components/officer-page/timeline/use-of-force-item'
import { uofItemUrl } from 'utils/urls'
import { ANIMATION_DURATION, QUICK_ANIMATION_DURATION } from 'constants/common'

describe('UseOfForceItem component', () => {
  it('renders use of force component', () => {
    const clock = sinon.useFakeTimers()

    const uofData = {
      kind: 'UOF',
      id: 1,
      forceType: 'Takedown (w/injury)',
      forceDescription: 'L2-Takedown (w/injury)',
      forceReason: 'Resisting lawful arrest',
      disposition: 'UOF Justified',
      serviceType: 'Call for service',
      citizenInvolvement: 'Complainant',
      citizenInformation: '26-year-old white female',
      uofTrackingNumber: 'Complainant',
      details: [
        'citizen arrested',
        'citizen injured',
        'officer injured',
        'traffic stop',
      ],
      showEventDetails: false,
    }

    const container = render(<UseOfForceItem {...uofData} />)

    const { baseElement, getByTestId } = container

    const uofItemTitle = baseElement.getElementsByClassName('uof-item-title')[0]
    expect(uofItemTitle.textContent).toEqual('Used force')

    const uofItemSubtitle = baseElement.getElementsByClassName(
      'uof-item-subtitle'
    )[0]
    expect(uofItemSubtitle.textContent).toEqual('Takedown (w/injury)')

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

    const uofForceDescription = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[0]
    expect(uofForceDescription.textContent).toEqual('L2-Takedown (w/injury)')

    const uofForceReason = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[1]
    expect(uofForceReason.textContent).toEqual('Resisting lawful arrest')

    const uofDisposition = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[2]
    expect(uofDisposition.textContent).toEqual('UOF Justified')

    const uofServiceType = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[3]
    expect(uofServiceType.textContent).toEqual('Call for service')

    const uofCitizenInvolvement = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[4]
    expect(uofCitizenInvolvement.textContent).toEqual('Complainant')

    const uofCitizenInformation = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[5]
    expect(uofCitizenInformation.textContent).toEqual(
      '26-year-old white female'
    )

    const uofTrackingID = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[6]
    expect(uofTrackingID.textContent).toEqual('Complainant')

    const uofDetails = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[7]
    const uofDetailItems = uofDetails.getElementsByClassName(
      'uof-item-detail-element'
    )
    expect(uofDetailItems[0].textContent).toEqual('citizen arrested')
    expect(uofDetailItems[1].textContent).toEqual('citizen injured')
    expect(uofDetailItems[2].textContent).toEqual('officer injured')
    expect(uofDetailItems[3].textContent).toEqual('traffic stop')

    const uofCopyLink = uofItemContent.getElementsByClassName(
      'uof-item-copy-link'
    )[0]
    expect(uofCopyLink.textContent).toEqual('Copy link')
  })

  it('renders uof component when missing some data', () => {
    const uofData = {
      kind: 'UOF',
      id: 1,
      forceType: 'Takedown (w/injury)',
      forceDescription: 'L2-Takedown (w/injury)',
      disposition: 'UOF Justified',
      serviceType: 'Call for service',
      citizenInvolvement: 'Complainant',
      uofTrackingNumber: 'Complainant',
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

    const uofForceDescription = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[0]
    expect(uofForceDescription.textContent).toEqual('L2-Takedown (w/injury)')

    const uofDisposition = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[1]
    expect(uofDisposition.textContent).toEqual('UOF Justified')

    const uofServiceType = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[2]
    expect(uofServiceType.textContent).toEqual('Call for service')

    const uofCitizenInvolvement = uofItemContent.getElementsByClassName(
      'uof-item-info-row-value'
    )[3]
    expect(uofCitizenInvolvement.textContent).toEqual('Complainant')

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
      forceType: 'Takedown (w/injury)',
      forceDescription: 'L2-Takedown (w/injury)',
      forceReason: 'Resisting lawful arrest',
      disposition: 'UOF Justified',
      serviceType: 'Call for service',
      citizenInvolvement: 'Complainant',
      citizenInformation: '26-year-old white female',
      uofTrackingNumber: 'Complainant',
      details: [
        'citizen arrested',
        'citizen injured',
        'officer injured',
        'traffic stop',
      ],
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
      forceType: 'Takedown (w/injury)',
      forceDescription: 'L2-Takedown (w/injury)',
      forceReason: 'Resisting lawful arrest',
      disposition: 'UOF Justified',
      serviceType: 'Call for service',
      citizenInvolvement: 'Complainant',
      citizenInformation: '26-year-old white female',
      uofTrackingNumber: 'Complainant',
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
      forceType: 'Takedown (w/injury)',
      forceDescription: 'L2-Takedown (w/injury)',
      forceReason: 'Resisting lawful arrest',
      disposition: 'UOF Justified',
      serviceType: 'Call for service',
      citizenInvolvement: 'Complainant',
      citizenInformation: '26-year-old white female',
      uofTrackingNumber: 'Complainant',
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
})
