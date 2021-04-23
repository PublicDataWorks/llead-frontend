import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import sinon from 'sinon'

import ComplaintItem from 'components/officer-page/timeline/complaint-item.js'
import { complaintItemUrl } from 'utils/urls'
import { ANIMATION_DURATION } from 'constants/common'

describe('ComplaintItem component', () => {
  it('renders complaint component', () => {
    const complaintData = {
      ruleCode: 'Rule_code',
      ruleViolation: 'Rule Vialation',
      paragraphCode: 'Paragraph_code',
      paragraphViolation: 'Paragraph Violation',
      disposition: 'Disposition',
      action: 'Action',
      trackingNumber: '123-456',
      showEventDetails: false,
    }

    const container = render(<ComplaintItem {...complaintData} />)

    const { baseElement } = container

    const complaintItemTitle = baseElement.getElementsByClassName(
      'complaint-item-title'
    )[0]
    expect(complaintItemTitle.textContent).toEqual('Accused of Rule Vialation')

    const complaintItemSubtitle = baseElement.getElementsByClassName(
      'complaint-item-subtitle'
    )[0]
    expect(complaintItemSubtitle.textContent).toEqual('Disposition')

    expect(
      baseElement.getElementsByClassName('complaint-item-content').length
    ).toEqual(0)

    const complaintItemHeader = baseElement.getElementsByClassName(
      'complaint-item-header'
    )[0]
    fireEvent.click(complaintItemHeader)

    expect(
      baseElement.getElementsByClassName('complaint-item-content').length
    ).not.toEqual(0)

    const complaintItemContent = baseElement.getElementsByClassName(
      'complaint-item-content'
    )[0]

    const complaintRuleViolation = complaintItemContent.getElementsByClassName(
      'complaint-item-info-row-value'
    )[0]
    expect(complaintRuleViolation.textContent).toEqual(
      'Rule_code - Rule Vialation'
    )

    const complaintParagraphViolation = complaintItemContent.getElementsByClassName(
      'complaint-item-info-row-value'
    )[1]
    expect(complaintParagraphViolation.textContent).toEqual(
      'Paragraph_code - Paragraph Violation'
    )

    const complaintDisposition = complaintItemContent.getElementsByClassName(
      'complaint-item-info-row-value'
    )[2]
    expect(complaintDisposition.textContent).toEqual('Disposition')

    const complaintAction = complaintItemContent.getElementsByClassName(
      'complaint-item-info-row-value'
    )[3]
    expect(complaintAction.textContent).toEqual('Action')

    const complaintTrackingNumber = complaintItemContent.getElementsByClassName(
      'complaint-item-info-row-value'
    )[4]
    expect(complaintTrackingNumber.textContent).toEqual('123-456')

    const complaintCopyLink = complaintItemContent.getElementsByClassName(
      'complaint-item-copy-link'
    )[0]
    expect(complaintCopyLink.textContent).toEqual('Copy link')
  })

  it('renders complaint component when missing some data', () => {
    const complaintData = {
      ruleCode: 'Rule_code',
      ruleViolation: 'Rule Vialation',
      paragraphViolation: null,
      disposition: null,
      action: 'Action',
      trackingNumber: '123-456',
      showEventDetails: false,
    }

    const container = render(<ComplaintItem {...complaintData} />)

    const { baseElement } = container

    const complaintItemHeader = baseElement.getElementsByClassName(
      'complaint-item-header'
    )[0]
    fireEvent.click(complaintItemHeader)

    const complaintItemContent = baseElement.getElementsByClassName(
      'complaint-item-content'
    )[0]

    const complaintRuleViolation = complaintItemContent.getElementsByClassName(
      'complaint-item-info-row-value'
    )[0]
    expect(complaintRuleViolation.textContent).toEqual(
      'Rule_code - Rule Vialation'
    )

    const complaintAction = complaintItemContent.getElementsByClassName(
      'complaint-item-info-row-value'
    )[1]
    expect(complaintAction.textContent).toEqual('Action')

    const complaintTrackingNumber = complaintItemContent.getElementsByClassName(
      'complaint-item-info-row-value'
    )[2]
    expect(complaintTrackingNumber.textContent).toEqual('123-456')
  })

  it('highlights complaint if it is the hightlighted item', () => {
    const mockScrollIntoView = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView

    const complaintData = {
      ruleViolation: 'Rule Vialation',
      paragraphViolation: 'Paragraph Violation',
      disposition: 'Disposition',
      action: 'Action',
      trackingNumber: '123-456',
      highlight: true,
      showEventDetails: false,
    }

    const container = render(<ComplaintItem {...complaintData} />)

    const { baseElement } = container

    const timelineComplaintItem = baseElement.getElementsByClassName(
      'timeline-complaint-item'
    )[0]

    expect(timelineComplaintItem.classList).toContain(
      'timeline-complaint-highlight'
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

    const complaintId = 1
    const officerId = '101'

    const complaintData = {
      id: complaintId,
      officerId,
      ruleViolation: 'Rule Vialation',
      paragraphViolation: 'Paragraph Violation',
      disposition: 'Disposition',
      action: 'Action',
      trackingNumber: '123-456',
      highlight: true,
      showEventDetails: true,
    }

    const container = render(<ComplaintItem {...complaintData} />)

    const { getByText, queryByText } = container

    const copyItem = getByText('Copy link')

    expect(queryByText('Link copied to your clipboard')).toBeFalsy()

    fireEvent.click(copyItem)

    expect(queryByText('Link copied to your clipboard')).toBeTruthy()

    act(() => {
      clock.tick(ANIMATION_DURATION + 100)
    })

    expect(queryByText('Link copied to your clipboard')).toBeFalsy()

    const expectedClipboard = complaintItemUrl(officerId, complaintId)

    expect(mockPropmt).toHaveBeenCalledWith(
      'Copy to clipboard: Ctrl+C, Enter',
      expectedClipboard
    )
  })

  it('shows complaint component when showEventDetails is true', () => {
    const complaintData = {
      ruleViolation: 'Rule Vialation',
      paragraphViolation: 'Paragraph Violation',
      disposition: 'Disposition',
      action: 'Action',
      trackingNumber: '123-456',
      highlight: false,
      showEventDetails: true,
    }

    const container = render(<ComplaintItem {...complaintData} />)

    const { baseElement } = container

    const complaintItemContent = baseElement.getElementsByClassName(
      'complaint-item-content'
    )[0]

    expect(complaintItemContent).toBeTruthy()
  })
})
