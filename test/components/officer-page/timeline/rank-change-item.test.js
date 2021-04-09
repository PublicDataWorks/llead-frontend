import React from 'react'
import { render } from '@testing-library/react'

import RankChangeItem from 'components/officer-page/timeline/rank-change-item'
import { TIMELINE_KINDS } from 'constants/common'

describe('SalaryChangeItem component', () => {
  it('renders component successfully', () => {
    const props = {
      kind: TIMELINE_KINDS.RANK_CHANGE,
      rankDesc: 'senior police officer',
    }

    const container = render(<RankChangeItem {...props} />)

    const { baseElement } = container

    expect(baseElement.textContent).toEqual(
      'Changed rank to senior police officer'
    )
  })
})
