import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import ComplaintItem from 'components/officer-page/timeline/complaint-item.js'

describe('ComplaintItem component', () => {
  it('should render complaint component', () => {
    const complaintData = {
      ruleViolation: 'Rule Vialation',
      paragraphViolation: 'Paragraph Violation',
      disposition: 'Disposition',
      action: 'Action',
      trackingNumber: '123-456',
    }

    const container = render(<ComplaintItem {...complaintData} />)

    const { baseElement } = container

    const complaintItemTitle = baseElement.getElementsByClassName(
      'complaint-item-title'
    )[0]
    expect(complaintItemTitle.textContent).toEqual('Accused of misconduct')

    const complaintItemSubtitle = baseElement.getElementsByClassName(
      'complaint-item-subtitle'
    )[0]
    expect(complaintItemSubtitle.textContent).toEqual('Exonerated')

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
    expect(complaintRuleViolation.textContent).toEqual('Rule Vialation')

    const complaintParagraphViolation = complaintItemContent.getElementsByClassName(
      'complaint-item-info-row-value'
    )[1]
    expect(complaintParagraphViolation.textContent).toEqual(
      'Paragraph Violation'
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

  it('should render complaint component when missing some data', () => {
    const complaintData = {
      ruleViolation: 'Rule Vialation',
      paragraphViolation: null,
      disposition: null,
      action: 'Action',
      trackingNumber: '123-456',
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
    expect(complaintRuleViolation.textContent).toEqual('Rule Vialation')

    const complaintAction = complaintItemContent.getElementsByClassName(
      'complaint-item-info-row-value'
    )[1]
    expect(complaintAction.textContent).toEqual('Action')

    const complaintTrackingNumber = complaintItemContent.getElementsByClassName(
      'complaint-item-info-row-value'
    )[2]
    expect(complaintTrackingNumber.textContent).toEqual('123-456')
  })
})
