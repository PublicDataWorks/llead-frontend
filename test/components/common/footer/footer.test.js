import React from 'react'
import { render } from '@testing-library/react'

import Footer from 'components/common/footer'

describe('Footer component', () => {
  it('should render correctly', () => {
    const cmsMock = {
      text:
        '[**Innocence Project New Orleans**](https://ip-no.org) in collaboration with [**Public Data Works**](https://publicdata.works)',
    }

    const container = render(<Footer cms={cmsMock} />)
    const { getByText } = container

    const publicDataWorksLink = getByText('Public Data Works')
    expect(publicDataWorksLink).toBeTruthy()
    expect(publicDataWorksLink.nodeName).toEqual('STRONG')
    expect(publicDataWorksLink.parentElement.nodeName).toEqual('A')

    const IPNOLink = getByText('Innocence Project New Orleans')
    expect(IPNOLink).toBeTruthy()
    expect(IPNOLink.nodeName).toEqual('STRONG')
    expect(IPNOLink.parentElement.nodeName).toEqual('A')
  })
})
