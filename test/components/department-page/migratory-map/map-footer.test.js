import React from 'react'
import { render } from '@testing-library/react'

import MapFooter from 'components/department-page/migratory-map/map-footer'

describe('Map Footer component', () => {
  it('renders correctly', () => {
    const departmentData = {
      city: 'department city',
      address: '123 Road Street',
      parish: 'department parish',
      phone: '123456',
    }

    const container = render(<MapFooter department={departmentData} />)

    const { queryByText } = container

    expect(queryByText('department city').className).toEqual('department-city')
    expect(queryByText('department parish').className).toEqual(
      'department-parish'
    )
    expect(queryByText('123 Road Street').className).toEqual(
      'department-address'
    )
    expect(queryByText('123456').className).toEqual('department-phone')
  })

  it('hides department city', () => {
    const departmentData = {
      city: null,
      address: '123 Road Street',
      parish: 'department parish',
      phone: '123456',
    }

    const container = render(<MapFooter department={departmentData} />)

    const { baseElement, queryByText } = container

    expect(queryByText('department parish').className).toEqual(
      'department-parish'
    )
    expect(queryByText('123 Road Street').className).toEqual(
      'department-address'
    )
    expect(queryByText('123456').className).toEqual('department-phone')
    expect(
      baseElement.getElementsByClassName('department-city').length
    ).toEqual(0)
  })

  it('hides department parish', () => {
    const departmentData = {
      city: 'department city',
      address: '123 Road Street',
      parish: null,
      phone: '123456',
    }

    const container = render(<MapFooter department={departmentData} />)

    const { baseElement, queryByText } = container

    expect(queryByText('department city').className).toEqual('department-city')
    expect(queryByText('123 Road Street').className).toEqual(
      'department-address'
    )
    expect(queryByText('123456').className).toEqual('department-phone')
    expect(
      baseElement.getElementsByClassName('department-parish').length
    ).toEqual(0)
  })

  it('hides department address', () => {
    const departmentData = {
      city: 'department city',
      address: null,
      parish: 'department parish',
      phone: '123456',
    }

    const container = render(<MapFooter department={departmentData} />)

    const { baseElement, queryByText } = container

    expect(queryByText('department city').className).toEqual('department-city')
    expect(queryByText('department parish').className).toEqual(
      'department-parish'
    )
    expect(queryByText('123456').className).toEqual('department-phone')
    expect(
      baseElement.getElementsByClassName('department-address').length
    ).toEqual(0)
  })

  it('hides department phone', () => {
    const departmentData = {
      city: 'department city',
      address: '123 Road Street',
      parish: 'department parish',
      phone: null,
    }

    const container = render(<MapFooter department={departmentData} />)

    const { baseElement, queryByText } = container

    expect(queryByText('department city').className).toEqual('department-city')
    expect(queryByText('department parish').className).toEqual(
      'department-parish'
    )
    expect(queryByText('123 Road Street').className).toEqual(
      'department-address'
    )
    expect(
      baseElement.getElementsByClassName('department-phone').length
    ).toEqual(0)
  })
})
