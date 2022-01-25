import React from 'react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import { Provider } from 'react-redux'
import { render, fireEvent } from '@testing-library/react'
import MockStore from 'redux-mock-store'
import qs from 'qs'

import Department from 'components/department-page'
import { RECENT_ITEM_TYPES } from 'constants/common'
import FeaturedSearch from 'containers/department-page/featured-search'

const mockHistoryReplace = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    replace: mockHistoryReplace,
  }),
}))

jest.mock('containers/department-page/featured-search', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockFeaturedSearchComponent = () => {
  return <div>Featured Search</div>
}

beforeAll(() => {
  FeaturedSearch.mockImplementation(MockFeaturedSearchComponent)
})

beforeEach(() => {
  mockHistoryReplace.mockClear()
  FeaturedSearch.mockClear()
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
      locationMapUrl: 'Map URL',
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
    ).toEqual('Police Department')
    expect(
      baseElement.getElementsByClassName('department-name')[0].textContent
    ).toEqual('Department data')
    expect(
      baseElement.getElementsByClassName('department-city')[0].textContent
    ).toEqual('News Orleans')
    expect(
      baseElement.getElementsByClassName('department-parish')[0].textContent
    ).toEqual('Orleans Parish')
    expect(
      baseElement.getElementsByClassName('address')[0].textContent
    ).toEqual('1 Third St #1, New Orleans, LA 70130')
    expect(baseElement.getElementsByClassName('phone')[0].textContent).toEqual(
      '(504) 891-7585'
    )

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

  it('hides map, city, parish, address, and phone if there is no information', () => {
    const departmentData = {
      id: 1,
      name: null,
      city: null,
      address: null,
      phone: null,
      locationMapUrl: null,
      parish: null,
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
    expect(baseElement.getElementsByClassName('department-map').length).toEqual(
      0
    )
    expect(
      baseElement.getElementsByClassName('department-city').length
    ).toEqual(0)
    expect(
      baseElement.getElementsByClassName('department-parish').length
    ).toEqual(0)
    expect(
      baseElement.getElementsByClassName('lower-location-info').length
    ).toEqual(0)
  })

  it('hides address if there is information', () => {
    const departmentData = {
      id: 1,
      name: 'Department data',
      city: 'News Orleans',
      address: null,
      phone: '(504) 891-7585',
      locationMapUrl: null,
      parish: 'Orleans Parish',
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
    expect(baseElement.getElementsByClassName('address').length).toEqual(0)
    expect(baseElement.getElementsByClassName('phone')[0].textContent).toEqual(
      '(504) 891-7585'
    )
  })

  it('hides phone if there is information', () => {
    const departmentData = {
      id: 1,
      name: 'Department data',
      city: 'News Orleans',
      address: '1 Third St #1, New Orleans, LA 70130',
      phone: null,
      locationMapUrl: null,
      parish: 'Orleans Parish',
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
      baseElement.getElementsByClassName('address')[0].textContent
    ).toEqual('1 Third St #1, New Orleans, LA 70130')
    expect(baseElement.getElementsByClassName('phone').length).toEqual(0)
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

  it('should render background image', () => {
    const departmentData = {
      id: 1,
      city: 'department city',
      complaintsCount: 2,
      documentsCount: 1,
      locationMapUrl: 'locationMapUrl',
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

    const { baseElement } = container
    const departmentMapElement = baseElement.getElementsByClassName(
      'department-map'
    )[0]
    expect(departmentMapElement.style['background-image']).toEqual(
      'url(locationMapUrl)'
    )
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
      ).toEqual('Data for this department is limited to the years\u00A02018')
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
        'Data for this department is limited to the years\u00A02018 and 2020'
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
        'Data for this department is limited to the years\u00A02013, 2015, 2017 and 2020'
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

  describe('change search department', () => {
    it('should change search department', () => {
      const changeSearchDepartment = sinon.spy()

      const departmentData = {
        id: 'baton-rouge-pd',
        name: 'Baton Rouge PD',
        city: 'department city',
        locationMapUrl: null,
        parish: 'department parish',
      }
      render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                changeSearchDepartment={changeSearchDepartment}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      expect(changeSearchDepartment).toHaveBeenCalledWith({
        name: departmentData.name,
        id: departmentData.id,
      })
    })
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

  describe('render search modal', () => {
    it('renders search modal correctly', () => {
      const departmentData = {
        id: 1,
        name: 'department name',
      }

      render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department department={departmentData} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      expect(FeaturedSearch.mock.calls[0][0]).toStrictEqual({
        departmentId: 'baton-rouge-pd',
        departmentName: 'department name',
        isSearchModalOpen: false,
        searchModalOnClose: expect.anything(),
        itemType: '',
      })
    })

    it('opens search officers modal correctly', () => {
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

      const { baseElement } = container

      expect(FeaturedSearch.mock.calls[0][0].isSearchModalOpen).toEqual(false)

      const searchButton = baseElement.getElementsByClassName('search-icon')[0]
      fireEvent.click(searchButton)

      const numOfRenders = FeaturedSearch.mock.calls.length

      expect(
        FeaturedSearch.mock.calls[numOfRenders - 1][0].isSearchModalOpen
      ).toEqual(true)
    })

    it('opens search news aticles modal correctly', () => {
      const departmentData = {
        id: 1,
        name: 'department name',
      }

      const featuredNewsAticles = [
        {
          id: 15248,
          title: 'Appeal hearing: Eric Curlee on 2020-3-12',
          url: 'https://i.imgur.com/nHTFohI.csv',
          isStarred: true,
          publishedDate: '2020-03-12',
          sourceDisplayName: 'The lens 1',
        },
      ]

      const fetchFeaturedNewsArticlesSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                featuredNewsArticles={featuredNewsAticles}
                fetchFeaturedNewsArticles={fetchFeaturedNewsArticlesSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      expect(FeaturedSearch.mock.calls[0][0].isSearchModalOpen).toEqual(false)

      const searchButton = baseElement.getElementsByClassName('search-icon')[0]
      fireEvent.click(searchButton)

      const numOfRenders = FeaturedSearch.mock.calls.length

      expect(
        FeaturedSearch.mock.calls[numOfRenders - 1][0].isSearchModalOpen
      ).toEqual(true)
    })

    it('opens search document modal correctly', () => {
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
      ]

      const fetchFeaturedDocumentsSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['dept/baton-rouge-pd']}>
            <Route path='dept/:id'>
              <Department
                department={departmentData}
                featuredNewsArticles={featuredDocuments}
                fetchFeaturedNewsArticles={fetchFeaturedDocumentsSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      expect(FeaturedSearch.mock.calls[0][0].isSearchModalOpen).toEqual(false)

      const searchButton = baseElement.getElementsByClassName('search-icon')[0]
      fireEvent.click(searchButton)

      const numOfRenders = FeaturedSearch.mock.calls.length

      expect(
        FeaturedSearch.mock.calls[numOfRenders - 1][0].isSearchModalOpen
      ).toEqual(true)
    })
  })
})
