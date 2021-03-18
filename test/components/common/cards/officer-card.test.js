import React from 'react'
import { render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

import OfficerCard from 'components/common/cards/officer-card'

describe('Officer card component', () => {
  it('should render correctly', () => {
    const props = {
      id: 1,
      name: 'mark carlson',
      badges: ['12435', '612'],
      department: {
        id: 9,
        name: 'Baton Rouge Department 1',
      },
    }
    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <OfficerCard {...props} />
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container

    expect(baseElement.textContent.includes('Mark Carlson')).toBe(true)
    expect(baseElement.textContent.includes(props.badges[0])).toBe(true)
    expect(baseElement.textContent.includes(props.badges[1])).toBe(true)
    expect(baseElement.textContent.includes(props.department.name)).toBe(true)
  })
})
