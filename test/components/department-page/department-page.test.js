import React from 'react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import MockStore from 'redux-mock-store'

import Department from 'components/department-page'

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
})
