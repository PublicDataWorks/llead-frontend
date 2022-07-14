import React from 'react'
import { render } from '@testing-library/react'
import sinon from 'sinon'

import AboutPage from 'components/about-page'

describe('About page', () => {
  it('renders correctly', () => {
    const cms = {
      summart: 'LLEAD introduction',
    }

    const information = [
      {
        section: 'general',
        qAndA: [
          {
            question:
              'Mauris id nibh eu fermentum mattis purus Mauris id nibh eu fermentum mattis purus Mauris id nibh eu fermentum mattis purus Mauris id nibh eu fermentum mattis purus Mauris id nibh eu fermentum mattis purus Mauris id nibh eu fermentum mattis purus Mauris id nibh eu fermentum mattis purus?',
            answer:
              'Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.',
          },
          {
            question: 'Mauris id nibh eu fermentum?',
            answer:
              'Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.',
          },
        ],
      },
      {
        section: 'group 2',
        qAndA: [
          {
            question: 'Mauris id nibh eu fermentum mattis purus?',
            answer:
              'Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.',
          },
        ],
      },
      {
        section: 'group 3',
        qAndA: [],
      },
    ]

    const fetchQAAStub = sinon.stub()

    const container = render(
      <AboutPage cms={cms} qAA={information} fetchQAA={fetchQAAStub} />
    )

    const { baseElement, getByText } = container
    const aboutPage = baseElement.getElementsByClassName('about-page')[0]

    expect(fetchQAAStub).toHaveBeenCalled()
    expect(getByText('About LLEAD').className).toEqual('title')

    expect(getByText('GENERAL').className).toEqual('section-name')
    expect(getByText('GROUP 2').className).toEqual('section-name')
    expect(getByText('GROUP 3').className).toEqual('section-name')

    const questions = aboutPage.getElementsByClassName('question')
    expect(questions.length).toEqual(3)
    expect(questions[0].getElementsByClassName('accordion')).toBeTruthy()
  })

  it('does not render questions and answers if no information', () => {
    const cms = {
      summart: 'LLEAD introduction',
    }

    const information = []

    const fetchQAAStub = sinon.stub()

    const container = render(
      <AboutPage cms={cms} qAA={information} fetchQAA={fetchQAAStub} />
    )

    const { baseElement, getByText } = container
    const aboutPage = baseElement.getElementsByClassName('about-page')[0]

    expect(fetchQAAStub).toHaveBeenCalled()
    expect(getByText('About LLEAD').className).toEqual('title')

    expect(aboutPage.getElementsByClassName('section')[0]).toBeFalsy()
  })
})
