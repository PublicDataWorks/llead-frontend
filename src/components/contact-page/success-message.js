import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

import './success-message.scss'
import Button from 'components/common/buttons/button'

const SuccessMessage = (props) => {
  const { messageDetail } = props

  const [isOpen, setIsOpen] = useState(true)

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <Modal
      closeTimeoutMS={150}
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      className='message-modal'
      overlayClassName='message-modal-backdrop'
    >
      <div className='success-icon' />
      <div className='success-title'>Success!</div>
      <div className='success-message'>{messageDetail}</div>
      <Button className='close-message-button' onClick={handleCloseModal}>
        OK
      </Button>
    </Modal>
  )
}

SuccessMessage.propTypes = {
  messageDetail: PropTypes.string,
}

SuccessMessage.defaultProps = {
  messageDetail: '',
}

export default SuccessMessage
