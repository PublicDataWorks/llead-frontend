import React from 'react'
import { render } from '@testing-library/react'

import MigrationDetailsBox from 'components/front-page/migratory-map/migration-details'

describe('migration details component', () => {
  it('renders correctly', () => {
    const migartionDetailsData = {
      startDepartment: 'New Orleans Police Department',
      endDepartment: 'Southern - Br University PD',
      officerName: 'Tonya Johnese',
      date: 'Jun 21, 1999',
    }

    const container = render(
      <MigrationDetailsBox migratedOfficer={migartionDetailsData} />
    )

    const { baseElement, getByText } = container
    const migartionDetailsBox = baseElement.getElementsByClassName(
      'migration-details-box'
    )[0]

    expect(migartionDetailsBox).toBeTruthy()
    expect(getByText('Jun 21, 1999').className).toEqual('migration-date')
    expect(getByText('New Orleans Police Department').className).toEqual(
      'start-department'
    )
    expect(getByText('Tonya Johnese').className).toEqual('officer-name')
    expect(getByText('Southern - Br University PD').className).toEqual(
      'end-department'
    )
  })

  it('does not render if no migrated officer information', () => {
    const migartionDetailsData = {}

    const container = render(
      <MigrationDetailsBox migratedOfficer={migartionDetailsData} />
    )

    const { baseElement } = container
    const migartionDetailsBox = baseElement.getElementsByClassName(
      'migration-details-box'
    )[0]

    expect(migartionDetailsBox).toBeFalsy()
  })
})
