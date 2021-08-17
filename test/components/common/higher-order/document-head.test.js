import React from 'react'
import { render, waitFor } from '@testing-library/react'

import DocumentHead from 'components/common/higher-order/document-head'

describe('DocumentHead component', () => {
  it('renders document with document head', async () => {
    const documentHeadProps = {
      title: 'page title',
    }
    render(<DocumentHead documentHead={documentHeadProps} />)

    await waitFor(() => expect(document.title).toEqual('page title'))
  })
})
