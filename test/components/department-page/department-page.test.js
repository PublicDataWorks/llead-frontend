import React from 'react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import { Provider } from 'react-redux'
import { render, fireEvent } from '@testing-library/react'
import MockStore from 'redux-mock-store'
import qs from 'qs'

import Department from 'components/department-page'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

beforeEach(() => {
  mockHistoryPush.mockClear()
})

describe('Department component', () => {
  it('should render correctly', () => {
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
    const fetchDepartmentSpy = sinon.spy()

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['departments/1']}>
          <Route path='departments/:id'>
            <Department
              department={departmentData}
              fetchDepartment={fetchDepartmentSpy}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    expect(fetchDepartmentSpy).toHaveBeenCalledWith('1')

    const { baseElement } = container
    expect(
      baseElement.getElementsByClassName('department-title')[0].textContent
    ).toEqual('Police Department')
    expect(
      baseElement.getElementsByClassName('department-name')[0].textContent
    ).toEqual('department name')
    expect(
      baseElement.getElementsByClassName('department-city')[0].textContent
    ).toEqual('department city')

    const departmentSummary = baseElement.getElementsByClassName(
      'department-summary'
    )[0]

    expect(departmentSummary.children[0].textContent).toEqual('3 officers')
    expect(departmentSummary.children[1].textContent).toEqual('2 complaints')
    expect(departmentSummary.children[2].textContent).toEqual('1 documents')
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
        <MemoryRouter initialEntries={['departments/1']}>
          <Route path='departments/:id'>
            <Department
              department={departmentData}
              isRequesting={true}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    const { baseElement } = container
    expect(
      baseElement.getElementsByClassName('department-content').length
    ).toBe(0)
  })

  it('should not render if department is empty', () => {
    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['departments/1']}>
          <Route path='departments/:id'>
            <Department
              department={{}}
            />
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
        <MemoryRouter initialEntries={['departments/1']}>
          <Route path='departments/:id'>
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

  describe('render with wrglFiles', () => {
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
        wrglFiles: [
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
        ],
      }
      const fetchDepartmentSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['departments/1']}>
            <Route path='departments/:id'>
              <Department
                department={departmentData}
                fetchDepartment={fetchDepartmentSpy}
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
        wrglFiles: [
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
        ],
      }
      const fetchDepartmentSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter
            initialEntries={[
              {
                pathname: 'departments/1',
                search: qs.stringify({ csv: 'com-madisonville-pd' }),
              },
            ]}
          >
            <Route path='departments/:id'>
              <Department
                department={departmentData}
                fetchDepartment={fetchDepartmentSpy}
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
        wrglFiles: [
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
        ],
      }
      const fetchDepartmentSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter
            initialEntries={[
              {
                pathname: 'departments/1',
                search: qs.stringify({
                  csv: ['123', 'com-madisonville-pd'],
                }),
              },
            ]}
          >
            <Route path='departments/:id'>
              <Department
                department={departmentData}
                fetchDepartment={fetchDepartmentSpy}
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
        wrglFiles: [
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
        ],
      }
      const fetchDepartmentSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter
            initialEntries={[
              {
                pathname: 'departments/1',
                search: qs.stringify({ csv: ['slug-1'] }),
              },
            ]}
          >
            <Route path='departments/:id'>
              <Department
                department={departmentData}
                fetchDepartment={fetchDepartmentSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { getByTestId } = container

      const expandArrowElement = getByTestId('expand--control')
      fireEvent.click(expandArrowElement)

      expect(mockHistoryPush).toHaveBeenCalledWith({
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
        wrglFiles: [
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
        ],
      }
      const fetchDepartmentSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter
            initialEntries={[
              {
                pathname: 'departments/1',
                search: qs.stringify({
                  csv: ['slug-1', 'com-madisonville-pd'],
                }),
              },
            ]}
          >
            <Route path='departments/:id'>
              <Department
                department={departmentData}
                fetchDepartment={fetchDepartmentSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { getByTestId } = container

      const expandArrowElement = getByTestId('expand--control')
      fireEvent.click(expandArrowElement)

      expect(mockHistoryPush).toHaveBeenCalledWith({
        search: qs.stringify(
          { csv: ['slug-1'] },
          { arrayFormat: 'comma', encode: false }
        ),
      })
    })
  })

  describe('render department documents', () => {
    it('should render correctly', () => {
      const paginationData = {
        count: 2,
        limit: 2,
        offset: 2,
      }
      const documentsData = [
        {
          id: 1,
          documentType: 'json',
          title: 'title 1',
          url: 'url 1',
          incidentDate: 'May 04, 2020',
          previewImageUrl: 'preview_image_url_1',
          pagesCount: 15,
        },
        {
          id: 2,
          documentType: 'jpeg',
          title: 'title 2',
          url: 'url 2',
          incidentDate: 'Jan 21, 2019',
          previewImageUrl: 'preview_image_url_2',
          pagesCount: 1,
        },
      ]
      const fetchDocumentsSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['departments/1']}>
            <Route path='departments/:id'>
              <Department
                department={{ id: 1 }}
                documents={documentsData}
                {...paginationData}
                fetchDocuments={fetchDocumentsSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { getByText, baseElement } = container

      expect(fetchDocumentsSpy.firstCall.args).toEqual(['1'])

      expect(getByText(`Documents (${paginationData.count})`)).toBeTruthy()
      expect(
        getByText(`2 of ${paginationData.count} documents displayed`)
      ).toBeTruthy()

      const documentElements = baseElement.getElementsByClassName(
        'document-card'
      )
      const firstDocument = documentElements[0]
      const secondDocument = documentElements[1]

      const firstDocumentTitle = firstDocument.getElementsByClassName(
        'document-title'
      )[0]
      expect(firstDocumentTitle.textContent).toEqual('title 1')

      const secondDocumentTitle = secondDocument.getElementsByClassName(
        'document-title'
      )[0]
      expect(secondDocumentTitle.textContent).toEqual('title 2')

      const loadMoreButton = getByText('Load 2 more')
      expect(loadMoreButton).toBeTruthy()
      fireEvent.click(loadMoreButton)

      expect(fetchDocumentsSpy.secondCall.args).toEqual([
        '1',
        {
          limit: 2,
          offset: 2,
        },
      ])
    })

    it('hide department documents element if count is not greater than 0', () => {
      const paginationData = {
        count: 0,
      }
      const documentsData = []
      const fetchDocumentsSpy = sinon.spy()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['departments/1']}>
            <Route path='departments/:id'>
              <Department
                department={{ id: 1 }}
                documents={documentsData}
                {...paginationData}
                fetchDocuments={fetchDocumentsSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      const { baseElement } = container

      const departmentDocumentsElement = baseElement.getElementsByClassName(
        'department-documents'
      )[0]

      expect(departmentDocumentsElement).not.toBeTruthy()
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
          <MemoryRouter initialEntries={['departments/1']}>
            <Route path='departments/:id'>
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
          <MemoryRouter initialEntries={['departments/1']}>
            <Route path='departments/:id'>
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
          <MemoryRouter initialEntries={['departments/1']}>
            <Route path='departments/:id'>
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
          <MemoryRouter initialEntries={['departments/1']}>
            <Route path='departments/:id'>
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
})
