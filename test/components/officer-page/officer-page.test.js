import React from 'react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import MockStore from 'redux-mock-store'

import Officer from 'components/officer-page'
import { RECENT_ITEM_TYPES } from 'constants/common'
import TimelineContainer from 'containers/officer-page/timeline'

const MockTimelineComponent = () => {
  return <div>TimelineContainer</div>
}
jest.mock('containers/officer-page/timeline', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const mockHistoryPush = jest.fn()
const mockHistoryReplace = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
    replace: mockHistoryReplace,
  }),
}))

beforeAll(() => {
  TimelineContainer.mockImplementation(MockTimelineComponent)
})

beforeEach(() => {
  mockHistoryPush.mockClear()
  mockHistoryReplace.mockClear()
  TimelineContainer.mockClear()
})

describe('Officer component', () => {
  it('fetches data', () => {
    const fetchOfficerSpy = sinon.spy()

    render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Officer fetchOfficer={fetchOfficerSpy} />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    expect(fetchOfficerSpy).toHaveBeenCalledWith(1)
  })

  describe('save to reccent item', () => {
    it('saves to reccent item', () => {
      const saveRecentItemSpy = sinon.spy()

      const officerData = {
        id: 1,
        name: 'officer name',
        description: 'age-year-old race gender',
      }

      const recentData = {
        id: 1,
        name: 'officer name',
      }

      render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['officers/1']}>
            <Route path='officers/:id'>
              <Officer
                officer={officerData}
                saveRecentItem={saveRecentItemSpy}
                recentData={recentData}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      expect(saveRecentItemSpy).toHaveBeenCalledWith({
        type: RECENT_ITEM_TYPES.OFFICER,
        id: 1,
        data: recentData,
      })
    })

    it('does not save to recent item if isRequesting is true', () => {
      const saveRecentItemSpy = sinon.spy()

      const officerData = {
        id: 1,
        name: 'officer name',
        description: 'age-year-old race gender',
      }

      render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['officers/1']}>
            <Route path='officers/:id'>
              <Officer
                officer={officerData}
                saveRecentItem={saveRecentItemSpy}
                isRequesting={true}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      expect(saveRecentItemSpy).not.toHaveBeenCalled()
    })

    it('does not save to recent item if officer data id is not match id in url', () => {
      const saveRecentItemSpy = sinon.spy()

      const officerData = {
        id: 2,
        name: 'officer name',
        description: 'age-year-old race gender',
      }

      render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['officers/1']}>
            <Route path='officers/:id'>
              <Officer
                officer={officerData}
                saveRecentItem={saveRecentItemSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      expect(saveRecentItemSpy).not.toHaveBeenCalled()
    })
  })

  it('renders correctly', () => {
    const officerData = {
      salary: '$57,123,72/year',
      badges: ['123', '456'],
      complaintsCount: 0,
      departments: [
        {
          id: 'baton-rouge-pd',
          name: 'Baton Rouge PD',
        },
      ],
      description: 'age-year-old race gender',
      documentsCount: 1,
      name: 'officer name',
      latestRank: 'Lieutenant',
    }
    const timelinePeriod = '2012 and 2018-2020'
    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Officer officer={officerData} timelinePeriod={timelinePeriod} />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    const { baseElement } = container

    expect(
      baseElement.getElementsByClassName('officer-period')[0].textContent
    ).toEqual(
      'Data for this officer is limited to the\u00A0years\u00A02012 and 2018-2020'
    )

    expect(
      baseElement.getElementsByClassName('officer-rank')[0].textContent
    ).toEqual('Lieutenant')
    expect(
      baseElement.getElementsByClassName('officer-name')[0].textContent
    ).toEqual('Officer Name')

    const officerBasicInfoRows = baseElement.getElementsByClassName(
      'officer-basic-info-row'
    )
    expect(officerBasicInfoRows[0].textContent).toEqual('123, 456')
    expect(officerBasicInfoRows[1].textContent).toEqual(
      'age-year-old race gender'
    )
    expect(officerBasicInfoRows[2].textContent).toEqual('$57,123,72/year')

    expect(
      baseElement.getElementsByClassName('officer-department')[0].textContent
    ).toEqual('Baton Rouge PD')

    expect(
      baseElement.getElementsByClassName('officer-summary-info')[0].textContent
    ).toEqual('Officer Name is named in\u00A01 document.')
  })

  it('renders correctly with the timeline of single year', () => {
    const officerData = {
      salary: '$57,123,72/year',
      badges: ['123', '456'],
      complaintsCount: 0,
      departments: [
        {
          id: 'baton-rouge-pd',
          name: 'Baton Rouge PD',
        },
      ],
      description: 'age-year-old race gender',
      documentsCount: 1,
      name: 'officer name',
    }
    const timelinePeriod = '2012'
    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Officer officer={officerData} timelinePeriod={timelinePeriod} />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    const { baseElement } = container

    expect(
      baseElement.getElementsByClassName('officer-period')[0].textContent
    ).toEqual('Data for this officer is limited to the\u00A0year\u00A02012')
  })

  it('renders multi departments correctly', () => {
    const officerData = {
      salary: '$57,123,72/year',
      badges: ['123', '456'],
      complaintsCount: 0,
      departments: [
        {
          id: 'baton-rouge-pd',
          name: 'Baton Rouge PD',
        },
        {
          id: 'department-name',
          name: 'Department Name',
        },
      ],
      description: 'age-year-old race gender',
      documentsCount: 1,
      name: 'officer name',
      latestRank: 'Lieutenant',
    }
    const timelinePeriod = '2012 and 2018-2020'
    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Officer officer={officerData} timelinePeriod={timelinePeriod} />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    const { baseElement } = container

    expect(
      baseElement.getElementsByClassName('officer-period')[0].textContent
    ).toEqual(
      'Data for this officer is limited to the\u00A0years\u00A02012 and 2018-2020'
    )

    expect(
      baseElement.getElementsByClassName('officer-rank')[0].textContent
    ).toEqual('Lieutenant')
    expect(
      baseElement.getElementsByClassName('officer-name')[0].textContent
    ).toEqual('Officer Name')

    const officerBasicInfoRows = baseElement.getElementsByClassName(
      'officer-basic-info-row'
    )
    expect(officerBasicInfoRows[0].textContent).toEqual('123, 456')
    expect(officerBasicInfoRows[1].textContent).toEqual(
      'age-year-old race gender'
    )
    expect(officerBasicInfoRows[2].textContent).toEqual('$57,123,72/year')

    expect(
      baseElement.getElementsByClassName('officer-department')[0].textContent
    ).toEqual('Baton Rouge PD')

    expect(
      baseElement.getElementsByClassName('officer-department')[1].textContent
    ).toEqual('Department Name')

    expect(
      baseElement.getElementsByClassName('officer-summary-info')[0].textContent
    ).toEqual('Officer Name is named in\u00A01 document.')
  })

  describe('Data summary', () => {
    it('renders complaints summary', () => {
      const officerData = {
        name: 'officer name',
        complaintsCount: 2,
        documentsCount: 0,
      }

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['officers/1']}>
            <Route path='officers/:id'>
              <Officer officer={officerData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      expect(
        baseElement.getElementsByClassName('officer-summary-info')[0]
          .textContent
      ).toEqual(
        'Our data shows that Officer Name has\u00A02 misconduct allegations.'
      )
    })

    it('renders documents summary if no complaints', () => {
      const officerData = {
        name: 'officer name',
        complaintsCount: 0,
        documentsCount: 1,
      }

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['officers/1']}>
            <Route path='officers/:id'>
              <Officer officer={officerData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      expect(
        baseElement.getElementsByClassName('officer-summary-info')[0]
          .textContent
      ).toEqual('Officer Name is named in\u00A01 document.')
    })

    it('does not render officer summary if no complaints and documents', () => {
      const officerData = {
        complaintsCount: 0,
        documentsCount: 0,
      }

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['officers/1']}>
            <Route path='officers/:id'>
              <Officer officer={officerData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      expect(
        baseElement.getElementsByClassName('officer-summary-info').length
      ).toEqual(0)
    })
  })

  it('redirects to home if departmentId is NaN', () => {
    const invalidOfficerId = 'abcd'
    const officerData = {
      id: invalidOfficerId,
    }
    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={[`officers/${invalidOfficerId}`]}>
          <Route path='officers/:id'>
            <Officer officer={officerData} isRequesting={true} />
          </Route>
          <Route path='/'>Home</Route>
        </MemoryRouter>
      </Provider>
    )

    const { getByText } = container

    expect(getByText('Home')).toBeTruthy()
  })

  it('does not render if isRequesting', () => {
    const officerData = {}

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Officer officer={officerData} isRequesting={true} />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    const { baseElement } = container
    expect(baseElement.getElementsByClassName('officer-content').length).toBe(0)
  })

  it('renders officer timeline', () => {
    const officerData = {
      officer: {
        id: 1,
        name: 'officer name',
      },
      timeline: [
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
      ],
    }
    const mockSaveRecentItem = jest.fn()

    render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Officer {...officerData} saveRecentItem={mockSaveRecentItem} />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    expect(TimelineContainer.mock.calls[0][0]).toStrictEqual({
      officerId: 1,
      officerName: 'officer name',
    })
  })

  it('changes page title on name loaded and cleans up when unmout', () => {
    const officerData = {
      name: 'officer name',
    }

    const clearDocumentHeadStub = jest.fn()
    const setDocumentHeadstub = jest.fn()

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Officer
              officer={officerData}
              clearDocumentHead={clearDocumentHeadStub}
              setDocumentHead={setDocumentHeadstub}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    const { unmount } = container

    expect(setDocumentHeadstub).toHaveBeenCalledWith({
      title: 'officer name',
    })
    expect(clearDocumentHeadStub).not.toHaveBeenCalled()

    unmount()
    expect(clearDocumentHeadStub).toHaveBeenCalled()
  })

  it('clears offcier data on exitting page', () => {
    const officerData = {
      name: 'officer name',
    }

    const clearofficerStub = jest.fn()

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['officers/1']}>
          <Route path='officers/:id'>
            <Officer officer={officerData} clearOfficer={clearofficerStub} />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    const { unmount } = container

    expect(clearofficerStub).not.toHaveBeenCalled()

    unmount()

    expect(clearofficerStub).toHaveBeenCalled()
  })

  describe('handle officer location path', () => {
    it('changes pathname if officerSlug exists and is not equals to officerName path', () => {
      const officerData = {
        name: 'officer name',
      }

      const clearofficerStub = jest.fn()

      render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['officers/1/any']}>
            <Route path='officers/:id/:officerName'>
              <Officer officer={officerData} clearOfficer={clearofficerStub} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      expect(mockHistoryReplace).toHaveBeenCalledWith({
        pathname: '/officers/1/officer-name',
      })
    })

    it('does not change pathname if officerSlug does not exist', () => {
      const officerData = {}

      const clearofficerStub = jest.fn()

      render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['officers/1/any']}>
            <Route path='officers/:id/:officerName'>
              <Officer officer={officerData} clearOfficer={clearofficerStub} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      expect(mockHistoryReplace).not.toHaveBeenCalled()
    })

    it('does not change pathname if officerSlug is equal to officer path', () => {
      const officerData = {
        name: 'officer name',
      }

      const clearofficerStub = jest.fn()

      render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['officers/1/officer-name']}>
            <Route path='officers/:id/:officerName'>
              <Officer officer={officerData} clearOfficer={clearofficerStub} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      expect(mockHistoryReplace).not.toHaveBeenCalled()
    })
  })
})
