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
    id: 9,
    name: 'Baton Rouge Department 1',
    city: 'Baton Rouge',
    parish: 'East Baton Rouge',
    location_map_url: 'https://i.imgur.com/nHTFohI.png',
  },
  {
    id: 5,
    name: 'New Orleans Department 1',
    city: 'New Orleans',
    parish: 'Orleans',
    location_map_url: 'https://i.imgur.com/DO9ASUd.jpeg',
  },
  {
    id: 8,
    name: 'Baton Rouge Department 2',
    city: 'Baton Rouge',
    parish: 'East Baton Rouge',
    location_map_url: 'https://i.imgur.com/nHTFohI.png',
  },
  {
    id: 2,
    name: 'New Orleans Department 2',
    city: 'New Orleans',
    parish: 'Orleans',
    location_map_url: null,
  },
  {
    id: 6,
    name: 'New Orleans Department 3',
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
      id: 9,
      name: 'Baton Rouge Department 1',
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
      id: 8,
      name: 'Baton Rouge Department 2',
    },
  },
  {
    id: 2,
    name: 'Tina Holder',
    badges: ['20079'],
    department: {
      id: 5,
      name: 'New Orleans Department 1',
    },
  },
  {
    id: 7,
    name: 'Kelly Hunt',
    badges: ['12117'],
    department: {
      id: 2,
      name: 'New Orleans Department 2',
    },
  },
]
