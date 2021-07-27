export const userInfoData = {
  email: 'email@example.com'
}

export const departmentBatonRougePdDetailsData = {
  id: 'baton-rouge-pd',
  name: 'Baton Rouge PD',
  city: 'Baton Rouge',
  parish: 'East Baton Rouge',
  location_map_url: 'https://i.imgur.com/nHTFohI.png',
  documents_count: 1,
}

export const officerTimelineData = {
  timeline: [
    {
      id: 39,
      document_type: 'pdf',
      title: 'Document 2019-03-10',
      url: 'http://document.com/image/our.pdf',
      incident_date: '2019-03-10',
      preview_image_url: 'http://image.com/image/our-preview.jpg',
      pages_count: 24,
      departments: [
        {
          id: 10031,
          name: 'Department',
        },
      ],
      kind: 'DOCUMENT',
      date: '2019-03-10',
      year: 2019,
    },
  ],
  timeline_period: ['2019'],
}

export const department9DocumentsData = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      document_type: 'json',
      title: 'Pattern risk team election myself suffer wind.',
      url: 'http://documents.com/glass/shoulder.pdf',
      incident_date: '2020-05-04',
      preview_image_url: 'http://image.com/glass/shoulder-preview.pdf',
      pages_count: 15,
      text_content:
        'Motion by Daryl Edgens to approve exam grades for Fire Investigator',
      departments: [
        {
          id: 'baton-rouge-pd',
          name: 'Baton Rouge PD',
        },
      ],
    },
  ],
}

export const officer1DetailsData = {
  id: 1,
  name: 'Mark Carlson',
  badges: ['12435', '612'],
  birth_year: 1962,
  race: 'white',
  gender: 'male',
  department: {
    id: 'baton-rouge-pd',
    name: 'Baton Rouge PD',
  },
  documents_count: 1,
}

export const officer1DocumentsData = [
  {
    id: 2,
    document_type: 'flac',
    title: 'Structure land official huge draw significant.',
    url: 'http://documents.com/after/last.pdf',
    incident_date: '2021-06-12',
    preview_image_url: 'http://image.com/after/last-preview.jpg',
    pages_count: 7,
    text_content: '',
    departments: [
      {
        id: 'new-orleans-pd',
        name: 'New Orleans PD',
      },
    ],
  },
]

export const recentItemsData = [
  {
    type: 'OFFICER',
    id: 1,
    name: 'Mark Carlson',
    badges: ['12435', '612'],
    department: {
      id: 'baton-rouge-pd',
      name: 'Baton Rouge PD',
    },
  },
  {
    type: 'DEPARTMENT',
    id: 'baton-rouge-pd',
    name: 'Baton Rouge PD',
    city: 'Baton Rouge',
    parish: 'East Baton Rouge',
    location_map_url: 'https://i.imgur.com/nHTFohI.png',
  },
  {
    type: 'DOCUMENT',
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
]
