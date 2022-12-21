import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import sinon from 'sinon'
import MigratoryInformationTable from 'components/department-page/migratory-map/information-table'

describe('Migratory information table component', () => {
  it('renders join table', () => {
    const closeInformationTableStub = sinon.stub()

    const migratoryInformation = {
      count: 16,
      departments: [
        {
          name: 'Southern - Br University PD',
          count: 9,
        },
        {
          name: 'New Orleans Police Department',
          count: 5,
        },
      ],
    }

    const props = {
      isLeft: false,
      migratoryInformation: migratoryInformation,
      closeInformationTable: closeInformationTableStub,
    }

    const container = render(<MigratoryInformationTable {...props} />)

    const { baseElement, queryByText } = container

    const informationTable = baseElement.getElementsByClassName(
      'migratory-information-table'
    )[0]

    expect(
      informationTable.getElementsByClassName('summary')[0].classList
    ).not.toContain('is-left')

    expect(queryByText('Officers joining from other agencies')).toBeTruthy()
    expect(queryByText('16').className).toEqual('count-sum')
    expect(informationTable.getElementsByClassName('close-btn').length).toEqual(
      1
    )

    expect(
      informationTable.getElementsByClassName('migratory-department-title')[0]
        .textContent
    ).toContain('TOP 5 AGENCIES(from which officers are migrating)')

    expect(
      informationTable.getElementsByClassName('migratory-department')[0]
        .textContent
    ).toContain('Southern - Br University PD\u00A09')
    expect(
      informationTable.getElementsByClassName('migratory-department')[1]
        .textContent
    ).toContain('New Orleans Police Department\u00A05')
  })

  it('renders left table', () => {
    const closeInformationTableStub = sinon.stub()

    const migratoryInformation = {
      count: 16,
      departments: [
        {
          name: 'Southern - Br University PD',
          count: 9,
        },
        {
          name: 'New Orleans Police Department',
          count: 5,
        },
      ],
    }

    const props = {
      isLeft: true,
      migratoryInformation: migratoryInformation,
      closeInformationTable: closeInformationTableStub,
    }

    const container = render(<MigratoryInformationTable {...props} />)

    const { baseElement, queryByText } = container

    const informationTable = baseElement.getElementsByClassName(
      'migratory-information-table'
    )[0]

    expect(
      informationTable.getElementsByClassName('summary')[0].classList
    ).toContain('is-left')

    expect(queryByText('Officers leaving to join other agencies')).toBeTruthy()
    expect(queryByText('16').classList).toContain('is-left')
    expect(
      informationTable.getElementsByClassName('close-btn')[0].classList
    ).toContain('is-left')

    expect(
      informationTable.getElementsByClassName('migratory-department-title')[0]
        .textContent
    ).toContain('TOP 5 AGENCIES(which officers are migrating to)')

    expect(
      informationTable.getElementsByClassName('migratory-department')[0]
        .textContent
    ).toContain('Southern - Br University PD\u00A09')
    expect(
      informationTable.getElementsByClassName('migratory-department')[1]
        .textContent
    ).toContain('New Orleans Police Department\u00A05')
  })

  it('clicks on close button', () => {
    const closeInformationTableStub = sinon.stub()

    const migratoryInformation = {
      count: 16,
      departments: [
        {
          name: 'Southern - Br University PD',
          count: 9,
        },
        {
          name: 'New Orleans Police Department',
          count: 5,
        },
      ],
    }

    const props = {
      isLeft: false,
      migratoryInformation: migratoryInformation,
      closeInformationTable: closeInformationTableStub,
    }

    const container = render(<MigratoryInformationTable {...props} />)

    const { baseElement } = container

    const closeBtn = baseElement.getElementsByClassName('close-btn')[0]
    fireEvent.click(closeBtn)
    expect(closeInformationTableStub).toHaveBeenCalled()
  })
})
