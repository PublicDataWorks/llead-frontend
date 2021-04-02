import React from 'react'
import { render } from '@testing-library/react'

import Timeline from 'components/officer-page/timeline'
import ComplaintItem from 'components/officer-page/timeline/complaint-item'
import MainItem from 'components/officer-page/timeline/main-item'

const MockComplaintItemComponent = () => {
  return <div>Complaint Item</div>
}
jest.mock('components/officer-page/timeline/complaint-item', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockMainItemComponent = () => {
  return <div>Main Item</div>
}
jest.mock('components/officer-page/timeline/main-item', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

beforeAll(() => {
  ComplaintItem.mockImplementation(MockComplaintItemComponent)
  MainItem.mockImplementation(MockMainItemComponent)
})

beforeEach(() => {
  ComplaintItem.mockClear()
  MainItem.mockClear()
})

describe('Timeline component', () => {
  it('renders timeline with different item type', () => {
    const timelineData = [
      {
        groupName: 'Apr 1, 2020',
        isDateEvent: true,
        items: [
          {
            kind: 'LEFT',
          },
        ],
      },
      {
        groupName: 'Mar 10, 2019',
        isDateEvent: true,
        items: [
          {
            kind: 'COMPLAINT',
            trackingNumber: '10-03',
            ruleViolation: 'Officer rule violation 2019-03-10',
            paragraphViolation: 'Officer paragraph violation 2019-03-10',
            disposition: 'Officer dispostion 2019-03-10',
            action: 'Officer action 2019-03-10',
          },
          {
            kind: 'COMPLAINT',
            trackingNumber: '10-03-1',
            ruleViolation: 'Officer rule violation 2019-03-10 no1',
            paragraphViolation: 'Officer paragraph violation 2019-03-10 no1',
            disposition: 'Officer dispostion 2019-03-10 no1',
            action: 'Officer action 2019-03-10 no1',
          },
        ],
      },
      {
        groupName: '2018',
        isDateEvent: false,
        items: [
          {
            kind: 'COMPLAINT',
            trackingNumber: '2018',
            ruleViolation: 'Officer rule violation year 2018',
            paragraphViolation: 'Officer paragraph violation year 2018',
            disposition: 'Officer dispostion year 2018',
            action: 'Officer action year 2018',
          },
        ],
      },
    ]

    const container = render(<Timeline timeline={timelineData} />)

    const { baseElement } = container

    const timelineHeaderText = baseElement.getElementsByClassName(
      'timeline-header-text'
    )[0]
    expect(timelineHeaderText.textContent).toEqual('Timeline')

    const timelineGroups = baseElement.getElementsByClassName('timeline-group')

    const timelineFirstGroup = timelineGroups[0]
    expect(timelineFirstGroup.className).toBe(
      'timeline-group left-group date-event-group'
    )
    const firstGroupTitle = timelineFirstGroup.getElementsByClassName(
      'timeline-group-title'
    )[0]
    expect(firstGroupTitle.textContent).toEqual('Apr 1, 2020')
    const firstGroupItems = timelineFirstGroup.getElementsByClassName(
      'timeline-item'
    )
    expect(firstGroupItems.length).toBe(1)
    const firstGroupItem0 = firstGroupItems[0]
    const firstGroupItem0Line = firstGroupItem0.getElementsByClassName('line')
    expect(firstGroupItem0Line.length).toEqual(1)
    expect(MainItem.mock.calls[0][0]).toStrictEqual({
      kind: 'LEFT',
      className: 'has-connected-line left-item',
    })

    const timelineSecondGroup = timelineGroups[1]
    expect(timelineSecondGroup.className).toBe(
      'timeline-group date-event-group'
    )
    const secondGroupTitle = timelineSecondGroup.getElementsByClassName(
      'timeline-group-title'
    )[0]
    expect(secondGroupTitle.textContent).toEqual('Mar 10, 2019')
    const secondGroupItems = timelineSecondGroup.getElementsByClassName(
      'timeline-item'
    )
    expect(secondGroupItems.length).toBe(2)
    const secondGroupItem0 = secondGroupItems[0]
    const secondGroupItem0Line = secondGroupItem0.getElementsByClassName('line')
    expect(secondGroupItem0Line.length).toEqual(1)
    expect(ComplaintItem.mock.calls[0][0]).toStrictEqual({
      kind: 'COMPLAINT',
      trackingNumber: '10-03',
      ruleViolation: 'Officer rule violation 2019-03-10',
      paragraphViolation: 'Officer paragraph violation 2019-03-10',
      disposition: 'Officer dispostion 2019-03-10',
      action: 'Officer action 2019-03-10',
      className: 'has-connected-line',
    })
    const secondGroupItem1 = secondGroupItems[1]
    const secondGroupItem1Line = secondGroupItem1.getElementsByClassName('line')
    expect(secondGroupItem1Line.length).toEqual(1)
    expect(ComplaintItem.mock.calls[1][0]).toStrictEqual({
      kind: 'COMPLAINT',
      trackingNumber: '10-03-1',
      ruleViolation: 'Officer rule violation 2019-03-10 no1',
      paragraphViolation: 'Officer paragraph violation 2019-03-10 no1',
      disposition: 'Officer dispostion 2019-03-10 no1',
      action: 'Officer action 2019-03-10 no1',
      className: 'has-connected-line',
    })

    const timelineThirdGroup = timelineGroups[2]
    expect(timelineThirdGroup.className).toBe('timeline-group left-group')
    const thirdGroupTitle = timelineThirdGroup.getElementsByClassName(
      'timeline-group-title'
    )[0]
    expect(thirdGroupTitle.textContent).toEqual('2018')
    const thirdGroupItems = timelineThirdGroup.getElementsByClassName(
      'timeline-item'
    )
    expect(thirdGroupItems.length).toBe(1)
    const thirdGroupItem0 = thirdGroupItems[0]
    const thirdGroupItem0Line = thirdGroupItem0.getElementsByClassName('line')
    expect(thirdGroupItem0Line.length).toEqual(0)
    expect(ComplaintItem.mock.calls[2][0]).toStrictEqual({
      kind: 'COMPLAINT',
      trackingNumber: '2018',
      ruleViolation: 'Officer rule violation year 2018',
      paragraphViolation: 'Officer paragraph violation year 2018',
      disposition: 'Officer dispostion year 2018',
      action: 'Officer action year 2018',
      className: 'left-item',
    })
  })

  it('renders timeline with complaint item', () => {
    const timelineData = [
      {
        groupName: 'Mar 10, 2019',
        isDateEvent: true,
        items: [
          {
            kind: 'COMPLAINT',
            trackingNumber: '10-03',
            ruleViolation: 'Officer rule violation 2019-03-10',
            paragraphViolation: 'Officer paragraph violation 2019-03-10',
            disposition: 'Officer dispostion 2019-03-10',
            action: 'Officer action 2019-03-10',
          },
        ],
      },
    ]

    render(<Timeline timeline={timelineData} />)

    expect(ComplaintItem.mock.calls[0][0]).toStrictEqual({
      kind: 'COMPLAINT',
      trackingNumber: '10-03',
      ruleViolation: 'Officer rule violation 2019-03-10',
      paragraphViolation: 'Officer paragraph violation 2019-03-10',
      disposition: 'Officer dispostion 2019-03-10',
      action: 'Officer action 2019-03-10',
      className: 'has-connected-line left-item',
    })
  })

  it('renders timeline with left item', () => {
    const timelineData = [
      {
        groupName: 'Apr 1, 2020',
        isDateEvent: true,
        items: [
          {
            kind: 'LEFT',
          },
        ],
      },
    ]

    render(<Timeline timeline={timelineData} />)

    expect(MainItem.mock.calls[0][0]).toStrictEqual({
      kind: 'LEFT',
      className: 'has-connected-line left-item',
    })
  })

  it('renders timeline with joined item', () => {
    const timelineData = [
      {
        groupName: 'Apr 1, 2018',
        isDateEvent: true,
        items: [
          {
            kind: 'JOINED',
          },
        ],
      },
    ]

    render(<Timeline timeline={timelineData} />)

    expect(MainItem.mock.calls[0][0]).toStrictEqual({
      kind: 'JOINED',
      className: 'has-connected-line left-item',
    })
  })
})
