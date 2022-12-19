import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'

import MigratoryInformationBox from 'components/department-page/migratory-map/information-box'
import MigratoryInformationTable from 'components/department-page/migratory-map/information-table'

jest.mock('components/department-page/migratory-map/information-table', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

describe('Migratory information box component', () => {
  const mockCloseInformationTable = jest.fn()

  // eslint-disable-next-line react/prop-types
  const MockInformationTableComponent = ({ closeInformationTable }) => {
    mockCloseInformationTable.mockImplementation(() => {
      closeInformationTable()
    })
    return <div>Information Table</div>
  }

  beforeAll(() => {
    MigratoryInformationTable.mockImplementation(MockInformationTableComponent)
  })

  beforeEach(() => {
    MigratoryInformationTable.mockClear()
  })

  it('renders correctly', () => {
    const migratoryInformation = {
      years: '1999 - 2009',
      left: {
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
      },
      join: {
        count: 2,
        departments: [
          {
            name: 'Southern - Br University PD',
            count: 1,
          },
          {
            name: 'New Orleans Police Department',
            count: 1,
          },
        ],
      },
    }

    const props = {
      migratoryInformation: migratoryInformation,
    }

    const container = render(<MigratoryInformationBox {...props} />)

    const { queryByText } = container

    expect(queryByText('1999 - 2009').className).toEqual('migratory-year')

    expect(
      queryByText('Officers joining from other agencies').className
    ).toEqual('migratory-row migratory-join')
    expect(queryByText('2').parentElement.className).toEqual(
      'migratory-join-count'
    )

    expect(
      queryByText('Officers leaving to join other agencies').className
    ).toEqual('migratory-row migratory-left')
    expect(queryByText('16').parentElement.className).toEqual(
      'migratory-left-count'
    )
  })

  it('clicks on join box', async () => {
    const migratoryInformation = {
      years: '1999 - 2009',
      left: {
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
      },
      join: {
        count: 2,
        departments: [
          {
            name: 'Southern - Br University PD',
            count: 1,
          },
          {
            name: 'New Orleans Police Department',
            count: 1,
          },
        ],
      },
    }

    const props = {
      migratoryInformation: migratoryInformation,
    }

    const container = render(<MigratoryInformationBox {...props} />)

    const { baseElement, queryByText } = container

    const joinBox = baseElement.getElementsByClassName('migratory-join')[0]

    await act(async () => {
      fireEvent.click(joinBox)
    })

    expect(queryByText('Information Table')).toBeTruthy()

    const firstInfoRender = MigratoryInformationTable.mock.calls
    expect(
      firstInfoRender[firstInfoRender.length - 1][0].isShowing
    ).toBeTruthy()

    await act(async () => {
      mockCloseInformationTable()
    })

    const secondInfoRender = MigratoryInformationTable.mock.calls
    expect(
      secondInfoRender[secondInfoRender.length - 1][0].isShowing
    ).toBeFalsy()
  })

  it('clicks on left box', async () => {
    const migratoryInformation = {
      years: '1999 - 2009',
      left: {
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
      },
      join: {
        count: 2,
        departments: [
          {
            name: 'Southern - Br University PD',
            count: 1,
          },
          {
            name: 'New Orleans Police Department',
            count: 1,
          },
        ],
      },
    }

    const props = {
      migratoryInformation: migratoryInformation,
    }

    const container = render(<MigratoryInformationBox {...props} />)

    const { baseElement, queryByText } = container

    const leftBox = baseElement.getElementsByClassName('migratory-left')[0]

    await act(async () => {
      fireEvent.click(leftBox)
    })

    expect(queryByText('Information Table')).toBeTruthy()

    const firstInfoRender = MigratoryInformationTable.mock.calls
    expect(
      firstInfoRender[firstInfoRender.length - 1][0].isShowing
    ).toBeTruthy()

    await act(async () => {
      mockCloseInformationTable()
    })

    const secondInfoRender = MigratoryInformationTable.mock.calls
    expect(
      secondInfoRender[secondInfoRender.length - 1][0].isShowing
    ).toBeFalsy()
  })
})
