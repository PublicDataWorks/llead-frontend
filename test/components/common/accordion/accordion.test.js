import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Accordion from 'components/common/accordion/accordion'

describe('Accordion component', () => {
  it('renders correctly', () => {
    const qAndA = {
      question: 'Mauris id nibh eu fermentum?',
      answer: 'Nibh quisque suscipit fermentum netus nulla cras',
    }

    const container = render(
      <Accordion title={qAndA.question} content={qAndA.answer} />
    )

    const { baseElement, getByText } = container
    const icon = baseElement.getElementsByClassName('icon')[0]

    expect(getByText('Mauris id nibh eu fermentum?').className).toEqual('title')
    expect(
      getByText('Nibh quisque suscipit fermentum netus nulla cras').className
    ).toEqual('accordion-content')

    expect(icon.classList.length).toEqual(1)
    expect(icon.classList.value).not.toContain('expanded')
  })

  it('expands the content when clicking', () => {
    const qAndA = {
      question: 'Mauris id nibh eu fermentum?',
      answer: 'Nibh quisque suscipit fermentum netus nulla cras',
    }

    const container = render(
      <Accordion title={qAndA.question} content={qAndA.answer} />
    )

    const { baseElement } = container
    const accordion = baseElement.getElementsByClassName('accordion')[0]
    const icon = baseElement.getElementsByClassName('icon')[0]

    expect(icon.classList.length).toEqual(1)
    expect(icon.classList.value).not.toContain('expanded')

    fireEvent.click(accordion)

    expect(icon.classList.length).toEqual(2)
    expect(icon.classList.value).toContain('expanded')
  })
})
