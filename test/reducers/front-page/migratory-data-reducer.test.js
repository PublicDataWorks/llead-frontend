import migratoryDataReducer from 'reducers/front-page/migratory-data-reducer'

import { MIGRATORY_DATA_FETCH_SUCCESS } from 'action-types/front-page'

describe('#departmentsReducer', () => {
  it('should return initial state', () => {
    expect(migratoryDataReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle MIGRATORY_DATA_FETCH_SUCCESS', () => {
    const data = {
      nodes: {
        '22nd-district-attorney': {
          name: '22nd District Attorney',
          location: [-90.09622, 30.48031],
        },
      },
      graphs: [
        {
          start_node: 'new-orleans-pd',
          end_node: 'southern-br-university-pd',
          start_location: [-90.0701, 29.9499],
          end_location: [-91.191113, 30.5255956],
          year: 1999,
          date: '1999-06-21',
          officer_name: 'Tonya Johnese',
          officer_id: 1529,
        },
      ],
    }

    const result = migratoryDataReducer(
      {},
      {
        type: MIGRATORY_DATA_FETCH_SUCCESS,
        payload: data,
      }
    )

    expect(result).toStrictEqual(data)
  })
})
