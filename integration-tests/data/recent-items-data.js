export const department9DetailsData = {
  id: 9,
  name: 'Baton Rouge Department 1',
  city: 'Baton Rouge',
  parish: 'East Baton Rouge',
  location_map_url: 'https://i.imgur.com/nHTFohI.png',
  documents_count: 1,
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
          id: 9,
          name: 'Baton Rouge Department 1',
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
    id: 9,
    name: 'Baton Rouge Department 1',
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
        id: 10035,
        name: 'New Orleans PD',
      },
    ],
  },
]

export const recentItemsData = {
  department: [
    {
      id: 9,
      name: 'Baton Rouge Department 1',
      city: 'Baton Rouge',
      parish: 'East Baton Rouge',
      location_map_url: 'https://i.imgur.com/nHTFohI.png',
    },
  ],
  officer: [
    {
      id: 1,
      name: 'Mark Carlson',
      badges: ['12435', '612'],
      department: {
        id: 9,
        name: 'Baton Rouge Department 1',
      },
    },
  ],
  document: [
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
  ],
}