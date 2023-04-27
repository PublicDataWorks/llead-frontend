import React from 'react'
import sinon from 'sinon'
import { fireEvent, render } from '@testing-library/react'

import Findings from 'components/front-page/findings'

describe('Findings component', () => {
  it('fetches data', () => {
    const fetchFindingsSpy = sinon.spy()

    render(<Findings fetchFindings={fetchFindingsSpy} />)

    expect(fetchFindingsSpy).toHaveBeenCalled()
  })

  it('renders correctly', () => {
    const findings = {
      backgroundImageUrl: 'http://llead.co/findings/background/Frame_6.png',
      title: 'LLEAD FINDINGS',
      description:
        'LLEAD consolidates personnel, police misconduct, use of force, and other related datasets from over 500 law enforcement agencies in the state of Louisiana. Visit the findings page to explore our internal investigations, along with news articles and academic research citing LLEAD’s data.',
      cardImageUrl: 'http://llead.co/findings/card/police_department.jpeg',
      cardTitle:
        'Many law enforcement agencies failing to report information on departing officers, group finds',
      cardAuthor: 'Richard A.Webster',
      cardDepartment: 'New Orleans Police Department',
    }

    const container = render(<Findings findings={findings} />)
    const { baseElement, getByText } = container

    expect(baseElement.getElementsByClassName('findings').length).toEqual(1)
    expect(getByText('LLEAD FINDINGS').className).toEqual('findings-title')
    expect(
      baseElement.getElementsByClassName('findings-description')[0].textContent
    ).toEqual(
      'LLEAD consolidates personnel, police misconduct, use of force, and other related datasets from over 500 law enforcement agencies in the state of Louisiana. Visit the findings page to explore our internal investigations, along with news articles and academic research citing LLEAD’s data.'
    )
    expect(getByText('Read more').classList).toContain('findings-readmore')
    expect(getByText('New Orleans Police Department').className).toEqual(
      'findings-card-layer1-department'
    )
    expect(getByText('New Orleans Police Department').className).toEqual(
      'findings-card-layer1-department'
    )
    expect(
      getByText(
        'Many law enforcement agencies failing to report information on departing officers, group finds'
      ).className
    ).toEqual('findings-card-layer1-title')
    expect(getByText('by Richard A.Webster').className).toEqual(
      'findings-card-layer1-footer'
    )
  })

  it('does not render when no findings', () => {
    const container = render(<Findings />)
    const { baseElement } = container

    expect(baseElement.getElementsByClassName('findings').length).toEqual(0)
  })

  it('goes to findings page when click Read more', () => {
    global.window = Object.create(window)
    const url = 'https://findings.llead.co'
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
      writable: true,
    })

    const fetchFindingsSpy = sinon.spy()

    const findings = {
      backgroundImageUrl: 'http://llead.co/findings/background/Frame_6.png',
      title: 'LLEAD FINDINGS',
      description:
        'LLEAD consolidates personnel, police misconduct, use of force, and other related datasets from over 500 law enforcement agencies in the state of Louisiana. Visit the findings page to explore our internal investigations, along with news articles and academic research citing LLEAD’s data.',
      cardImageUrl: 'http://llead.co/findings/card/police_department.jpeg',
      cardTitle:
        'Many law enforcement agencies failing to report information on departing officers, group finds',
      cardAuthor: 'Richard A.Webster',
      cardDepartment: 'New Orleans Police Department',
    }

    const container = render(
      <Findings fetchFindings={fetchFindingsSpy} findings={findings} />
    )

    const { getByText } = container

    const readMore = getByText('Read more')

    fireEvent.click(readMore)

    expect(window.location.href).toEqual('https://findings.llead.co/')
  })
})
