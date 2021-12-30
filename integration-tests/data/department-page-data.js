export const departmentDetailsData = {
  id: 'harmonbury-department',
  name: 'Harmonbury Department',
  city: 'Baton Rouge',
  parish: 'East Baton Rouge',
  address: '1 Third St #1, New Orleans, LA 70130',
  phone: '(504) 891-7585',
  data_period: ['2013', '2015', '2017', '2020'],
  location_map_url: null,
  documentsCount: 3,
  recentDocumentsCount: 2,
  datasetsCount: 5,
  recentDatasetsCount: 1,
  officersCount: 1000,
  newsArticlesCount: 123,
  recentNewsArticlesCount: 12,
  incidentForceCount: 1,
  sustainedComplaintsCount: 10,
  complaintsCount: 40,
  wrgl_files: [
    {
      id: 1,
      name: 'match cprr madisonville pd 2010 2020',
      slug: 'match-cprr-madisonville-pd-2010-2020',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url:
        'https://www.wrgl.co/em/@huynguyen-ea/r/test/f28f1f111cfe27650a7070a9fb70241d',
      download_url:
        'https://www.wrgl.co/api/v1/users/huynguyen-ea/repos/test/commits/f28f1f111cfe27650a7070a9fb70241d/csv',
      default_expanded: true,
    },
    {
      id: 2,
      name: 'test 2',
      slug: 'test-2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat idatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      url:
        'https://www.wrgl.co/em/@huynguyen-ea/r/test/f28f1f111cfe27650a7070a9fb70241d',
      download_url:
        'https://www.wrgl.co/api/v1/users/huynguyen-ea/repos/test/commits/f28f1f111cfe27650a7070a9fb70241d/csv',
      default_expanded: false,
    },
  ],
}

export const departmentDocumentData = {
  count: 10,
  next: 'http://localhost:8000/api/departments/harmonbury-department/documents/?limit=5&offset=5',
  previous: null,
  results: [
    {
      id: 1,
      document_type: 'json',
      title: 'Pattern risk team election myself suffer wind.',
      url: 'http://documents.com/glass/shoulder.pdf',
      incident_date: '2020-05-04',
      preview_image_url: 'http://image.com/him/process.jpg',
      pages_count: 15,
      text_content:
        'Motion by Daryl Edgens to approve exam grades for Fire Investigator',
      departments: [
        {
          id: 'harmonbury-department',
          name: 'Harmonbury Department',
        },
      ],
    },
    {
      id: 2,
      document_type: 'flac',
      title: 'Structure land official huge draw significant.',
      url: 'http://documents.com/after/last.pdf',
      incident_date: '2020-05-04',
      preview_image_url: 'http://image.com/traditional/particularly.jpg',
      pages_count: 20,
      text_content:
        'Assistant Chief Fire Investigator and Assistant Fire Prevention Chief',
      departments: [
        {
          id: 'harmonbury-department',
          name: 'Harmonbury Department',
        },
      ],
    },
    {
      id: 3,
      document_type: 'doc',
      title: 'Skin range quite might.',
      url: 'http://documents.com/ok/our.pdf',
      incident_date: '2020-05-04',
      preview_image_url: 'http://image.com/blood/same.jpg',
      pages_count: 3,
      text_content: '',
      departments: [
        {
          id: 'harmonbury-department',
          name: 'Harmonbury Department',
        },
      ],
    },
    {
      id: 4,
      document_type: 'mp3',
      title: 'Hold surface cultural deep education occur analysis.',
      url: 'http://documents.com/difference/site.pdf',
      incident_date: '2020-05-04',
      preview_image_url: 'http://image.com/vote/serve.jpg',
      pages_count: 3,
      text_content: '',
      departments: [
        {
          id: 'harmonbury-department',
          name: 'Harmonbury Department',
        },
      ],
    },
    {
      id: 5,
      document_type: 'js',
      title: 'Letter industry good quite serious hotel church.',
      url: 'http://documents.com/threat/place.pdf',
      incident_date: '2020-05-04',
      preview_image_url: 'http://image.com/college/but.jpg',
      pages_count: 1,
      text_content: '',
      departments: [
        {
          id: 'harmonbury-department',
          name: 'Harmonbury Department',
        },
      ],
    },
  ],
}

export const departmentNextDocumentsData = {
  count: 10,
  next: null,
  previous: 'http://localhost:8000/api/departments/harmonbury-department/documents/?limit=5',
  results: [
    {
      id: 6,
      document_type: 'xls',
      title: 'Quality practice real think image training buy.',
      url: 'http://documents.com/be/agent.pdf',
      incident_date: '2020-05-04',
      preview_image_url: 'http://image.com/indeed/still.jpg',
      pages_count: 10,
      text_content: '',
      departments: [
        {
          id: 'harmonbury-department',
          name: 'Harmonbury Department',
        },
      ],
    },
    {
      id: 7,
      document_type: 'pptx',
      title: 'Democratic those body cold win.',
      url: 'http://documents.com/learn/style.pdf',
      incident_date: '2020-05-04',
      preview_image_url: 'http://image.com/third/common.jpg',
      pages_count: 18,
      text_content: '',
      departments: [
        {
          id: 'harmonbury-department',
          name: 'Harmonbury Department',
        },
      ],
    },
    {
      id: 8,
      document_type: 'js',
      title: 'Film road I seat huge mind.',
      url: 'http://documents.com/yard/so.pdf',
      incident_date: '2020-05-04',
      preview_image_url: 'http://image.com/morning/tree.jpg',
      pages_count: 9,
      text_content: '',
      departments: [
        {
          id: 'harmonbury-department',
          name: 'Harmonbury Department',
        },
      ],
    },
    {
      id: 9,
      document_type: 'numbers',
      title: 'Learn reach significant no.',
      url: 'http://documents.com/image/discuss.pdf',
      incident_date: '2019-11-06',
      preview_image_url: 'http://image.com/pay/effect.jpg',
      pages_count: 17,
      text_content: '',
      departments: [
        {
          id: 'harmonbury-department',
          name: 'Harmonbury Department',
        },
      ],
    },
    {
      id: 10,
      document_type: 'mp3',
      title: 'Later sure once thought film.',
      url: 'http://documents.com/tonight/form.pdf',
      incident_date: '2019-11-06',
      preview_image_url: 'http://image.com/record/growth.jpg',
      pages_count: 7,
      text_content: '',
      departments: [
        {
          id: 'harmonbury-department',
          name: 'Harmonbury Department',
        },
      ],
    },
  ],
}

export const departmentDocumentsSearchData = {
  count: 4,
  next:
    'http://localhost:8000/api/departments/harmonbury-department/documents/?limit=2&offset=2&q=this',
  previous: null,
  results: [
    {
      text_content: 'This is the text content no 1',
      text_content_highlight: '<em>This</em> is the text content no 1',
      id: 111,
      document_type: 'pdf',
      title: 'Search result No 1',
      url: 'https://picsum.photos/200/300',
      incident_date: '2019-11-06',
      departments: [
        {
          id: 'harmonbury-department',
          name: 'Harmonbury Department',
        },
      ],
    },
    {
      text_content: 'This is the text content no 2',
      text_content_highlight: '<em>This</em> is the text content no 2',
      id: 112,
      document_type: 'png',
      title: 'Search result No 2',
      url: 'https://picsum.photos/200/300',
      incident_date: '2018-09-05',
      departments: [
        {
          id: 'harmonbury-department',
          name: 'Harmonbury Department',
        },
      ],
    },
  ],
}

export const departmentDocumentsSearchNextData = {
  count: 4,
  next: null,
  previous:
    'http://localhost:8000/api/departments/harmonbury-department/documents/?limit=2&q=this',
  results: [
    {
      text_content: 'This is the text content no 3',
      text_content_highlight: '<em>This</em> is the text content no 3',
      id: 111,
      document_type: 'avd',
      title: 'Search result No 3',
      url: 'https://picsum.photos/200/300',
      incident_date: null,
      departments: [
        {
          id: 'harmonbury-department',
          name: 'Harmonbury Department',
        },
      ],
    },
    {
      text_content: 'This is the text content no 4',
      text_content_highlight: '<em>This</em> is the text content no 4',
      id: 112,
      document_type: 'jpeg',
      title: 'Search result No 4',
      url: 'https://picsum.photos/200/300',
      incident_date: '2017-07-12',
      departments: [
        {
          id: 'harmonbury-department',
          name: 'Harmonbury Department',
        },
      ],
    },
  ],
}
