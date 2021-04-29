import React from 'react'
import { render } from '@testing-library/react'

import SalaryChangeItem from 'components/officer-page/timeline/salary-change-item'
import { TIMELINE_KINDS } from 'constants/common'

describe('SalaryChangeItem component', () => {
  it('renders component successfully', () => {
    const props = {
      kind: TIMELINE_KINDS.SALARY_CHANGE,
      annualSalary: '$50,526.78',
    }

    const container = render(<SalaryChangeItem {...props} />)

    const { baseElement } = container

    expect(baseElement.textContent).toEqual('Salary changed to $50,526.78/yr')
  })
})
