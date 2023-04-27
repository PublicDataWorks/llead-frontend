import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import sinon from 'sinon'

import BradyItem from 'components/officer-page/timeline/brady-item'
import { bradyItemUrl } from 'utils/urls'
import {
  ANIMATION_DURATION,
  TRACK_ITEM_TYPES,
  QUICK_ANIMATION_DURATION,
} from 'constants/common'
import * as googleAnalytics from 'utils/google-analytics'

describe('BradyItem component', () => {
  beforeEach(() => {
    sinon.stub(googleAnalytics, 'analyzeExpandEventCard')
    sinon.stub(googleAnalytics, 'analyzeCopyCardLink')
  })

  it('renders brady component', () => {
    const clock = sinon.useFakeTimers()

    const data = {
      allegationDesc: 'criminal violation',
      disposition: 'sustained',
      action: 'terminated',
      chargingDepartment: 'morehouse-da',
      department: 'east-baton-rouge-da',
      sourceDepartment: 'ouachita-da',
      date: '2019-06-13',
      trackingIdOg: '123-abc',
    }

    const container = render(<BradyItem {...data} />)

    const { baseElement, getByTestId } = container

    const bradyItemTitle = baseElement.getElementsByClassName(
      'brady-item-title'
    )[0]
    expect(bradyItemTitle.textContent).toEqual(
      'Named on Brady List by ouachita-da'
    )

    expect(getByTestId('test--brady-animation').style['height']).toEqual('0px')

    const bradyItemHeader = baseElement.getElementsByClassName(
      'brady-item-header'
    )[0]

    fireEvent.click(bradyItemHeader)
    clock.tick(QUICK_ANIMATION_DURATION)

    expect(getByTestId('test--brady-animation').style['height']).toEqual('auto')

    const bradyItemContent = baseElement.getElementsByClassName(
      'brady-item-content'
    )[0]

    const allegationDesc = bradyItemContent.getElementsByClassName(
      'brady-item-info-row-value'
    )[0]
    expect(allegationDesc.textContent).toEqual('Criminal violation')

    const action = bradyItemContent.getElementsByClassName(
      'brady-item-info-row-value'
    )[1]
    expect(action.textContent).toEqual('Terminated')

    const disposition = bradyItemContent.getElementsByClassName(
      'brady-item-info-row-value'
    )[2]
    expect(disposition.textContent).toEqual('Sustained')

    const chargingDepartment = bradyItemContent.getElementsByClassName(
      'brady-item-info-row-value'
    )[3]
    expect(chargingDepartment.textContent).toEqual('Morehouse-da')

    const department = bradyItemContent.getElementsByClassName(
      'brady-item-info-row-value'
    )[4]
    expect(department.textContent).toEqual('East-baton-rouge-da')

    const sourceDepartment = bradyItemContent.getElementsByClassName(
      'brady-item-info-row-value'
    )[5]
    expect(sourceDepartment.textContent).toEqual('Ouachita-da')

    const date = bradyItemContent.getElementsByClassName(
      'brady-item-info-row-value'
    )[6]
    expect(date.textContent).toEqual('Jun 13, 2019')

    const trackingIdOg = bradyItemContent.getElementsByClassName(
      'brady-item-info-row-value'
    )[7]
    expect(trackingIdOg.textContent).toEqual('123-abc')

    const bradyCopyLink = bradyItemContent.getElementsByClassName(
      'brady-item-copy-link'
    )[0]
    expect(bradyCopyLink.textContent).toEqual('Copy link')
  })

  it('highlights brady if it is the hightlighted item', () => {
    const mockScrollIntoView = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView

    const data = {
      allegationDesc: 'criminal violation',
      disposition: 'sustained',
      action: 'terminated',
      chargingDepartment: 'morehouse-da',
      department: 'east-baton-rouge-da',
      sourceDepartment: 'ouachita-da',
      date: '2019-06-13',
      trackingIdOg: '123-abc',
      highlight: true,
      showEventDetails: false,
    }

    const container = render(<BradyItem {...data} />)

    const { baseElement } = container

    const timelineBradyItem = baseElement.getElementsByClassName(
      'timeline-brady-item'
    )[0]

    expect(timelineBradyItem.classList).toContain('timeline-brady-highlight')
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
      allegationDesc: 'criminal violation',
      disposition: 'sustained',
      action: 'terminated',
      chargingDepartment: 'morehouse-da',
      department: 'east-baton-rouge-da',
      sourceDepartment: 'ouachita-da',
      date: '2019-06-13',
      trackingIdOg: '123-abc',
      highlight: true,
      showEventDetails: true,
    }

    const container = render(<BradyItem {...data} />)

    const { getByText, queryByText } = container

    const copyItem = getByText('Copy link')

    expect(queryByText('Link copied to your clipboard')).toBeFalsy()

    fireEvent.click(copyItem)

    expect(queryByText('Link copied to your clipboard')).toBeTruthy()

    act(() => {
      clock.tick(ANIMATION_DURATION + 100)
    })

    expect(queryByText('Link copied to your clipboard')).toBeFalsy()

    const expectedClipboard = bradyItemUrl(officerId, id)

    expect(mockPropmt).toHaveBeenCalledWith(
      'Copy to clipboard: Ctrl+C, Enter',
      expectedClipboard
    )
  })

  it('shows brady component when showEventDetails is true', () => {
    const data = {
      allegationDesc: 'criminal violation',
      disposition: 'sustained',
      action: 'terminated',
      chargingDepartment: 'morehouse-da',
      department: 'east-baton-rouge-da',
      sourceDepartment: 'ouachita-da',
      date: '2019-06-13',
      trackingIdOg: '123-abc',
      highlight: false,
      showEventDetails: true,
    }

    const container = render(<BradyItem {...data} />)

    const { baseElement } = container

    const bradyItemContent = baseElement.getElementsByClassName(
      'brady-item-content'
    )[0]

    expect(bradyItemContent).toBeTruthy()
  })

  it('analyzes expand brady card event', () => {
    const clock = sinon.useFakeTimers()

    const id = 1

    const data = {
      id,
      allegationDesc: 'criminal violation',
      disposition: 'sustained',
      action: 'terminated',
      chargingDepartment: 'morehouse-da',
      department: 'east-baton-rouge-da',
      sourceDepartment: 'ouachita-da',
      date: '2019-06-13',
      trackingIdOg: '123-abc',
      highlight: false,
    }

    const container = render(<BradyItem {...data} />)

    const { baseElement } = container

    const bradyItemHeader = baseElement.getElementsByClassName(
      'brady-item-header'
    )[0]

    fireEvent.click(bradyItemHeader)
    clock.tick(QUICK_ANIMATION_DURATION)

    expect(googleAnalytics.analyzeExpandEventCard).toHaveBeenCalledWith({
      type: TRACK_ITEM_TYPES.BRADY,
      id: id,
    })

    googleAnalytics.analyzeExpandEventCard.resetHistory()
    fireEvent.click(bradyItemHeader)
    expect(googleAnalytics.analyzeExpandEventCard).not.toHaveBeenCalled()
  })

  it('analyzes copy brady card link', () => {
    const clock = sinon.useFakeTimers()

    const id = 1

    const data = {
      id,
      allegationDesc: 'criminal violation',
      disposition: 'sustained',
      action: 'terminated',
      chargingDepartment: 'morehouse-da',
      department: 'east-baton-rouge-da',
      sourceDepartment: 'ouachita-da',
      date: '2019-06-13',
      trackingIdOg: '123-abc',
      highlight: false,
    }

    const container = render(<BradyItem {...data} />)

    const { baseElement } = container

    const bradyItemHeader = baseElement.getElementsByClassName(
      'brady-item-header'
    )[0]

    fireEvent.click(bradyItemHeader)
    clock.tick(QUICK_ANIMATION_DURATION)

    const bradyCopyLink = baseElement.getElementsByClassName(
      'brady-item-copy-link'
    )[0]

    fireEvent.click(bradyCopyLink)
    clock.tick(QUICK_ANIMATION_DURATION)

    expect(googleAnalytics.analyzeCopyCardLink).toHaveBeenCalledWith({
      type: TRACK_ITEM_TYPES.BRADY,
      id,
    })
  })
})
