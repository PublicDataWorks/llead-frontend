const departmentsData1 = [
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
]

const departmentsData2 = [
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

const officersData1 = [
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
]

const officersData2 = [
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

const documentsData1 = [
  {
    id: 1,
    document_type: 'csv',
    title: 'Her hard step sea.',
    url: 'http://documents.com/century/five.pdf',
    preview_image_url: '',
    incident_date: '2020-01-06',
    pages_count: 5,
    departments: [
      {
        id: 22,
        name: 'Petersonmouth Department',
      },
    ],
    textContent: 'Text content',
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
]
const documentsData2 = [
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
    textContent: 'Text content',
    textContentHighlight: 'Text content <em>highlight</em>',
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

export const firstSearchData = {
  departments: {
    results: departmentsData1,
    count: 3,
    next: null,
    previous: null,
  },
  officers: {
    results: officersData1,
    count: 4,
    next: null,
    previous: null,
  },
  documents: {
    results:documentsData1,
    count: 6,
    next: 'http://testserver/api/search/?doc_type=documents&limit=3&offset=1&q=ba',
    previous: null,
  }
}

export const secondSearchData = {
  departments: {
    results: departmentsData2,
    count: 2,
    next: null,
    previous: null,
  },
  officers: {
    results: officersData2,
    count: 1,
    next: null,
    previous: null,
  },
  documents: {
    results: documentsData2,
    count: 3,
    next: null,
    previous: null,
  }
}

export const thirdSearchData = {
  documents: {
    results:documentsData1,
    count: 6,
    next: 'http://testserver/api/search/?doc_type=documents&limit=3&offset=1&q=ba',
    previous: null,
  }
}

export const thirdSearchDataExtend = {
  documents: {
    results:documentsData2,
    count: 6,
    next: null,
    previous: null,
  }
}
