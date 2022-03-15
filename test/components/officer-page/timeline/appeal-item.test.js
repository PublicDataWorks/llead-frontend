import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import sinon from 'sinon'

import AppealItem from 'components/officer-page/timeline/appeal-item'
import { appealItemUrl } from 'utils/urls'
import {
  ANIMATION_DURATION,
  TRACK_ITEM_TYPES,
  QUICK_ANIMATION_DURATION,
} from 'constants/common'
import * as googleAnalytics from 'utils/google-analytics'

describe('Appeal Item component', () => {
  beforeEach(() => {
    sinon.stub(googleAnalytics, 'analyzeExpandEventCard')
    sinon.stub(googleAnalytics, 'analyzeCopyCardLink')
  })

  it('renders appeal component', () => {
    const clock = sinon.useFakeTimers()

    const appealData = {
      id: 1,
      kind: 'APPEAL',
      year: 2019,
      date: '2019-06-13',
      docketNo: '1234',
      counsel: 'Dirks',
      chargingSupervisor: 'Paul Fontenot',
      appealDisposition: 'appeal upheld',
      actionAppealed: 'suspension',
      appealed: 'Yes',
      motions: 'amicable settlement',
      department: 'New Orleans Police Department',
      showEventDetails: false,
    }

    const container = render(<AppealItem {...appealData} />)

    const { baseElement, getByTestId } = container

    const appealItemTitle = baseElement.getElementsByClassName(
      'appeal-item-title'
    )[0]
    expect(appealItemTitle.textContent).toEqual('Appealed suspension')

    const appealItemSubtitle = baseElement.getElementsByClassName(
      'appeal-item-subtitle'
    )[0]
    expect(appealItemSubtitle.textContent).toEqual('appeal upheld')

    expect(getByTestId('test--appeal-animation').style['height']).toEqual('0px')

    const appealItemHeader = baseElement.getElementsByClassName(
      'appeal-item-header'
    )[0]

    fireEvent.click(appealItemHeader)
    clock.tick(QUICK_ANIMATION_DURATION)

    expect(getByTestId('test--appeal-animation').style['height']).toEqual(
      'auto'
    )

    const appealItemContent = baseElement.getElementsByClassName(
      'appeal-item-content'
    )[0]

    const actionAppealed = appealItemContent.getElementsByClassName(
      'appeal-item-info-row-value'
    )[0]
    expect(actionAppealed.textContent).toEqual('suspension')

    const appealDisposition = appealItemContent.getElementsByClassName(
      'appeal-item-info-row-value'
    )[1]
    expect(appealDisposition.textContent).toEqual('appeal upheld')

    const motions = appealItemContent.getElementsByClassName(
      'appeal-item-info-row-value'
    )[2]
    expect(motions.textContent).toEqual('amicable settlement')

    const counsel = appealItemContent.getElementsByClassName(
      'appeal-item-info-row-value'
    )[3]
    expect(counsel.textContent).toEqual('Dirks')

    const chargingSupervisor = appealItemContent.getElementsByClassName(
      'appeal-item-info-row-value'
    )[4]
    expect(chargingSupervisor.textContent).toEqual('Paul Fontenot')

    const department = appealItemContent.getElementsByClassName(
      'appeal-item-info-row-value'
    )[5]
    expect(department.textContent).toEqual('New Orleans Police Department')

    const date = appealItemContent.getElementsByClassName(
      'appeal-item-info-row-value'
    )[6]
    expect(date.textContent).toEqual('2019-06-13')

    const docketNo = appealItemContent.getElementsByClassName(
      'appeal-item-info-row-value'
    )[7]
    expect(docketNo.textContent).toEqual('1234')

    const appealCopyLink = appealItemContent.getElementsByClassName(
      'appeal-item-copy-link'
    )[0]
    expect(appealCopyLink.textContent).toEqual('Copy link')
  })

  it('renders appeal component when missing some data', () => {
    const appealData = {
      id: 1,
      kind: 'APPEAL',
      year: 2019,
      date: '2019-06-13',
      docketNo: '1234',
      appealDisposition: 'appeal upheld',
      actionAppealed: 'suspension',
      motions: 'amicable settlement',
      showEventDetails: false,
    }

    const container = render(<AppealItem {...appealData} />)

    const { baseElement } = container

    const appealItemHeader = baseElement.getElementsByClassName(
      'appeal-item-header'
    )[0]
    fireEvent.click(appealItemHeader)

    const appealItemContent = baseElement.getElementsByClassName(
      'appeal-item-content'
    )[0]

    const actionAppealed = appealItemContent.getElementsByClassName(
      'appeal-item-info-row-value'
    )[0]
    expect(actionAppealed.textContent).toEqual('suspension')

    const appealDisposition = appealItemContent.getElementsByClassName(
      'appeal-item-info-row-value'
    )[1]
    expect(appealDisposition.textContent).toEqual('appeal upheld')

    const motions = appealItemContent.getElementsByClassName(
      'appeal-item-info-row-value'
    )[2]
    expect(motions.textContent).toEqual('amicable settlement')
  })

  it('highlights appeal if it is the hightlighted item', () => {
    const mockScrollIntoView = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView

    const appealData = {
      id: 1,
      kind: 'APPEAL',
      year: 2019,
      date: '2019-06-13',
      docketNo: '1234',
      counsel: 'Dirks',
      chargingSupervisor: 'Paul Fontenot',
      appealDisposition: 'appeal upheld',
      actionAppealed: 'suspension',
      appealed: 'Yes',
      motions: 'amicable settlement',
      highlight: true,
      showEventDetails: false,
    }

    const container = render(<AppealItem {...appealData} />)

    const { baseElement } = container

    const timelineAppealItem = baseElement.getElementsByClassName(
      'timeline-appeal-item'
    )[0]

    expect(timelineAppealItem.classList).toContain('timeline-appeal-highlight')
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

    const appealId = 1
    const officerId = '101'

    const appealData = {
      id: appealId,
      officerId,
      kind: 'APPEAL',
      year: 2019,
      date: '2019-06-13',
      docketNo: '1234',
      counsel: 'Dirks',
      chargingSupervisor: 'Paul Fontenot',
      appealDisposition: 'appeal upheld',
      actionAppealed: 'suspension',
      appealed: 'Yes',
      motions: 'amicable settlement',
      highlight: true,
      showEventDetails: true,
    }

    const container = render(<AppealItem {...appealData} />)

    const { getByText, queryByText } = container

    const copyItem = getByText('Copy link')

    expect(queryByText('Link copied to your clipboard')).toBeFalsy()

    fireEvent.click(copyItem)

    expect(queryByText('Link copied to your clipboard')).toBeTruthy()

    act(() => {
      clock.tick(ANIMATION_DURATION + 100)
    })

    expect(queryByText('Link copied to your clipboard')).toBeFalsy()

    const expectedClipboard = appealItemUrl(officerId, appealId)

    expect(mockPropmt).toHaveBeenCalledWith(
      'Copy to clipboard: Ctrl+C, Enter',
      expectedClipboard
    )
  })

  it('shows appeal component when showEventDetails is true', () => {
    const appealData = {
      id: 1,
      kind: 'APPEAL',
      year: 2019,
      date: '2019-06-13',
      docketNo: '1234',
      counsel: 'Dirks',
      chargingSupervisor: 'Paul Fontenot',
      appealDisposition: 'appeal upheld',
      actionAppealed: 'suspension',
      appealed: 'Yes',
      motions: 'amicable settlement',
      highlight: false,
      showEventDetails: true,
    }

    const container = render(<AppealItem {...appealData} />)

    const { baseElement } = container

    const appealItemContent = baseElement.getElementsByClassName(
      'appeal-item-content'
    )[0]

    expect(appealItemContent).toBeTruthy()
  })

  it('analyzes expand appeal card event', () => {
    const clock = sinon.useFakeTimers()

    const appealId = 1

    const appealData = {
      id: appealId,
      chargingSupervisor: 'Paul Fontenot',
      appealDisposition: 'appeal upheld',
      highlight: false,
    }

    const container = render(<AppealItem {...appealData} />)
    const { baseElement } = container

    const appealItemHeader = baseElement.getElementsByClassName(
      'appeal-item-header'
    )[0]

    fireEvent.click(appealItemHeader)
    clock.tick(QUICK_ANIMATION_DURATION)

    expect(googleAnalytics.analyzeExpandEventCard).toHaveBeenCalledWith({
      type: TRACK_ITEM_TYPES.APPEAL,
      id: appealId,
    })

    googleAnalytics.analyzeExpandEventCard.resetHistory()
    fireEvent.click(appealItemHeader)
    expect(googleAnalytics.analyzeExpandEventCard).not.toHaveBeenCalled()
  })

  it('analyzes copy appeal card link', () => {
    const clock = sinon.useFakeTimers()

    const appealId = 1

    const appealData = {
      id: appealId,
      chargingSupervisor: 'Paul Fontenot',
      appealDisposition: 'appeal upheld',
      highlight: false,
    }

    const container = render(<AppealItem {...appealData} />)
    const { baseElement } = container

    const appealItemHeader = baseElement.getElementsByClassName(
      'appeal-item-header'
    )[0]

    fireEvent.click(appealItemHeader)
    clock.tick(QUICK_ANIMATION_DURATION)

    const appealItemCopyLink = baseElement.getElementsByClassName(
      'appeal-item-copy-link'
    )[0]

    fireEvent.click(appealItemCopyLink)
    clock.tick(QUICK_ANIMATION_DURATION)

    expect(googleAnalytics.analyzeCopyCardLink).toHaveBeenCalledWith({
      type: TRACK_ITEM_TYPES.APPEAL,
      id: appealId,
    })

    googleAnalytics.analyzeCopyCardLink.resetHistory()
    fireEvent.click(appealItemHeader)
    expect(googleAnalytics.analyzeCopyCardLink).not.toHaveBeenCalled()
  })
})
