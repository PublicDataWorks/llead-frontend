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
        id: 'baton-rouge-pd',
        name: 'Baton Rouge PD',
      },
      className: 'custom-class-name',
    }
    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <OfficerCard {...props} />
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container
    const officerCard = baseElement.getElementsByClassName('officer-card')[0]

    expect(officerCard.classList.value).toContain('custom-class-name')
    expect(officerCard.textContent.includes('Mark Carlson')).toBe(true)
    expect(officerCard.textContent.includes(props.badges[0])).toBe(true)
    expect(officerCard.textContent.includes(props.badges[1])).toBe(true)
    expect(officerCard.textContent.includes(props.department.name)).toBe(true)
  })
})
