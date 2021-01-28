import React from 'react'
import { render } from '@testing-library/react'

import DocumentCard from 'components/common/cards/document-card'

describe('Document card component', () => {
  it('should render correctly', () => {
    const props = {
      type: 'csv',
      title: 'document-2',
      previewImageUrl: 'previewImageUrl-2',
      incidentDate: 'Dec 1, 2020',
      departments: [
        {
          id: 10,
          name: 'department-2',
        },
      ],
    }

    const container = render(<DocumentCard {...props} />)
    const { baseElement } = container

    expect(baseElement.textContent.includes(props.type)).toBe(true)
    expect(baseElement.textContent.includes(props.title)).toBe(true)
    expect(baseElement.textContent.includes(props.incidentDate)).toBe(true)
    expect(baseElement.textContent.includes(props.departments[0].name)).toBe(
      true
    )
  })
})
