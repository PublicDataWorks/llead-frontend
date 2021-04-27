import React from 'react'
import { render } from '@testing-library/react'

import UnitChangeItem from 'components/officer-page/timeline/unit-change-item'
import { TIMELINE_KINDS } from 'constants/common'

describe('UnitChangeItem component', () => {
  it('renders component successfully', () => {
    const props = {
      kind: TIMELINE_KINDS.UNIT_CHANGE,
      departmentCode: '101',
      departmentDesc: 'joined unit desc',
      prevDepartmentCode: '100',
      prevDepartmentDesc: 'left unit desc',
    }

    const container = render(<UnitChangeItem {...props} />)

    const { baseElement } = container

    expect(baseElement.textContent).toContain(
      'Leave Unit 100 - left unit desc'
    )
    expect(baseElement.textContent).toContain(
      'Joined\u00A0Unit 101 - joined unit desc'
    )
  })

  it('does not render previous department if there is no infomation about that', () => {
    const props = {
      kind: TIMELINE_KINDS.UNIT_CHANGE,
      departmentCode: '101',
      departmentDesc: 'joined unit desc',
    }

    const container = render(<UnitChangeItem {...props} />)

    const { baseElement } = container

    expect(baseElement.textContent).not.toContain('Leave')
    expect(baseElement.textContent).toContain(
      'Joined\u00A0Unit 101 - joined unit desc'
    )
  })
})
