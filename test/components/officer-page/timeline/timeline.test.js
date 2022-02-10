import React from 'react'
import qs from 'qs'
import { act, fireEvent, render } from '@testing-library/react'
import sinon from 'sinon'
import * as rdd from 'react-device-detect'
import noop from 'lodash/noop'

import Timeline from 'components/officer-page/timeline'
import ComplaintItem from 'components/officer-page/timeline/complaint-item'
import MainItem from 'components/officer-page/timeline/main-item'
import DocumentCard from 'components/officer-page/timeline/document-card'
import SalaryChangeItem from 'components/officer-page/timeline/salary-change-item'
import RankChangeItem from 'components/officer-page/timeline/rank-change-item'
import TimelineFilters from 'components/officer-page/timeline/filters'
import UseOfForceItem from 'components/officer-page/timeline/use-of-force-item'
import NewsArticleCard from 'components/officer-page/timeline/news-article-card'
import * as reactDeviceDetect from 'react-device-detect'
import { MemoryRouter, Route } from 'react-router'
import { ANIMATION_DURATION, EVENT_TYPES } from 'constants/common'
import * as googleAnalytics from 'utils/google-analytics'

const MockComplaintItemComponent = () => {
  return <div>Complaint Item</div>
}
jest.mock('components/officer-page/timeline/complaint-item', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockUOFItemComponent = () => {
  return <div>Use of force Item</div>
}
jest.mock('components/officer-page/timeline/use-of-force-item', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockFiltersComponent = () => {
  return <div>Filters Item</div>
}
jest.mock('components/officer-page/timeline/filters', () => ({
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

const MockDocumentCardComponent = () => {
  return <div>Main Item</div>
}
jest.mock('components/officer-page/timeline/document-card', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockNewsArticleCardComponent = () => {
  return <div>News Article Item</div>
}
jest.mock('components/officer-page/timeline/news-article-card', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockSalaryChangeItemComponent = () => {
  return <div>Salary Change Item</div>
}
jest.mock('components/officer-page/timeline/salary-change-item', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockRankChangeItemComponent = () => {
  return <div>Rank Change Item</div>
}
jest.mock('components/officer-page/timeline/rank-change-item', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

beforeAll(() => {
  ComplaintItem.mockImplementation(MockComplaintItemComponent)
  MainItem.mockImplementation(MockMainItemComponent)
  DocumentCard.mockImplementation(MockDocumentCardComponent)
  SalaryChangeItem.mockImplementation(MockSalaryChangeItemComponent)
  RankChangeItem.mockImplementation(MockRankChangeItemComponent)
  TimelineFilters.mockImplementation(MockFiltersComponent)
  UseOfForceItem.mockImplementation(MockUOFItemComponent)
  NewsArticleCard.mockImplementation(MockNewsArticleCardComponent)
})

beforeEach(() => {
  ComplaintItem.mockClear()
  MainItem.mockClear()
  DocumentCard.mockClear()
  SalaryChangeItem.mockClear()
  RankChangeItem.mockClear()
  TimelineFilters.mockClear()
  UseOfForceItem.mockClear()
  NewsArticleCard.mockClear()
  sinon.stub(googleAnalytics, 'analyzeAction')
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
        leftGroup: true,
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
        leftGroup: false,
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
        leftGroup: true,
      },
    ]

    const mockSaveRecentItem = jest.fn()

    const container = render(
      <MemoryRouter initialEntries={['officers/1']}>
        <Route path='officers/:id'>
          <Timeline
            timeline={timelineData}
            saveRecentItem={mockSaveRecentItem}
          />
        </Route>
      </MemoryRouter>
    )

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
      saveRecentItem: mockSaveRecentItem,
      highlight: false,
      officerId: '1',
      showEventDetails: false,
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
      saveRecentItem: mockSaveRecentItem,
      highlight: false,
      officerId: '1',
      showEventDetails: false,
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
      saveRecentItem: mockSaveRecentItem,
      highlight: false,
      officerId: '1',
      showEventDetails: false,
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
      saveRecentItem: mockSaveRecentItem,
      highlight: false,
      officerId: '1',
      showEventDetails: false,
    })
  })

  it('renders nothing if timeline is empty', () => {
    const container = render(
      <MemoryRouter initialEntries={['officers/1']}>
        <Route path='officers/:id'>
          <Timeline timeline={[]} />
        </Route>
      </MemoryRouter>
    )

    const { baseElement } = container

    expect(baseElement.textContent).toEqual('')
  })

  describe('Timeline filters', () => {
    it('renders timeline filter on BrowserView', () => {
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

      const mockSaveRecentItem = jest.fn()
      const mockChangeFilterGroupKey = jest.fn()

      const container = render(
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Timeline
              timeline={timelineData}
              saveRecentItem={mockSaveRecentItem}
              timelineFilterGroups={[]}
              changeFilterGroupKey={mockChangeFilterGroupKey}
              filterGroupKey={''}
              hasEventDetails
            />
          </Route>
        </MemoryRouter>
      )

      const { baseElement, queryByText } = container

      const timelineHeaderActionsButton = baseElement.getElementsByClassName(
        'timeline-header-actions-btn'
      )[0]
      fireEvent.click(timelineHeaderActionsButton)

      expect(queryByText('Show event details')).toBeTruthy()
      expect(queryByText('Filter by event type')).toBeFalsy()
      expect(TimelineFilters.mock.calls[0][0]).toStrictEqual({
        className: 'center-items',
        timelineFilterGroups: [],
        changeFilterGroupKey: mockChangeFilterGroupKey,
        filterGroupKey: '',
      })
    })

    it('renders timeline filter on MobileView', () => {
      // eslint-disable-next-line react/prop-types
      const MobileView = ({ children }) => {
        return <div>{children}</div>
      }
      sinon.stub(reactDeviceDetect, 'MobileView').get(() => MobileView)
      sinon.stub(reactDeviceDetect, 'BrowserView').get(() => () => null)

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

      const mockSaveRecentItem = jest.fn()
      const mockChangeFilterGroupKey = jest.fn()

      const container = render(
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Timeline
              timeline={timelineData}
              saveRecentItem={mockSaveRecentItem}
              timelineFilterGroups={[]}
              changeFilterGroupKey={mockChangeFilterGroupKey}
              filterGroupKey={''}
              hasEventDetails
            />
          </Route>
        </MemoryRouter>
      )

      const { baseElement, queryByText } = container

      const timelineHeaderActionsButton = baseElement.getElementsByClassName(
        'timeline-header-actions-btn'
      )[0]
      fireEvent.click(timelineHeaderActionsButton)

      expect(
        baseElement.getElementsByClassName('timeline-header-actions')[0]
      ).toBeTruthy()

      expect(queryByText('Show event details')).toBeTruthy()
      expect(queryByText('Filter by event type')).toBeTruthy()

      const timelineFiltersProps = TimelineFilters.mock.calls[0][0]

      expect(timelineFiltersProps.timelineFilterGroups).toEqual([])
      expect(timelineFiltersProps.changeFilterGroupKey).toEqual(
        mockChangeFilterGroupKey
      )
      expect(timelineFiltersProps.filterGroupKey).toEqual('')

      const hideActionsPanel = timelineFiltersProps.hideActionsPanel
      act(() => {
        hideActionsPanel()
      })

      expect(
        baseElement.getElementsByClassName('timeline-header-actions')[0]
      ).toBeFalsy()
    })

    it('toggles showEventDetails on click', () => {
      const timelineData = [
        {
          groupName: 'Mar 10, 2019',
          isDateEvent: true,
          items: [
            {
              id: 123,
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
      const mockSaveRecentItem = jest.fn()

      const container = render(
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Timeline
              timeline={timelineData}
              saveRecentItem={mockSaveRecentItem}
              hasEventDetails
            />
          </Route>
        </MemoryRouter>
      )

      const { queryByText, baseElement } = container

      const firstComplaintItemProps = ComplaintItem.mock.calls[0][0]
      expect(firstComplaintItemProps.showEventDetails).toBeFalsy()

      const timelineHeaderActionsButton = baseElement.getElementsByClassName(
        'timeline-header-actions-btn'
      )[0]
      fireEvent.click(timelineHeaderActionsButton)

      const showEventDetailButton = queryByText('Show event details')
      fireEvent.click(showEventDetailButton)

      const secondComplaintItemProps = ComplaintItem.mock.calls[2][0]
      expect(secondComplaintItemProps.showEventDetails).toBeTruthy()
    })

    it('handles download file on click', async () => {
      const timelineData = [
        {
          groupName: 'Mar 10, 2019',
          isDateEvent: true,
          items: [
            {
              id: 123,
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
      const downloadOfficerTimelineStub = jest.fn()
      const officerName = 'Officer Name'

      const container = render(
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Timeline
              timeline={timelineData}
              hasEventDetails
              downloadOfficerTimeline={downloadOfficerTimelineStub}
              officerName={officerName}
            />
          </Route>
        </MemoryRouter>
      )

      const { baseElement } = container

      const timelineHeaderDownloadButton = baseElement.getElementsByClassName(
        'timeline-download-btn'
      )[0]
      fireEvent.click(timelineHeaderDownloadButton)

      expect(
        baseElement.getElementsByClassName('timeline-header-download')[0]
      ).toBeTruthy()

      const showDownloadFileButton = baseElement.getElementsByClassName(
        'show-download-file'
      )[0]
      await act(async () => {
        fireEvent.click(showDownloadFileButton)
      })

      expect(downloadOfficerTimelineStub).toHaveBeenCalledWith(
        '1',
        `Officer_Name.xlsx`
      )
      expect(
        baseElement.getElementsByClassName('timeline-header-download')[0]
      ).toBeFalsy()
    })
  })

  it('handles analyze download file on click', async () => {
    const timelineData = [
      {
        groupName: 'Mar 10, 2019',
        isDateEvent: true,
        items: [
          {
            id: 123,
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
    const downloadOfficerTimelineStub = jest.fn()
    const officerName = 'Officer Name'

    const container = render(
      <MemoryRouter initialEntries={['officers/1']}>
        <Route path='officers/:id'>
          <Timeline
            timeline={timelineData}
            hasEventDetails
            downloadOfficerTimeline={downloadOfficerTimelineStub}
            officerName={officerName}
          />
        </Route>
      </MemoryRouter>
    )

    const { baseElement } = container

    const timelineHeaderDownloadButton = baseElement.getElementsByClassName(
      'timeline-download-btn'
    )[0]
    fireEvent.click(timelineHeaderDownloadButton)

    expect(
      baseElement.getElementsByClassName('timeline-header-download')[0]
    ).toBeTruthy()

    const showDownloadFileButton = baseElement.getElementsByClassName(
      'show-download-file'
    )[0]
    await act(async () => {
      fireEvent.click(showDownloadFileButton)
    })

    expect(googleAnalytics.analyzeAction).toHaveBeenCalledWith({
      type: EVENT_TYPES.DOWNLOAD_SPREADSHEET,
      data: { officer_id: '1' },
    })
    expect(
      baseElement.getElementsByClassName('timeline-header-download')[0]
    ).toBeFalsy()
  })

  describe('Complaint item', () => {
    it('renders timeline with not highlight complaint item', () => {
      const timelineData = [
        {
          groupName: 'Mar 10, 2019',
          isDateEvent: true,
          items: [
            {
              id: 123,
              kind: 'COMPLAINT',
              trackingNumber: '10-03',
              ruleViolation: 'Officer rule violation 2019-03-10',
              paragraphViolation: 'Officer paragraph violation 2019-03-10',
              disposition: 'Officer dispostion 2019-03-10',
              action: 'Officer action 2019-03-10',
            },
          ],
          leftGroup: true,
        },
      ]
      const mockSaveRecentItem = jest.fn()

      render(
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Timeline
              timeline={timelineData}
              saveRecentItem={mockSaveRecentItem}
            />
          </Route>
        </MemoryRouter>
      )

      expect(ComplaintItem.mock.calls[0][0]).toStrictEqual({
        id: 123,
        kind: 'COMPLAINT',
        trackingNumber: '10-03',
        ruleViolation: 'Officer rule violation 2019-03-10',
        paragraphViolation: 'Officer paragraph violation 2019-03-10',
        disposition: 'Officer dispostion 2019-03-10',
        action: 'Officer action 2019-03-10',
        className: 'has-connected-line left-item',
        saveRecentItem: mockSaveRecentItem,
        highlight: false,
        officerId: '1',
        showEventDetails: false,
      })
    })

    it('renders timeline with highlight complaint item', () => {
      const clock = sinon.useFakeTimers()

      const timelineData = [
        {
          groupName: 'Mar 10, 2019',
          isDateEvent: true,
          items: [
            {
              id: 123,
              kind: 'COMPLAINT',
              trackingNumber: '10-03',
              ruleViolation: 'Officer rule violation 2019-03-10',
              paragraphViolation: 'Officer paragraph violation 2019-03-10',
              disposition: 'Officer dispostion 2019-03-10',
              action: 'Officer action 2019-03-10',
            },
          ],
          leftGroup: true,
        },
      ]
      const mockSaveRecentItem = jest.fn()

      const query = qs.stringify(
        { complaint_id: 123 },
        { addQueryPrefix: true }
      )

      render(
        <MemoryRouter
          initialEntries={[{ pathname: 'officers/1', search: query }]}
        >
          <Route path='officers/:id'>
            <Timeline
              timeline={timelineData}
              saveRecentItem={mockSaveRecentItem}
            />
          </Route>
        </MemoryRouter>
      )

      expect(ComplaintItem.mock.calls[1][0]).toStrictEqual({
        id: 123,
        kind: 'COMPLAINT',
        trackingNumber: '10-03',
        ruleViolation: 'Officer rule violation 2019-03-10',
        paragraphViolation: 'Officer paragraph violation 2019-03-10',
        disposition: 'Officer dispostion 2019-03-10',
        action: 'Officer action 2019-03-10',
        className: 'has-connected-line left-item',
        saveRecentItem: mockSaveRecentItem,
        highlight: true,
        officerId: '1',
        showEventDetails: false,
      })

      ComplaintItem.mockClear()

      act(() => {
        clock.tick(ANIMATION_DURATION + 100)
      })

      expect(ComplaintItem.mock.calls[0][0]).toStrictEqual({
        id: 123,
        kind: 'COMPLAINT',
        trackingNumber: '10-03',
        ruleViolation: 'Officer rule violation 2019-03-10',
        paragraphViolation: 'Officer paragraph violation 2019-03-10',
        disposition: 'Officer dispostion 2019-03-10',
        action: 'Officer action 2019-03-10',
        className: 'has-connected-line left-item',
        saveRecentItem: mockSaveRecentItem,
        highlight: false,
        officerId: '1',
        showEventDetails: false,
      })
    })
  })

  describe('Use of Force item', () => {
    it('renders timeline with not highlight use of force item', () => {
      const timelineData = [
        {
          groupName: 'Mar 10, 2019',
          isDateEvent: true,
          items: [
            {
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
            },
          ],
          leftGroup: true,
        },
      ]
      const mockSaveRecentItem = jest.fn()

      render(
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Timeline
              timeline={timelineData}
              saveRecentItem={mockSaveRecentItem}
            />
          </Route>
        </MemoryRouter>
      )

      expect(UseOfForceItem.mock.calls[0][0]).toStrictEqual({
        className: 'has-connected-line left-item',
        saveRecentItem: mockSaveRecentItem,
        highlight: false,
        officerId: '1',
        showEventDetails: false,
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
      })
    })

    it('renders timeline with highlight use of force item', () => {
      const clock = sinon.useFakeTimers()

      const timelineData = [
        {
          groupName: 'Mar 10, 2019',
          isDateEvent: true,
          items: [
            {
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
            },
          ],
          leftGroup: true,
        },
      ]
      const mockSaveRecentItem = jest.fn()

      const query = qs.stringify({ uof_id: 1 }, { addQueryPrefix: true })

      render(
        <MemoryRouter
          initialEntries={[{ pathname: 'officers/1', search: query }]}
        >
          <Route path='officers/:id'>
            <Timeline
              timeline={timelineData}
              saveRecentItem={mockSaveRecentItem}
            />
          </Route>
        </MemoryRouter>
      )

      expect(UseOfForceItem.mock.calls[1][0]).toStrictEqual({
        className: 'has-connected-line left-item',
        saveRecentItem: mockSaveRecentItem,
        highlight: true,
        showEventDetails: false,
        officerId: '1',
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
      })

      UseOfForceItem.mockClear()

      act(() => {
        clock.tick(ANIMATION_DURATION + 100)
      })

      expect(UseOfForceItem.mock.calls[0][0]).toStrictEqual({
        className: 'has-connected-line left-item',
        saveRecentItem: mockSaveRecentItem,
        highlight: false,
        officerId: '1',
        showEventDetails: false,
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
      })
    })
  })

  it('toggles show event details', () => {
    const timelineData = [
      {
        groupName: 'Mar 10, 2019',
        isDateEvent: true,
        items: [
          {
            id: 123,
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
    const mockSaveRecentItem = jest.fn()

    const container = render(
      <MemoryRouter initialEntries={['officers/1']}>
        <Route path='officers/:id'>
          <Timeline
            timeline={timelineData}
            saveRecentItem={mockSaveRecentItem}
            hasEventDetails
          />
        </Route>
      </MemoryRouter>
    )

    const { baseElement, queryByText } = container

    const timelineHeaderActionsButton = baseElement.getElementsByClassName(
      'timeline-header-actions-btn'
    )[0]
    fireEvent.click(timelineHeaderActionsButton)

    let showEventDetailsButton = queryByText('Show event details')
    let hideEventDetailsButton = queryByText('Hide event details')
    expect(showEventDetailsButton).toBeTruthy()
    expect(hideEventDetailsButton).toBeFalsy()

    fireEvent.click(showEventDetailsButton)
    fireEvent.click(timelineHeaderActionsButton)
    showEventDetailsButton = queryByText('Show event details')
    hideEventDetailsButton = queryByText('Hide event details')
    expect(showEventDetailsButton).toBeFalsy()
    expect(hideEventDetailsButton).toBeTruthy()
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
        leftGroup: true,
      },
    ]
    const mockSaveRecentItem = jest.fn()

    render(
      <MemoryRouter initialEntries={['officers/1']}>
        <Route path='officers/:id'>
          <Timeline
            timeline={timelineData}
            saveRecentItem={mockSaveRecentItem}
          />
        </Route>
      </MemoryRouter>
    )

    expect(MainItem.mock.calls[0][0]).toStrictEqual({
      kind: 'LEFT',
      className: 'has-connected-line left-item',
      saveRecentItem: mockSaveRecentItem,
      highlight: false,
      officerId: '1',
      showEventDetails: false,
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
        leftGroup: true,
      },
    ]
    const mockSaveRecentItem = jest.fn()

    render(
      <MemoryRouter initialEntries={['officers/1']}>
        <Route path='officers/:id'>
          <Timeline
            timeline={timelineData}
            saveRecentItem={mockSaveRecentItem}
          />
        </Route>
      </MemoryRouter>
    )

    expect(MainItem.mock.calls[0][0]).toStrictEqual({
      kind: 'JOINED',
      className: 'has-connected-line left-item',
      saveRecentItem: mockSaveRecentItem,
      highlight: false,
      officerId: '1',
      showEventDetails: false,
    })
  })

  it('renders timeline with news article item', () => {
    const newsArticleData = {
      id: 1,
      kind: 'NEWS_ARTICLE',
      sourceName: 'The Lens NOLA',
      title: 'News Article 2019-06-13',
      url: 'url',
    }
    const timelineData = [
      {
        groupName: 'Apr 1, 2018',
        isDateEvent: true,
        items: [
          {
            ...newsArticleData,
          },
        ],
        leftGroup: true,
      },
    ]

    render(
      <MemoryRouter initialEntries={['officers/1']}>
        <Route path='officers/:id'>
          <Timeline timeline={timelineData} />
        </Route>
      </MemoryRouter>
    )

    expect(NewsArticleCard.mock.calls[0][0]).toStrictEqual({
      id: 1,
      kind: 'NEWS_ARTICLE',
      sourceName: 'The Lens NOLA',
      title: 'News Article 2019-06-13',
      url: 'url',
      className: 'has-connected-line left-item',
      saveRecentItem: noop,
      highlight: false,
      officerId: '1',
      showEventDetails: false,
    })
  })

  it('renders timeline with document item', () => {
    const documentData = {
      id: 1,
      kind: 'DOCUMENT',
      documentType: 'csv',
      url: 'https://i.imgur.com/nHTFohI.csv',
      title: 'document',
      previewImageUrl: 'previewImageUrl',
      pagesCount: 3,
    }
    const timelineData = [
      {
        groupName: 'Apr 1, 2018',
        isDateEvent: true,
        items: [
          {
            ...documentData,
            saveRecentItem: mockSaveRecentItem,
            recentData: documentData,
          },
        ],
        leftGroup: true,
      },
    ]
    const mockSaveRecentItem = jest.fn()

    render(
      <MemoryRouter initialEntries={['officers/1']}>
        <Route path='officers/:id'>
          <Timeline
            timeline={timelineData}
            saveRecentItem={mockSaveRecentItem}
          />
        </Route>
      </MemoryRouter>
    )

    expect(DocumentCard.mock.calls[0][0]).toStrictEqual({
      id: 1,
      kind: 'DOCUMENT',
      documentType: 'csv',
      url: 'https://i.imgur.com/nHTFohI.csv',
      title: 'document',
      previewImageUrl: 'previewImageUrl',
      pagesCount: 3,
      recentData: documentData,
      className: 'has-connected-line left-item',
      saveRecentItem: mockSaveRecentItem,
      highlight: false,
      officerId: '1',
      showEventDetails: false,
    })
  })

  it('renders timeline with salary change item', () => {
    const timelineData = [
      {
        groupName: 'Jun 13, 2019',
        isDateEvent: true,
        items: [
          {
            kind: 'SALARY_CHANGE',
            salary: '$65k/year',
          },
        ],
        leftGroup: true,
      },
    ]

    const mockSaveRecentItem = jest.fn()

    render(
      <MemoryRouter initialEntries={['officers/1']}>
        <Route path='officers/:id'>
          <Timeline
            timeline={timelineData}
            saveRecentItem={mockSaveRecentItem}
          />
        </Route>
      </MemoryRouter>
    )

    expect(SalaryChangeItem.mock.calls[0][0]).toStrictEqual({
      kind: 'SALARY_CHANGE',
      salary: '$65k/year',
      saveRecentItem: mockSaveRecentItem,
      className: 'has-connected-line left-item',
      highlight: false,
      officerId: '1',
      showEventDetails: false,
    })
  })

  it('renders timeline with rank change item', () => {
    const timelineData = [
      {
        groupName: 'Jun 13, 2019',
        isDateEvent: true,
        items: [
          {
            kind: 'RANK_CHANGE',
            rank: 'senior police officer',
          },
        ],
        leftGroup: true,
      },
    ]

    const mockSaveRecentItem = jest.fn()

    render(
      <MemoryRouter initialEntries={['officers/1']}>
        <Route path='officers/:id'>
          <Timeline
            timeline={timelineData}
            saveRecentItem={mockSaveRecentItem}
          />
        </Route>
      </MemoryRouter>
    )

    expect(RankChangeItem.mock.calls[0][0]).toStrictEqual({
      kind: 'RANK_CHANGE',
      rank: 'senior police officer',
      saveRecentItem: mockSaveRecentItem,
      className: 'has-connected-line left-item',
      highlight: false,
      officerId: '1',
      showEventDetails: false,
    })
  })

  describe('Header Actions Button', () => {
    it('shows header actions button if has event details', () => {
      const timelineData = [
        {
          groupName: 'Mar 10, 2019',
          isDateEvent: true,
          items: [
            {
              id: 123,
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

      const container = render(
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Timeline timeline={timelineData} hasEventDetails={true} />
          </Route>
        </MemoryRouter>
      )

      const { baseElement } = container
      const timelineHeaderActionsContainer = baseElement.getElementsByClassName(
        'timeline-header-actions-container'
      )[0]

      expect(timelineHeaderActionsContainer).toBeTruthy()
    })

    it('shows header actions button if does not have event details but on mobile and has timelineFilter groups', () => {
      sinon.stub(rdd, 'isMobile').get(() => true)

      const timelineData = [
        {
          groupName: 'Mar 10, 2019',
          isDateEvent: true,
          items: [
            {
              id: 123,
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

      const container = render(
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Timeline
              timeline={timelineData}
              hasEventDetails={false}
              timelineFilterGroups={['any-filter-group']}
            />
          </Route>
        </MemoryRouter>
      )

      const { baseElement } = container
      const timelineHeaderActionsContainer = baseElement.getElementsByClassName(
        'timeline-header-actions-container'
      )[0]

      expect(timelineHeaderActionsContainer).toBeTruthy()
    })
  })
})
