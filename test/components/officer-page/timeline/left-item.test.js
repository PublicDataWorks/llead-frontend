import React from 'react'
import { render } from '@testing-library/react'

import { TIMELINE_KINDS } from 'constants/common'
import LeftEventItem from 'components/officer-page/timeline/left-item'

describe('PC12QualificationItem component', () => {
  it('renders item', () => {
    const kind = TIMELINE_KINDS.TERMINATED
    const department = 'Mandeville PD'

    const container = render(
      <LeftEventItem kind={kind} department={department} />
    )

    const { getByText } = container

    expect(
      getByText('Terminated from Mandeville PD').classList.value
    ).toContain('timeline-terminated-item')
  })
})
