import React, { useState } from 'react'
import Modal from 'react-modal'
import { render, fireEvent } from '@testing-library/react'
import sinon from 'sinon'

import SuccessMessage from 'components/contact-page/success-message'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

describe('Success Message', () => {
  beforeEach(() => {
    Modal.setAppElement(document.createElement('div'))
    useState.mockImplementation(jest.requireActual('react').useState)
  })

  it('renders correctly', () => {
    const messageDetail = 'test message'

    const container = render(
      <SuccessMessage messageDetail={messageDetail}></SuccessMessage>
    )

    const { baseElement, queryByText } = container

    expect(baseElement.getElementsByClassName('message-modal').length).toEqual(
      1
    )
    expect(baseElement.getElementsByClassName('success-icon').length).toEqual(1)
    expect(queryByText('Success!').className).toEqual('success-title')
    expect(queryByText('test message').className).toEqual('success-message')
    expect(queryByText('OK').classList).toContain('close-message-button')
  })

  it('hides modal when close', async () => {
    const setIsOpenStub = sinon.stub()
    useState.mockImplementation(() => [true, setIsOpenStub])
    const messageDetail = 'test message'

    const container = render(
      <SuccessMessage messageDetail={messageDetail}></SuccessMessage>
    )

    const { baseElement } = container

    const okBtn = baseElement.getElementsByClassName('close-message-button')[0]

    fireEvent.click(okBtn)

    expect(setIsOpenStub).toHaveBeenCalledWith(false)
  })
})
