import React from 'react'
import Modal from 'react-modal'
import { render, fireEvent, act } from '@testing-library/react'
import sinon from 'sinon'

import ContactPage from 'components/contact-page'

describe('About page', () => {
  beforeEach(() => {
    Modal.setAppElement(document.createElement('div'))
  })

  it('renders correctly', () => {
    const sendMessageResponse = {}
    const saveFeedbackStub = sinon.stub()

    const container = render(
      <ContactPage
        saveFeedback={saveFeedbackStub}
        sendMessageResponse={sendMessageResponse}
      />
    )

    const { baseElement, getByPlaceholderText, queryByText } = container

    expect(queryByText('Get in touch').className).toEqual('contact-title')

    expect(getByPlaceholderText('Your email').className).toEqual(
      'contact-email'
    )
    expect(getByPlaceholderText('Write us a message').className).toEqual(
      'contact-message'
    )
    expect(baseElement.getElementsByClassName('submit-button').length).toEqual(
      1
    )
    expect(baseElement.getElementsByClassName('message-modal').length).toEqual(
      0
    )
  })

  it('renders after submitting feedbacks', async () => {
    const sendMessageResponse = {
      email: 'test@email.com',
      message: 'Test message',
    }
    const saveFeedbackStub = sinon.stub()

    const container = render(
      <ContactPage
        saveFeedback={saveFeedbackStub}
        sendMessageResponse={sendMessageResponse}
      />
    )

    const { baseElement, queryByText, getByPlaceholderText } = container

    const emailInput = getByPlaceholderText('Your email')
    fireEvent.change(emailInput, {
      target: { value: sendMessageResponse.email },
    })

    const messageInput = getByPlaceholderText('Write us a message')
    fireEvent.change(messageInput, {
      target: { value: sendMessageResponse.message },
    })

    const submitButton = baseElement.getElementsByClassName('submit-button')[0]
    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(saveFeedbackStub).toHaveBeenCalledWith({
      email: 'test@email.com',
      message: 'Test message',
    })

    expect(queryByText('Success!').className).toEqual('success-title')
  })

  it('displays warning message if email and message are blank', async () => {
    const sendMessageResponse = {}
    const saveFeedbackStub = sinon.stub()

    const container = render(
      <ContactPage
        saveFeedback={saveFeedbackStub}
        sendMessageResponse={sendMessageResponse}
      />
    )

    const { baseElement, queryByText } = container

    const submitButton = baseElement.getElementsByClassName('submit-button')[0]
    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(
      baseElement.getElementsByClassName('warning-message').length
    ).toEqual(2)
    expect(baseElement.getElementsByClassName('caution-icon').length).toEqual(2)

    expect(queryByText('Enter a valid email').className).toEqual(
      'caution-message'
    )
    expect(queryByText('Message cannot be blank').className).toEqual(
      'caution-message'
    )

    expect(queryByText('Your message has been submitted.')).toBeFalsy()
  })

  it('displays warning message if email is blank', async () => {
    const sendMessageResponse = {
      message: 'Test message',
    }
    const saveFeedbackStub = sinon.stub()

    const container = render(
      <ContactPage
        saveFeedback={saveFeedbackStub}
        sendMessageResponse={sendMessageResponse}
      />
    )

    const { baseElement, queryByText, getByPlaceholderText } = container

    const messageInput = getByPlaceholderText('Write us a message')
    fireEvent.change(messageInput, {
      target: { value: sendMessageResponse.message },
    })

    const submitButton = baseElement.getElementsByClassName('submit-button')[0]
    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(
      baseElement.getElementsByClassName('warning-message').length
    ).toEqual(1)
    expect(baseElement.getElementsByClassName('caution-icon').length).toEqual(1)

    expect(queryByText('Enter a valid email').className).toEqual(
      'caution-message'
    )

    expect(queryByText('Your message has been submitted.')).toBeFalsy()
  })

  it('displays warning message if message is blank', async () => {
    const sendMessageResponse = {
      email: 'test@email.com',
    }
    const saveFeedbackStub = sinon.stub()

    const container = render(
      <ContactPage
        saveFeedback={saveFeedbackStub}
        sendMessageResponse={sendMessageResponse}
      />
    )

    const { baseElement, queryByText, getByPlaceholderText } = container

    const emailInput = getByPlaceholderText('Your email')
    fireEvent.change(emailInput, {
      target: { value: sendMessageResponse.email },
    })

    const submitButton = baseElement.getElementsByClassName('submit-button')[0]
    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(
      baseElement.getElementsByClassName('warning-message').length
    ).toEqual(1)
    expect(baseElement.getElementsByClassName('caution-icon').length).toEqual(1)

    expect(queryByText('Message cannot be blank').className).toEqual(
      'caution-message'
    )

    expect(queryByText('Your message has been submitted.')).toBeFalsy()
  })
})
