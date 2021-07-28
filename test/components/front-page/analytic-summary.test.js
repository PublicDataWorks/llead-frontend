import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import AnalyticSummary from 'components/front-page/analytic-summary'

describe('AnalyticSummary component', () => {
  it('should render correctly', () => {
    const mockDepartmentScrollIntoView = jest.fn()
    const mockOfficerScrollIntoView = jest.fn()
    const mockDocumentScrollIntoView = jest.fn()
    const mockDepartmentRef = {
      current: {
        scrollIntoView: mockDepartmentScrollIntoView,
      },
    }
    const mockOfficerRef = {
      current: {
        scrollIntoView: mockOfficerScrollIntoView,
      },
    }
    const mockDocumentRef = {
      current: {
        scrollIntoView: mockDocumentScrollIntoView,
      },
    }

    const analyticSummary = {
      departmentsCount: 4,
      officersCount: 5,
      documentsCount: 60000,
      recentDepartmentsCount: 1,
      recentOfficersCount: 2,
      recentDocumentsCount: 3,
      recentDays: 30,
    }

    const container = render(
      <AnalyticSummary
        analyticSummary={analyticSummary}
        departmentRef={mockDepartmentRef}
        officerRef={mockOfficerRef}
        documentRef={mockDocumentRef}
      />
    )
    const { baseElement } = container

    expect(baseElement.textContent).toContain('4 departments')
    expect(baseElement.textContent).toContain('+1 in the past\u00A030 days')
    expect(baseElement.textContent).toContain('5 officers')
    expect(baseElement.textContent).toContain('+2 in the past\u00A030 days')
    expect(baseElement.textContent).toContain('60,000 documents')
    expect(baseElement.textContent).toContain('+3 in the past\u00A030 days')

    const sections = baseElement.getElementsByClassName('analytic-summary-item')

    const documentSection = sections[0]
    expect(mockDocumentScrollIntoView).not.toHaveBeenCalled()
    fireEvent.click(documentSection)
    expect(mockDocumentScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })

    const officerSection = sections[1]
    expect(mockOfficerScrollIntoView).not.toHaveBeenCalled()
    fireEvent.click(officerSection)
    expect(mockOfficerScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })

    const departmentSection = sections[2]
    expect(mockDepartmentScrollIntoView).not.toHaveBeenCalled()
    fireEvent.click(departmentSection)
    expect(mockDepartmentScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })
  })
})
