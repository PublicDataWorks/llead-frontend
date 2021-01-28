import documentsReducer from 'reducers/front-page/documents-reducer'

import { DOCUMENTS_FETCH_SUCCESS } from 'action-types/front-page'

describe('#documentsReducer', () => {
  it('should return initial state', () => {
    expect(documentsReducer(undefined, {})).toStrictEqual([])
  })

  it('should handle DOCUMENTS_FETCH_SUCCESS', () => {
    const documents = [
      {
        id: 36,
        document_type: 'csv',
        title: 'Her hard step sea.',
        url: '/century/five.pdf',
        preview_image_url: '/cell/least.jpg',
        incident_date: '2020-01-06',
        pages_count: 5,
        departments: [
          {
            id: 22,
            name: 'Petersonmouth Department',
          },
        ],
      },
      {
        id: 35,
        document_type: 'webm',
        title: 'Yourself say language meeting ok.',
        url: '/national/must.pdf',
        preview_image_url: '/production/activity.jpg',
        incident_date: '2020-01-06',
        pages_count: 5,
        departments: [
          {
            id: 22,
            name: 'Petersonmouth Department',
          },
        ],
      },
    ]

    const result = documentsReducer(
      {},
      {
        type: DOCUMENTS_FETCH_SUCCESS,
        payload: documents,
      }
    )

    expect(result).toStrictEqual(documents)
  })
})
