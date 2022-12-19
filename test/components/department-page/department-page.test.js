import React from 'react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import { Provider } from 'react-redux'
import { render, fireEvent } from '@testing-library/react'
import MockStore from 'redux-mock-store'
import qs from 'qs'

import Department from 'components/department-page'
import { RECENT_ITEM_TYPES } from 'constants/common'
import SearchFeature from 'containers/common/search-feature'
import DepartmentMigratoryMap from 'containers/department-page/migratory-map'

const mockHistoryReplace = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    replace: mockHistoryReplace,
  }),
}))

jest.mock('containers/common/search-feature', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

jest.mock('containers/department-page/migratory-map', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockSearchFeatureComponent = () => {
  return <div>Search Feature</div>
}

const MockDepartmentMigratoryMapComponent = () => {
  return <div>Department Migratory Map</div>
}

beforeAll(() => {
  SearchFeature.mockImplementation(MockSearchFeatureComponent)
  DepartmentMigratoryMap.mockImplementation(MockDepartmentMigratoryMapComponent)
})

beforeEach(() => {
  mockHistoryReplace.mockClear()
  SearchFeature.mockClear()
  DepartmentMigratoryMap.mockClear()
})

describe('Department component', () => {
  it('should fetch data', () => {
    const fetchDepartmentSpy = sinon.spy()

    render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
          <Route path='dept/:id'>
            <Department fetchDepartment={fetchDepartmentSpy} />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    expect(fetchDepartmentSpy).toHaveBeenCalledWith('baton-rouge-pd')
  })

  describe('save to reccent item', () => {
    it('should save to reccent item', () => {
      const saveRecentItemSpy = sinon.spy()

      const departmentData = {
        id: 'baton-rouge-pd',
        name: 'Baton Rouge PD',
        city: 'department city',
        locationMapUrl: null,
        parish: 'department parish',
      }

      const recentData = {
        id: 'baton-rouge-pd',
        name: 'Baton Rouge PD',
      }

      render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                saveRecentItem={saveRecentItemSpy}
                recentData={recentData}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      expect(saveRecentItemSpy).toHaveBeenCalledWith({
        type: RECENT_ITEM_TYPES.DEPARTMENT,
        id: 'baton-rouge-pd',
        data: recentData,
      })
    })

    it('should not save to recent item if isRequesting is true', () => {
      const saveRecentItemSpy = sinon.spy()

      const departmentData = {
        id: 1,
        name: 'department name',
      }

      render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                saveRecentItem={saveRecentItemSpy}
                isRequesting={true}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      expect(saveRecentItemSpy).not.toHaveBeenCalled()
    })

    it('should not save to recent item if department data id is not match id in url', () => {
      const saveRecentItemSpy = sinon.spy()

      const departmentData = {
        id: 2,
        name: 'department name',
      }

      render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                saveRecentItem={saveRecentItemSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      expect(saveRecentItemSpy).not.toHaveBeenCalled()
    })
  })

  it('should render correctly', () => {
    const departmentData = {
      id: 1,
      name: 'Department data',
      city: 'News Orleans',
      address: '1 Third St #1, New Orleans, LA 70130',
      phone: '(504) 891-7585',
      documentsCount: 3,
      recentDocumentsCount: 2,
      datasetsCount: 5,
      recentDatasetsCount: 1,
      location: [1, 1],
      parish: 'Orleans Parish',
      officersCount: 1000,
      newsArticlesCount: 123,
      recentNewsArticlesCount: 12,
      incidentForceCount: 1,
      dataPeriod: '1998-2019',
      sustainedComplaintPercentage: 25,
      complaintsCount: 40,
    }

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
          <Route path='dept/:id'>
            <Department department={departmentData} />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    const { baseElement } = container
    expect(
      baseElement.getElementsByClassName('department-title')[0].textContent
    ).toEqual('Agency')
    expect(
      baseElement.getElementsByClassName('department-name')[0].textContent
    ).toEqual('Department data')

    expect(DepartmentMigratoryMap.mock.calls[0][0]).toMatchObject({
      id: 'baton-rouge-pd',
      department: {
        id: 1,
        name: 'Department data',
        city: 'News Orleans',
        address: '1 Third St #1, New Orleans, LA 70130',
        phone: '(504) 891-7585',
        documentsCount: 3,
        recentDocumentsCount: 2,
        datasetsCount: 5,
        recentDatasetsCount: 1,
        location: [1, 1],
        parish: 'Orleans Parish',
        officersCount: 1000,
        newsArticlesCount: 123,
        recentNewsArticlesCount: 12,
        incidentForceCount: 1,
        dataPeriod: '1998-2019',
        sustainedComplaintPercentage: 25,
        complaintsCount: 40,
      },
    })

    const departmentSummary = baseElement.getElementsByClassName(
      'department-summary'
    )[0]
    expect(
      departmentSummary.getElementsByClassName('summary-item-count')[0]
        .textContent
    ).toEqual('1,000')
    expect(
      departmentSummary.getElementsByClassName('summary-item-title')[0]
        .textContent
    ).toEqual('officers')
    expect(
      departmentSummary.getElementsByClassName('summary-item-count')[1]
        .textContent
    ).toEqual('5')
    expect(
      departmentSummary.getElementsByClassName('summary-item-title')[1]
        .textContent
    ).toEqual('datasets')
    expect(
      departmentSummary.getElementsByClassName('recent-summary-item')[0]
        .textContent
    ).toEqual('+1 in the past 30 days')

    expect(
      departmentSummary.getElementsByClassName('summary-item-count')[2]
        .textContent
    ).toEqual('123')
    expect(
      departmentSummary.getElementsByClassName('summary-item-title')[2]
        .textContent
    ).toEqual('news articles')
    expect(
      departmentSummary.getElementsByClassName('recent-summary-item')[1]
        .textContent
    ).toEqual('+12 in the past 30 days')
    expect(
      departmentSummary.getElementsByClassName('summary-item-count')[3]
        .textContent
    ).toEqual('40')
    expect(
      departmentSummary.getElementsByClassName('summary-item-title')[3]
        .textContent
    ).toEqual('allegations')
    expect(
      departmentSummary.getElementsByClassName('recent-summary-item')[2]
        .textContent
    ).toEqual('25% sustained allegations')
    expect(
      departmentSummary.getElementsByClassName('summary-item-count')[4]
        .textContent
    ).toEqual('3')
    expect(
      departmentSummary.getElementsByClassName('summary-item-title')[4]
        .textContent
    ).toEqual('documents')
    expect(
      departmentSummary.getElementsByClassName('recent-summary-item')[3]
        .textContent
    ).toEqual('+2 in the past 30 days')
    expect(
      departmentSummary.getElementsByClassName('summary-item-count')[5]
        .textContent
    ).toEqual('1')
    expect(
      departmentSummary.getElementsByClassName('summary-item-title')[5]
        .textContent
    ).toEqual('force incident')
  })

  it('should not render if isRequesting', () => {
    const departmentData = {
      id: 1,
      city: 'department city',
      complaintsCount: 2,
      documentsCount: 1,
      locationMapUrl: null,
      name: 'department name',
      parish: 'department parish',
      officersCount: 3,
    }

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
          <Route path='dept/:id'>
            <Department department={departmentData} isRequesting={true} />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    const { baseElement } = container
    expect(
      baseElement.getElementsByClassName('department-content').length
    ).toBe(0)
  })

  it('does not render if department is empty', () => {
    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
          <Route path='dept/:id'>
            <Department department={{}} />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    const { baseElement } = container
    expect(
      baseElement.getElementsByClassName('department-content').length
    ).toBe(0)
  })

  it('does not render migratory map if no location', () => {
    const departmentData = {
      id: 1,
      city: 'department city',
      complaintsCount: 2,
      documentsCount: 1,
      location: null,
      name: 'department name',
      parish: 'department parish',
      officersCount: 3,
    }
    const fetchDepartmentSpy = sinon.spy()

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
          <Route path='dept/:id'>
            <Department
              department={departmentData}
              fetchDepartment={fetchDepartmentSpy}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    const { queryByText } = container

    expect(queryByText('Department Migratory Map')).toBeFalsy()
  })

  describe('summary section', () => {
    it('renders 6 categories', () => {
      const departmentData = {
        id: 1,
        documentsCount: 3,
        datasetsCount: 5,
        officersCount: 1000,
        newsArticlesCount: 123,
        incidentForceCount: 1,
        complaintsCount: 40,
      }

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department department={departmentData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      const departmentSummary = baseElement.getElementsByClassName(
        'department-summary'
      )[0]

      expect(
        departmentSummary.getElementsByClassName('summary-item-6').length
      ).toEqual(6)
    })

    it('renders 5 categories with both officers and allegations', () => {
      const departmentData = {
        id: 1,
        documentsCount: 3,
        datasetsCount: 5,
        officersCount: 1000,
        newsArticlesCount: 0,
        incidentForceCount: 1,
        complaintsCount: 40,
      }

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department department={departmentData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      const departmentSummary = baseElement.getElementsByClassName(
        'department-summary'
      )[0]

      expect(
        departmentSummary.getElementsByClassName('summary-item-5').length
      ).toEqual(5)

      expect(
        departmentSummary.getElementsByClassName('summary-item-stretch').length
      ).toEqual(3)

      expect(
        departmentSummary.getElementsByClassName('summary-item-shrink').length
      ).toEqual(1)
    })

    it('renders 5 categories with either officers or allegations', () => {
      const departmentData = {
        id: 1,
        documentsCount: 3,
        datasetsCount: 5,
        officersCount: 0,
        newsArticlesCount: 10,
        incidentForceCount: 1,
        complaintsCount: 40,
      }

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department department={departmentData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      const departmentSummary = baseElement.getElementsByClassName(
        'department-summary'
      )[0]

      expect(
        departmentSummary.getElementsByClassName('summary-item-5').length
      ).toEqual(5)

      expect(
        departmentSummary.getElementsByClassName('summary-item-stretch').length
      ).toEqual(2)

      expect(
        departmentSummary.getElementsByClassName('summary-item-shrink').length
      ).toEqual(0)
    })

    it('renders 4 categories', () => {
      const departmentData = {
        id: 1,
        documentsCount: 3,
        datasetsCount: 5,
        officersCount: 0,
        newsArticlesCount: 0,
        incidentForceCount: 1,
        complaintsCount: 40,
      }

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department department={departmentData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      const departmentSummary = baseElement.getElementsByClassName(
        'department-summary'
      )[0]

      expect(
        departmentSummary.getElementsByClassName('summary-item-4').length
      ).toEqual(4)
    })

    it('renders 3 categories', () => {
      const departmentData = {
        id: 1,
        documentsCount: 0,
        datasetsCount: 5,
        officersCount: 0,
        newsArticlesCount: 0,
        incidentForceCount: 1,
        complaintsCount: 40,
      }

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department department={departmentData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      const departmentSummary = baseElement.getElementsByClassName(
        'department-summary'
      )[0]

      expect(
        departmentSummary.getElementsByClassName('summary-item-3').length
      ).toEqual(3)
    })

    it('renders 2 categories', () => {
      const departmentData = {
        id: 1,
        documentsCount: 0,
        datasetsCount: 5,
        officersCount: 0,
        newsArticlesCount: 0,
        incidentForceCount: 1,
        complaintsCount: 0,
      }

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department department={departmentData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      const departmentSummary = baseElement.getElementsByClassName(
        'department-summary'
      )[0]

      expect(
        departmentSummary.getElementsByClassName('summary-item-2').length
      ).toEqual(2)
    })

    it('renders 1 category', () => {
      const departmentData = {
        id: 1,
        documentsCount: 0,
        datasetsCount: 0,
        officersCount: 0,
        newsArticlesCount: 0,
        incidentForceCount: 1,
        complaintsCount: 0,
      }

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department department={departmentData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      const departmentSummary = baseElement.getElementsByClassName(
        'department-summary'
      )[0]

      expect(
        departmentSummary.getElementsByClassName('summary-item-1').length
      ).toEqual(1)
    })

    it('renders 0 categories if there are no information', () => {
      const departmentData = {
        id: 1,
        documentsCount: 0,
        datasetsCount: 0,
        officersCount: 0,
        newsArticlesCount: 0,
        incidentForceCount: 0,
        complaintsCount: 0,
      }

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department department={departmentData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      const departmentSummary = baseElement.getElementsByClassName(
        'department-summary'
      )[0]

      expect(
        departmentSummary.getElementsByClassName('summary-item').length
      ).toEqual(0)
    })
  })

  it('hides sustained allegations if there data is zero', () => {
    const departmentData = {
      id: 1,
      documentsCount: 0,
      datasetsCount: 0,
      officersCount: 0,
      newsArticlesCount: 0,
      complaintsCount: 1,
      sustainedComplaintPercentage: 0,
    }

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
          <Route path='dept/:id'>
            <Department department={departmentData} />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    const { queryByText } = container
    expect(queryByText('sustained allegations')).toBeFalsy()
  })

  describe('render with datasets', () => {
    it('set default expanded csv files if csv params is null', () => {
      const departmentData = {
        id: 1,
        city: 'department city',
        complaintsCount: 2,
        documentsCount: 1,
        locationMapUrl: null,
        name: 'department name',
        parish: 'department parish',
        officersCount: 3,
      }

      const datasets = [
        {
          id: 2,
          name: 'Com Madison Village pd',
          slug: 'com-madisonville-pd',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat idatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          url:
            'https://www.wrgl.co/em/@ipno/r/com-madisonville-pd/7e47b16aba077e1edf2e236ad2027cc6',
          downloadUrl:
            'https://www.wrgl.co/api/v1/users/ipno/repos/com-madisonville-pd/commits/7e47b16aba077e1edf2e236ad2027cc6/csv',
          defaultExpanded: true,
        },
      ]

      const fetchDepartmentSpy = sinon.spy()
      const fetchDatasetsSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                datasets={datasets}
                fetchDepartment={fetchDepartmentSpy}
                fetchDatasets={fetchDatasetsSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      const wrglContainer = baseElement.getElementsByClassName(
        'wrgl-container'
      )[0]
      expect(wrglContainer.classList.value).toContain('wrgl-expanded')
    })

    it('set array csv files if csv params is string', () => {
      const departmentData = {
        id: 1,
        city: 'department city',
        complaintsCount: 2,
        documentsCount: 1,
        locationMapUrl: null,
        name: 'department name',
        parish: 'department parish',
        officersCount: 3,
      }

      const datasets = [
        {
          id: 2,
          name: 'Com Madison Village pd',
          slug: 'com-madisonville-pd',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat idatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          url:
            'https://www.wrgl.co/em/@ipno/r/com-madisonville-pd/7e47b16aba077e1edf2e236ad2027cc6',
          downloadUrl:
            'https://www.wrgl.co/api/v1/users/ipno/repos/com-madisonville-pd/commits/7e47b16aba077e1edf2e236ad2027cc6/csv',
          defaultExpanded: true,
        },
      ]

      const fetchDepartmentSpy = sinon.spy()
      const fetchDatasetsSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter
            initialEntries={[
              {
                pathname: 'dept/baton-rouge-pd',
                search: qs.stringify({ csv: 'com-madisonville-pd' }),
              },
            ]}
          >
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                datasets={datasets}
                fetchDepartment={fetchDepartmentSpy}
                fetchDatasets={fetchDatasetsSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      const wrglContainer = baseElement.getElementsByClassName(
        'wrgl-container'
      )[0]
      expect(wrglContainer.classList.value).toContain('wrgl-expanded')
    })

    it('set array csv files if csv params is array', () => {
      const departmentData = {
        id: 1,
        city: 'department city',
        complaintsCount: 2,
        documentsCount: 1,
        locationMapUrl: null,
        name: 'department name',
        parish: 'department parish',
        officersCount: 3,
      }

      const datasets = [
        {
          id: 2,
          name: 'Com Madison Village pd',
          slug: 'com-madisonville-pd',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat idatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          url:
            'https://www.wrgl.co/em/@ipno/r/com-madisonville-pd/7e47b16aba077e1edf2e236ad2027cc6',
          downloadUrl:
            'https://www.wrgl.co/api/v1/users/ipno/repos/com-madisonville-pd/commits/7e47b16aba077e1edf2e236ad2027cc6/csv',
          defaultExpanded: true,
        },
      ]

      const fetchDepartmentSpy = sinon.spy()
      const fetchDatasetsSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter
            initialEntries={[
              {
                pathname: 'dept/baton-rouge-pd',
                search: qs.stringify({
                  csv: ['123', 'com-madisonville-pd'],
                }),
              },
            ]}
          >
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                datasets={datasets}
                fetchDepartment={fetchDepartmentSpy}
                fetchDatasets={fetchDatasetsSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      const wrglContainer = baseElement.getElementsByClassName(
        'wrgl-container'
      )[0]
      expect(wrglContainer.classList.value).toContain('wrgl-expanded')
    })
  })

  describe('#updateExpandedCsvFiles', () => {
    it('expands item and then adds slug to the expandedCsvFiles', () => {
      const departmentData = {
        id: 1,
        city: 'department city',
        complaintsCount: 2,
        documentsCount: 1,
        locationMapUrl: null,
        name: 'department name',
        parish: 'department parish',
        officersCount: 3,
      }

      const datasets = [
        {
          id: 2,
          name: 'Com Madison Village pd',
          slug: 'com-madisonville-pd',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat idatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          url:
            'https://www.wrgl.co/em/@ipno/r/com-madisonville-pd/7e47b16aba077e1edf2e236ad2027cc6',
          downloadUrl:
            'https://www.wrgl.co/api/v1/users/ipno/repos/com-madisonville-pd/commits/7e47b16aba077e1edf2e236ad2027cc6/csv',
          defaultExpanded: false,
        },
      ]

      const fetchDepartmentSpy = sinon.spy()
      const fetchDatasetsSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter
            initialEntries={[
              {
                pathname: 'dept/baton-rouge-pd',
                search: qs.stringify({ csv: ['slug-1'] }),
              },
            ]}
          >
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                datasets={datasets}
                fetchDepartment={fetchDepartmentSpy}
                fetchDatasets={fetchDatasetsSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { getByTestId } = container

      const expandArrowElement = getByTestId('test--expand-control')
      fireEvent.click(expandArrowElement)

      expect(mockHistoryReplace).toHaveBeenCalledWith({
        search: qs.stringify(
          { csv: ['slug-1', 'com-madisonville-pd'] },
          { arrayFormat: 'comma', encode: false }
        ),
      })
    })

    it('expands item and then adds slug to the expandedCsvFiles', () => {
      const departmentData = {
        id: 1,
        city: 'department city',
        complaintsCount: 2,
        documentsCount: 1,
        locationMapUrl: null,
        name: 'department name',
        parish: 'department parish',
        officersCount: 3,
      }

      const datasets = [
        {
          id: 2,
          name: 'Com Madison Village pd',
          slug: 'com-madisonville-pd',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat idatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          url:
            'https://www.wrgl.co/em/@ipno/r/com-madisonville-pd/7e47b16aba077e1edf2e236ad2027cc6',
          downloadUrl:
            'https://www.wrgl.co/api/v1/users/ipno/repos/com-madisonville-pd/commits/7e47b16aba077e1edf2e236ad2027cc6/csv',
          defaultExpanded: false,
        },
      ]

      const fetchDepartmentSpy = sinon.spy()
      const fetchDatasetsSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter
            initialEntries={[
              {
                pathname: 'dept/baton-rouge-pd',
                search: qs.stringify({
                  csv: ['slug-1', 'com-madisonville-pd'],
                }),
              },
            ]}
          >
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                datasets={datasets}
                fetchDepartment={fetchDepartmentSpy}
                fetchDatasets={fetchDatasetsSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { getByTestId } = container

      const expandArrowElement = getByTestId('test--expand-control')
      fireEvent.click(expandArrowElement)

      expect(mockHistoryReplace).toHaveBeenCalledWith({
        search: qs.stringify(
          { csv: ['slug-1'] },
          { arrayFormat: 'comma', encode: false }
        ),
      })
    })
  })

  describe('render data period info', () => {
    it('should render with no comma if dataPeriod array is one value', () => {
      const departmentData = {
        id: 1,
        dataPeriod: ['2018'],
      }

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department department={departmentData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container
      expect(
        baseElement.getElementsByClassName('department-period')[0].textContent
      ).toEqual(
        'Incident data for this agency is limited to the years\u00A02018'
      )
    })

    it('should render with "and" if dataPeriod array contains two value', () => {
      const departmentData = {
        id: 1,
        dataPeriod: ['2018', '2020'],
      }

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department department={departmentData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container
      expect(
        baseElement.getElementsByClassName('department-period')[0].textContent
      ).toEqual(
        'Incident data for this agency is limited to the years\u00A02018 and 2020'
      )
    })

    it('should render with comma and "and" if dataPeriod array contains more than two value', () => {
      const departmentData = {
        id: 1,
        dataPeriod: ['2013', '2015', '2017', '2020'],
      }

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department department={departmentData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container
      expect(
        baseElement.getElementsByClassName('department-period')[0].textContent
      ).toEqual(
        'Incident data for this agency is limited to the years\u00A02013, 2015, 2017 and 2020'
      )
    })

    it('should not render period if dataPeriod array is empty', () => {
      const departmentData = {
        id: 1,
        dataPeriod: [],
      }

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department department={departmentData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container
      expect(
        baseElement.getElementsByClassName('department-period')[0]
      ).toBeFalsy()
    })
  })

  it('changes page title on name loaded and cleans up when unmout', () => {
    const departmentData = {
      id: 1,
      name: 'department name',
    }

    const clearDocumentHeadStub = jest.fn()
    const setDocumentHeadstub = jest.fn()

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
          <Route path='dept/:id'>
            <Department
              department={departmentData}
              clearDocumentHead={clearDocumentHeadStub}
              setDocumentHead={setDocumentHeadstub}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    const { unmount } = container

    expect(setDocumentHeadstub).toHaveBeenCalledWith({
      title: 'department name',
    })
    expect(clearDocumentHeadStub).not.toHaveBeenCalled()

    unmount()
    expect(clearDocumentHeadStub).toHaveBeenCalled()
  })

  describe('render featured officers', () => {
    it('renders featured officers correctly', () => {
      const departmentData = {
        id: 1,
        name: 'department name',
      }

      const featuredOfficers = [
        {
          id: 15248,
          name: 'Jayson Germann',
          badges: ['84'],
          isStarred: true,
          complaintsCount: 84,
          useOfForcesCount: 0,
        },
        {
          id: 2436,
          name: 'Derrick Burmaster',
          badges: ['85'],
          isStarred: false,
          complaintsCount: 80,
          useOfForcesCount: 15,
        },
      ]

      const fetchFeaturedOfficerSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                featuredOfficers={featuredOfficers}
                fetchFeaturedOfficers={fetchFeaturedOfficerSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { getByText, queryByText, baseElement } = container

      const featuredOfficerTitle = queryByText('Featured officers')
      expect(featuredOfficerTitle).toBeTruthy()
      expect(featuredOfficerTitle.className).toContain('carousel-title')

      const featuredOfficer1Name = getByText('Jayson Germann')
      expect(featuredOfficer1Name).toBeTruthy()

      const featuredOfficer2Name = getByText('Derrick Burmaster')
      expect(featuredOfficer2Name).toBeTruthy()

      const searchButton = baseElement.getElementsByClassName('search-icon')[0]
      fireEvent.click(searchButton)
    })

    it('does not render featured officers if items are empty', () => {
      const departmentData = {
        id: 1,
        name: 'department name',
      }

      const featuredOfficers = []

      const fetchFeaturedOfficerSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                featuredOfficers={featuredOfficers}
                fetchFeaturedOfficers={fetchFeaturedOfficerSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { queryByText } = container

      const featuredOfficerTitle = queryByText('Featured officers')
      expect(featuredOfficerTitle).toBeFalsy()
    })
  })

  describe('render featured documents', () => {
    it('renders featured documents correctly', () => {
      const departmentData = {
        id: 1,
        name: 'department name',
      }

      const featuredDocuments = [
        {
          id: 15248,
          title: 'Appeal hearing: Eric Curlee on 2020-3-12',
          url: 'https://i.imgur.com/nHTFohI.csv',
          isStarred: true,
          incidentDate: '2020-03-12',
          previewImageUrl: 'https://i.imgur.com/nHTFohI.png',
          pagesCount: 5,
        },
        {
          id: 770,
          title: 'Appeal hearing: Santiago St. Clair on 2020-12-10',
          url: 'https://i.imgur.com/nHTFohI.csv',
          isStarred: false,
          incidentDate: '2020-12-10',
          previewImageUrl: 'https://i.imgur.com/nHTFohI.png',
          pagesCount: 5,
        },
      ]

      const fetchFeaturedDocumentSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                featuredDocuments={featuredDocuments}
                fetchFeaturedDocuments={fetchFeaturedDocumentSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { getByText, queryByText } = container

      const featuredDocumentTitle = queryByText('Featured documents')
      expect(featuredDocumentTitle).toBeTruthy()
      expect(featuredDocumentTitle.className).toContain('carousel-title')

      const featuredDocument1Title = getByText(
        'Appeal hearing: Eric Curlee on 2020-3-12'
      )
      expect(featuredDocument1Title).toBeTruthy()

      const featuredDocument2Title = getByText(
        'Appeal hearing: Santiago St. Clair on 2020-12-10'
      )
      expect(featuredDocument2Title).toBeTruthy()
    })

    it('does not render featured documents if items are empty', () => {
      const departmentData = {
        id: 1,
        name: 'department name',
      }

      const featuredDocuments = []

      const fetchFeaturedDocumentSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                featuredDocuments={featuredDocuments}
                fetchFeaturedDocuments={fetchFeaturedDocumentSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { queryByText } = container

      const featuredOfficerTitle = queryByText('Featured documents')
      expect(featuredOfficerTitle).toBeFalsy()
    })
  })

  describe('render featured news articles', () => {
    it('renders featured news articles correctly', () => {
      const departmentData = {
        id: 1,
        name: 'department name',
      }

      const featuredNewsArticles = [
        {
          id: 15248,
          title: 'Appeal hearing: Eric Curlee on 2020-3-12',
          url: 'https://i.imgur.com/nHTFohI.csv',
          isStarred: true,
          publishedDate: '2020-03-12',
          sourceDisplayName: 'The lens 1',
        },
        {
          id: 770,
          title: 'Appeal hearing: Santiago St. Clair on 2020-12-10',
          url: 'https://i.imgur.com/nHTFohI.csv',
          isStarred: false,
          publishedDate: '2020-12-10',
          sourceDisplayName: 'The lens 2',
        },
      ]

      const fetchFeaturedNewsArticleSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                featuredNewsArticles={featuredNewsArticles}
                fetchFeaturedNewsArticles={fetchFeaturedNewsArticleSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement, getByText, queryByText } = container

      const featuredNewsArticleTitle = queryByText('Featured news')
      expect(featuredNewsArticleTitle).toBeTruthy()
      expect(featuredNewsArticleTitle.className).toContain('carousel-title')

      const featuredNewsArticle1Title = getByText(
        'Appeal hearing: Eric Curlee on 2020-3-12'
      )
      expect(featuredNewsArticle1Title).toBeTruthy()

      expect(
        baseElement.getElementsByClassName('star-corner')[0].classList.length
      ).toEqual(1)

      const featuredNewsArticle2Title = getByText(
        'Appeal hearing: Santiago St. Clair on 2020-12-10'
      )
      expect(featuredNewsArticle2Title).toBeTruthy()
    })

    it('does not render featured news articles if items are empty', () => {
      const departmentData = {
        id: 1,
        name: 'department name',
      }

      const featuredNewsArticles = []

      const fetchFeaturedNewsArticleSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                featuredNewsArticles={featuredNewsArticles}
                fetchFeaturedNewsArticles={fetchFeaturedNewsArticleSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { queryByText } = container

      const featuredOfficerTitle = queryByText('Featured news')
      expect(featuredOfficerTitle).toBeFalsy()
    })
  })

  describe('searchFeature component', () => {
    it('renders correctly', () => {
      const departmentData = {
        id: 'baton-rouge-pd',
        name: 'Baton Rouge PD',
        city: 'department city',
        locationMapUrl: null,
        parish: 'department parish',
      }

      const featuredOfficers = [
        {
          id: 15248,
          name: 'Jayson Germann',
          badges: ['84'],
          isStarred: true,
          complaintsCount: 84,
          useOfForcesCount: 0,
        },
        {
          id: 2436,
          name: 'Derrick Burmaster',
          badges: ['85'],
          isStarred: false,
          complaintsCount: 80,
          useOfForcesCount: 15,
        },
      ]

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department
                isRequesting={false}
                department={departmentData}
                featuredOfficers={featuredOfficers}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      const featuredSearchIcon = baseElement.getElementsByClassName(
        'search-icon'
      )[0]

      fireEvent.click(featuredSearchIcon)

      const allSearchFeatureCalls = SearchFeature.mock.calls
      const initSearchFeature = allSearchFeatureCalls[0][0]
      expect(initSearchFeature).toEqual({
        itemType: '',
        isSearchModalOpen: false,
        searchModalOnClose: expect.any(Function),
        department: departmentData,
      })

      const searchFeatureAfterClickSearch =
        allSearchFeatureCalls[allSearchFeatureCalls.length - 1][0]
      expect(searchFeatureAfterClickSearch).toEqual({
        itemType: 'officers',
        isSearchModalOpen: true,
        searchModalOnClose: expect.any(Function),
        department: departmentData,
      })
    })
  })
})
