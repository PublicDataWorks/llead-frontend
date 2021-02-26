export const departmentDetailsData = {
  id: 23,
  name: 'Harmonbury Department',
  city: 'Baton Rouge',
  parish: 'East Baton Rouge',
  data_period: ['2018', '2020'],
  location_map_url: null,
  officers_count: 3,
  complaints_count: 2,
  documents_count: 1,
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
  next: 'http://localhost:8000/api/departments/23/documents/?limit=5&offset=5',
  previous: null,
  results: [
    {
      id: 1,
      document_type: 'json',
      title: 'Pattern risk team election myself suffer wind.',
      url: '/glass/shoulder.pdf',
      incident_date: '2020-05-04',
      preview_image_url: '/him/process.jpg',
      pages_count: 15,
    },
    {
      id: 2,
      document_type: 'flac',
      title: 'Structure land official huge draw significant.',
      url: '/after/last.pdf',
      incident_date: '2020-05-04',
      preview_image_url: '/traditional/particularly.jpg',
      pages_count: 20,
    },
    {
      id: 3,
      document_type: 'doc',
      title: 'Skin range quite might.',
      url: '/ok/our.pdf',
      incident_date: '2020-05-04',
      preview_image_url: '/blood/same.jpg',
      pages_count: 3,
    },
    {
      id: 4,
      document_type: 'mp3',
      title: 'Hold surface cultural deep education occur analysis.',
      url: '/difference/site.pdf',
      incident_date: '2020-05-04',
      preview_image_url: '/vote/serve.jpg',
      pages_count: 3,
    },
    {
      id: 5,
      document_type: 'js',
      title: 'Letter industry good quite serious hotel church.',
      url: '/threat/place.pdf',
      incident_date: '2020-05-04',
      preview_image_url: '/college/but.jpg',
      pages_count: 1,
    },
  ],
}

export const departmentNextDocumentsData = {
  count: 10,
  next: null,
  previous: 'http://localhost:8000/api/departments/23/documents/?limit=5',
  results: [
    {
      id: 6,
      document_type: 'xls',
      title: 'Quality practice real think image training buy.',
      url: '/be/agent.pdf',
      incident_date: '2020-05-04',
      preview_image_url: '/indeed/still.jpg',
      pages_count: 10,
    },
    {
      id: 7,
      document_type: 'pptx',
      title: 'Democratic those body cold win.',
      url: '/learn/style.pdf',
      incident_date: '2020-05-04',
      preview_image_url: '/third/common.jpg',
      pages_count: 18,
    },
    {
      id: 8,
      document_type: 'js',
      title: 'Film road I seat huge mind.',
      url: '/yard/so.pdf',
      incident_date: '2020-05-04',
      preview_image_url: '/morning/tree.jpg',
      pages_count: 9,
    },
    {
      id: 9,
      document_type: 'numbers',
      title: 'Learn reach significant no.',
      url: '/image/discuss.pdf',
      incident_date: '2019-11-06',
      preview_image_url: '/pay/effect.jpg',
      pages_count: 17,
    },
    {
      id: 10,
      document_type: 'mp3',
      title: 'Later sure once thought film.',
      url: '/tonight/form.pdf',
      incident_date: '2019-11-06',
      preview_image_url: '/record/growth.jpg',
      pages_count: 7,
    },
  ],
}
