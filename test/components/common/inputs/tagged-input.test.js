import React from 'react'
import { render, screen } from '@testing-library/react'

import TaggedInput from 'components/common/inputs/tagged-input'

describe('Input component', () => {
  it('displays transparent input with tag', () => {
    const inputClass = 'input-class'
    render(
      <TaggedInput
        iconSrc='src'
        className={inputClass}
        placeholder='placeholder'
        searchTag='department'
      />
    )

    expect(screen.getByPlaceholderText('placeholder').classList).toContain(
      'transparent-input'
    )
    expect(screen.getByText('department').classList).toContain('search-tag')
  })

  it('displays transparent input without tag', () => {
    const inputClass = 'input-class'
    const { container } = render(
      <TaggedInput
        iconSrc='src'
        className={inputClass}
        placeholder='placeholder'
      />
    )

    expect(screen.getByPlaceholderText('placeholder').classList).toContain(
      'transparent-input'
    )
    expect(container.getElementsByClassName('search-tag').length).toBe(0)
  })
})
