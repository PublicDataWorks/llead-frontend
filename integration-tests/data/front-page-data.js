export const analyticSummaryData = {
  departments_count: 4,
  officers_count: 5,
  documents_count: 6,
  recent_days: 30,
  recent_departments_count: 1,
  recent_officers_count: 2,
  recent_documents_count: 3,
}

export const departmentsData = [
  {
    id: 'baton-rouge-pd',
    name: 'Baton Rouge PD',
    city: 'Baton Rouge',
    parish: 'East Baton Rouge',
    location_map_url: 'https://i.imgur.com/nHTFohI.png',
  },
  {
    id: 'new-orleans-pd',
    name: 'New Orleans PD',
    city: 'New Orleans',
    parish: 'Orleans',
    location_map_url: 'https://i.imgur.com/DO9ASUd.jpeg',
  },
  {
    id: 'baton-rouge-sheriff',
    name: 'Baton Rouge Sheriff',
    city: 'Baton Rouge',
    parish: 'East Baton Rouge',
    location_map_url: 'https://i.imgur.com/nHTFohI.png',
  },
  {
    id: 'new-orleans-harbor-pd',
    name: 'New Orleans Harbor PD',
    city: 'New Orleans',
    parish: 'Orleans',
    location_map_url: null,
  },
  {
    id: 'orleans-levee-pd',
    name: 'Orleans Levee PD',
    city: 'New Orleans',
    parish: 'Orleans',
    location_map_url: 'https://i.imgur.com/DO9ASUd.jpeg',
  },
]

export const officersData = [
  {
    id: 1,
    name: 'Mark Carlson',
    badges: ['12435', '612'],
    department: {
      id: 'baton-rouge-pd',
      name: 'Baton Rouge PD',
    },
  },
  {
    id: 9,
    name: 'Eric Patel',
    badges: [],
    department: null,
  },
  {
    id: 5,
    name: 'Lee Allen',
    badges: ['1056'],
    department: {
      id: 'baton-rouge-sheriff',
      name: 'Baton Rouge Sheriff',
    },
  },
  {
    id: 2,
    name: 'Tina Holder',
    badges: ['20079'],
    department: {
      id: 'new-orleans-pd',
      name: 'New Orleans PD',
    },
  },
  {
    id: 7,
    name: 'Kelly Hunt',
    badges: ['12117'],
    department: {
      id: 'new-orleans-harbor-pd',
      name: 'New Orleans Harbor PD',
    },
  },
]

export const documentsData = [
  {
    id: 1,
    document_type: 'csv',
    title: 'Her hard step sea.',
    url: 'http://documents.com/century/five.pdf',
    preview_image_url: 'http://image.com/century/five-preview.pdf',
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
    id: 2,
    document_type: 'webm',
    title: 'Yourself say language meeting ok.',
    url: 'http://documents.com/national/must.pdf',
    preview_image_url: 'http://image.com/production/activity.jpg',
    incident_date: '2020-01-06',
    pages_count: 5,
  },
  {
    id: 3,
    document_type: 'css',
    title: 'Be decade those someone tough year sing.',
    url: 'http://documents.com/may/rest.pdf',
    preview_image_url: 'http://image.com/food/test.jpg',
    incident_date: '2020-01-06',
    pages_count: 5,
    departments: [
      {
        id: 23,
        name: 'City Department',
      },
    ],
  },
  {
    id: 4,
    document_type: 'mp3',
    title: 'Face growth poor wait follow option better.',
    url: 'http://documents.com/from/few.pdf',
    preview_image_url: 'http://image.com/would/popular.jpg',
    incident_date: '2020-01-06',
    pages_count: 5,
    departments: [
      {
        id: 23,
        name: 'City Department',
      },
    ],
  },
  {
    id: 5,
    document_type: 'css',
    title: 'Performance past from.',
    url: 'http://documents.com/cup/body.pdf',
    preview_image_url: 'http://image.com/character/return.jpg',
    incident_date: '2020-01-06',
    pages_count: 5,
    departments: [
      {
        id: 24,
        name: 'New Orleans Department',
      },
    ],
  },
  {
    id: 6,
    document_type: 'jpg',
    title: 'Mouth trip too finally society smile man.',
    url: 'http://documents.com/and/hit.pdf',
    preview_image_url: 'http://image.com/third/source.jpg',
    incident_date: '2020-01-06',
    pages_count: 5,
    departments: [
      {
        id: 25,
        name: 'Baton Rouge Department',
      },
    ],
  },
]

export const newsArticlesData = [
  {
    id: 6,
    source_name: 'The lens',
    title: 'Mouth trip too finally society smile man.',
    url: 'http://documents.com/and/hit.pdf',
    date: '2020-01-06',
  },
  {
    id: 5,
    source_name: 'The lens',
    title: 'Performance past from.',
    url: 'http://documents.com/cup/body.pdf',
    date: '2020-01-06',
  },
  {
    id: 4,
    source_name: 'NOLA',
    title: 'Face growth poor wait follow option better.',
    url: 'http://documents.com/from/few.pdf',
    date: '2020-01-06',
  },
  {
    id: 3,
    source_name: 'NOLA',
    title: 'Be decade those someone tough year sing.',
    url: 'http://documents.com/may/rest.pdf',
    date: '2020-01-06',
  },
  {
    id: 2,
    source_name: 'The lens',
    title: 'Yourself say language meeting ok.',
    url: 'http://documents.com/national/must.pdf',
    date: '2020-01-06',
  },
  {
    id: 1,
    source_name: 'The lens',
    title: 'Her hard step sea.',
    url: 'http://documents.com/century/five.pdf',
    date: '2020-01-06',
  },
]
