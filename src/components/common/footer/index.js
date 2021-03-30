import React, { forwardRef } from 'react'

import './footer.scss'

const Footer = forwardRef((_, ref) => {
  return (
    <footer className='footer' ref={ref}>
      <b>Innocence Project New Orleans</b> in collaboration with&nbsp;
      <b>Public Data Works</b>
    </footer>
  )
})

Footer.displayName = 'Footer'

export default Footer
