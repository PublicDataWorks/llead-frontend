import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import cx from 'classnames'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'

import './contact-page.scss'
import CautionSign from 'assets/icons/caution-sign.svg'

const ContactPage = (props) => {
  const { saveFeedback, sendMessageResponse } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSumit = (items) => {
    saveFeedback(items)
    reset()
  }

  return (
    <div className='contact-page'>
      <form className='contact-form' onSubmit={handleSubmit(onSumit)}>
        <label className='contact-title'>Get in touch</label>
        <input
          className={cx('contact-email', { warning: errors.email })}
          type='text'
          placeholder='Your email'
          name='email'
          ref={register({ required: true })}
        />
        {errors.email && (
          <div className='warning-message'>
            <img className='caution-icon' src={CautionSign} />
            <div className='caution-message'>Enter a valid email</div>
          </div>
        )}
        <textarea
          className={cx('contact-message', { warning: errors.message })}
          rows='12'
          placeholder='Write us a message'
          name='message'
          ref={register({ required: true })}
        />
        {errors.message && (
          <div className='warning-message'>
            <img className='caution-icon' src={CautionSign} />
            <div className='caution-message'>Message cannot be blank</div>
          </div>
        )}
        <div className='contact-submit'>
          <input className='submit-button' type='submit' value='Send' />
          {!isEmpty(sendMessageResponse) && (
            <div>{sendMessageResponse.detail}</div>
          )}
        </div>
      </form>
    </div>
  )
}

ContactPage.propTypes = {
  sendMessageResponse: PropTypes.object,
  saveFeedback: PropTypes.func,
}

ContactPage.defaultProps = {
  sendMessageResponse: {},
  saveFeedback: noop,
}

export default ContactPage
