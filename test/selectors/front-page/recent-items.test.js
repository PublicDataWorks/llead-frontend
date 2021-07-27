import { recentItemsSelector } from 'selectors/front-page/recent-items'
import { RECENT_ITEM_TYPES } from 'constants/common'

describe('#recentItemsSelector', () => {
  it('returns correct data', () => {
    const recentItems = [
      {
        type: RECENT_ITEM_TYPES.OFFICER,
        id: 1,
        data: {
          id: 1,
          name: 'officer 1',
          badges: ['12345', '567'],
          department: {
            id: 'north-paulaberg-department',
            name: 'North Paulaberg Department',
          },
          extraField: 'data',
        },
      },
      {
        type: RECENT_ITEM_TYPES.DEPARTMENT,
        id: 7,
        data: {
          id: 'department-7',
          name: 'department 7',
          city: 'Baton Rouge',
          parish: 'East Baton Rouge',
          locationMapUrl: 'http://mapurl.com/department1',
          extraField: 'field',
        },
      },
      {
        type: RECENT_ITEM_TYPES.DEPARTMENT,
        id: 8,
        data: { id: 'department-8', name: 'department 8' },
      },
      {
        type: RECENT_ITEM_TYPES.OFFICER,
        id: 3,
        data: { id: 3, name: 'officer 3' },
      },
      {
        type: RECENT_ITEM_TYPES.OFFICER,
        id: 22,
        data: null,
      },
      {
        type: RECENT_ITEM_TYPES.DOCUMENT,
        id: 12,
        data: {
          id: 12,
          title: 'document 12',
          documentType: 'csv',
          url: 'http://documents.com/century/five.pdf',
          previewImageUrl: '/cell/least.jpg',
          incidentDate: '2020-01-06',
          pagesCount: 5,
          departments: [
            {
              id: 'petersonmouth-department',
              name: 'Petersonmouth Department',
            },
          ],
          extraField: 'data',
        },
      },
      {
        type: RECENT_ITEM_TYPES.DOCUMENT,
        id: 14,
        data: { id: 14, title: 'document 14' },
      },
    ]

    const expectedRecentItems = [
      {
        type: RECENT_ITEM_TYPES.OFFICER,
        id: 1,
        name: 'officer 1',
        badges: ['12345', '567'],
        department: {
          id: 'north-paulaberg-department',
          name: 'North Paulaberg Department',
        },
      },
      {
        type: RECENT_ITEM_TYPES.DEPARTMENT,
        id: 'department-7',
        name: 'department 7',
        city: 'Baton Rouge',
        parish: 'East Baton Rouge',
        locationMapUrl: 'http://mapurl.com/department1',
      },
      {
        type: RECENT_ITEM_TYPES.DEPARTMENT,
        id: 'department-8',
        name: 'department 8',
      },
      {
        type: RECENT_ITEM_TYPES.OFFICER,
        id: 3,
        name: 'officer 3',
        department: {},
      },
      {
        type: RECENT_ITEM_TYPES.DOCUMENT,
        id: 12,
        title: 'document 12',
        documentType: 'csv',
        url: 'http://documents.com/century/five.pdf',
        previewImageUrl: '/cell/least.jpg',
        incidentDate: 'Jan 6, 2020',
        pagesCount: 5,
        departments: [
          {
            id: 'petersonmouth-department',
            name: 'Petersonmouth Department',
          },
        ],
      },
      {
        type: RECENT_ITEM_TYPES.DOCUMENT,
        id: 14,
        title: 'document 14',
        incidentDate: '',
        departments: [],
      },
    ]

    const state = { recentItems }

    const result = recentItemsSelector(state)

    expect(result).toStrictEqual(expectedRecentItems)
  })
})
