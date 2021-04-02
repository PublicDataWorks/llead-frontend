export const officerDetailsData = {
  id: 24,
  name: 'Corliss Conway',
  badges: ['911', '192'],
  birth_year: 1962,
  race: 'white',
  gender: 'male',
  department: {
    id: 10024,
    name: 'New Orleans PD',
  },
  annual_salary: '57k',
  documents_count: 3,
  complaints_count: 0,
  data_period: ['2012', '2013', '2014', '2017-2019'],
  documents_data_period: ['2012', '2017'],
  complaints_data_period: [],
}

export const officerDocumentsData = [
  {
    id: 1,
    document_type: 'json',
    title: 'Pattern risk team election myself suffer wind.',
    url: 'http://documents.com/glass/shoulder.pdf',
    incident_date: '2020-05-04',
    preview_image_url: 'http://image.com/glass/shoulder-preview.pdf',
    pages_count: 2,
    text_content: 'Daryl Edgens made a motion to call for the examinations',
    departments: [
      {
        id: 10034,
        name: 'Port Allen PD',
      },
    ],
  },
  {
    id: 2,
    document_type: 'flac',
    title: 'Structure land official huge draw significant.',
    url: 'http://documents.com/after/last.pdf',
    incident_date: '2020-05-04',
    preview_image_url: 'http://image.com/after/last-preview.pdf',
    pages_count: 7,
    text_content: '',
    departments: [
      {
        id: 10035,
        name: 'ABC PD',
      },
    ],
  },
  {
    id: 3,
    document_type: 'doc',
    title: 'Skin range quite might.',
    url: 'http://documents.com/image/our.pdf',
    incident_date: '2020-05-04',
    preview_image_url: 'http://image.com/image/our-preview.pdf',
    pages_count: 4,
    text_content: '',
    departments: [
      {
        id: 10036,
        name: 'Any PD',
      },
    ],
  },
]

export const officerTimelineData = [
  {
    kind: 'COMPLAINT',
    date: '2019-03-10',
    year: 2019,
    rule_violation: 'officer rule violation 2019-03-10',
    paragraph_violation: 'officer paragraph violation 2019-03-10',
    disposition: 'officer dispostion 2019-03-10',
    action: 'officer action 2019-03-10',
    tracking_number: '10-03',
  },
  {
    kind: 'COMPLAINT',
    date: null,
    year: null,
    rule_violation: 'officer rule violation of unknowed time',
    paragraph_violation: 'officer paragraph violation of unknowed time',
    disposition: 'officer dispostion of unknowed time',
    action: 'officer action of unknowed time',
    tracking_number: '123-456',
  },
  {
    kind: 'COMPLAINT',
    date: null,
    year: 2020,
    rule_violation: 'officer rule violation year 2020',
    paragraph_violation: 'officer paragraph violation year 2020',
    disposition: 'officer dispostion year 2020',
    action: 'officer action year 2020',
    tracking_number: '2020',
  },
  {
    kind: 'COMPLAINT',
    date: '2019-03-10',
    year: 2019,
    rule_violation: 'officer rule violation 2019-03-10 no1',
    paragraph_violation: 'officer paragraph violation 2019-03-10 no1',
    disposition: 'officer dispostion 2019-03-10 no1',
    action: 'officer action 2019-03-10 no1',
    tracking_number: '10-03-1',
  },
  {
    kind: 'JOINED',
    date: null,
    year: null,
  },
  {
    kind: 'LEFT',
    date: '2020-03-10',
    year: 2020,
  },
]
