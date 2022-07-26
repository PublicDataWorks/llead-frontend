import React from 'react'
import sinon from 'sinon'
import { fireEvent, render } from '@testing-library/react'

import IntroCard from 'components/front-page/intro-card'

describe('IntroCard component', () => {
  it('renders correctly', () => {
    const analyticSummary = {
      departmentsCount: 45,
      documentsCount: 669,
      newsArticlesCount: 37390,
      officersCount: 65871,
    }

    const setCardIndexStub = sinon.stub()

    const props = {
      cardIndex: 0,
      content: 'Content 1',
      setCardIndex: setCardIndexStub,
      analyticSummary: analyticSummary,
      lastCardIndex: 3,
    }

    const container = render(<IntroCard {...props} />)
    const { baseElement, getByText } = container

    expect(baseElement.getElementsByClassName('bar').length).toEqual(4)

    expect(getByText('Content 1').parentElement.className).toEqual('content')
    expect(baseElement.getElementsByClassName('overview').length).toEqual(0)

    const navigationButton = baseElement.getElementsByClassName(
      'navigation-button'
    )[0]

    expect(
      navigationButton.getElementsByClassName('previous-button').length
    ).toEqual(1)
    expect(
      navigationButton
        .getElementsByClassName('previous-button')[0]
        .hasAttribute('disabled')
    ).toEqual(true)
    expect(
      navigationButton.getElementsByClassName('next-button').length
    ).toEqual(1)
    expect(
      navigationButton
        .getElementsByClassName('next-button')[0]
        .hasAttribute('disabled')
    ).toEqual(false)

    expect(baseElement.getElementsByClassName('layer2').length).toEqual(1)
    expect(baseElement.getElementsByClassName('layer3').length).toEqual(1)
  })

  it('renders the last card', () => {
    const analyticSummary = {
      departmentsCount: 45,
      documentsCount: 669,
      newsArticlesCount: 37390,
      officersCount: 65871,
    }

    const setCardIndexStub = sinon.stub()

    const props = {
      cardIndex: 3,
      content: null,
      setCardIndex: setCardIndexStub,
      analyticSummary: analyticSummary,
      lastCardIndex: 3,
    }

    const container = render(<IntroCard {...props} />)
    const { baseElement, getByText } = container

    expect(baseElement.getElementsByClassName('bar').length).toEqual(4)
    expect(baseElement.getElementsByClassName('content').length).toEqual(0)

    expect(getByText('LLEAD includes', { exact: false }).className).toEqual(
      'date'
    )
    expect(getByText('45 departments').className).toEqual('item')
    expect(getByText('65,871 officers').className).toEqual('item')
    expect(getByText('669 documents').className).toEqual('item')
    expect(getByText('37,390 news articles').className).toEqual('item')

    const navigationButton = baseElement.getElementsByClassName(
      'navigation-button'
    )[0]

    expect(
      navigationButton.getElementsByClassName('previous-button').length
    ).toEqual(1)
    expect(
      navigationButton
        .getElementsByClassName('previous-button')[0]
        .hasAttribute('disabled')
    ).toEqual(false)
    expect(
      navigationButton.getElementsByClassName('next-button').length
    ).toEqual(1)
    expect(
      navigationButton
        .getElementsByClassName('next-button')[0]
        .hasAttribute('disabled')
    ).toEqual(true)
  })

  it('triggers to next index when clicking next button', () => {
    const analyticSummary = {
      departmentsCount: 45,
      documentsCount: 669,
      newsArticlesCount: 37390,
      officersCount: 65871,
    }

    const setCardIndexStub = sinon.stub()

    const props = {
      cardIndex: 1,
      content: 'Content 1',
      setCardIndex: setCardIndexStub,
      analyticSummary: analyticSummary,
      lastCardIndex: 3,
    }

    const container = render(<IntroCard {...props} />)
    const { baseElement } = container

    const navigationButton = baseElement.getElementsByClassName(
      'navigation-button'
    )[0]

    const nextButton = navigationButton.getElementsByClassName('next-button')[0]
    fireEvent.click(nextButton)

    expect(setCardIndexStub).toHaveBeenCalledWith(2)
  })

  it('triggers to next index when clicking the card', () => {
    const analyticSummary = {
      departmentsCount: 45,
      documentsCount: 669,
      newsArticlesCount: 37390,
      officersCount: 65871,
    }

    const setCardIndexStub = sinon.stub()

    const props = {
      cardIndex: 1,
      content: 'Content 1',
      setCardIndex: setCardIndexStub,
      analyticSummary: analyticSummary,
      lastCardIndex: 3,
    }

    const container = render(<IntroCard {...props} />)
    const { baseElement } = container

    const content = baseElement.getElementsByClassName('content')[0]
    fireEvent.click(content)

    expect(setCardIndexStub).toHaveBeenCalledWith(2)
  })

  it('triggers to previous index when clicking previous button', () => {
    const analyticSummary = {
      departmentsCount: 45,
      documentsCount: 669,
      newsArticlesCount: 37390,
      officersCount: 65871,
    }

    const setCardIndexStub = sinon.stub()

    const props = {
      cardIndex: 1,
      content: 'Content 1',
      setCardIndex: setCardIndexStub,
      analyticSummary: analyticSummary,
      lastCardIndex: 3,
    }

    const container = render(<IntroCard {...props} />)
    const { baseElement } = container

    const navigationButton = baseElement.getElementsByClassName(
      'navigation-button'
    )[0]

    const previousButton = navigationButton.getElementsByClassName(
      'previous-button'
    )[0]
    fireEvent.click(previousButton)

    expect(setCardIndexStub).toHaveBeenCalledWith(0)
  })
})
