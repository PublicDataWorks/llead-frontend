describe('Contact Page', () => {
  it('renders successfully', () => {
    cy.visit('/contact/')

    cy.get('.contact-page')
      .find('.contact-title')
      .should('text', 'Get in touch')

    cy.get('.contact-email')
      .invoke('attr', 'placeholder')
      .should('contain', 'Your email')
    cy.get('.contact-message')
      .invoke('attr', 'placeholder')
      .should('contain', 'Write us a message')
    cy.get('.submit-button').invoke('attr', 'value').should('contain', 'Send')
  })

  it('show errors when send with blank email and message', () => {
    cy.visit('/contact/')

    cy.get('.submit-button').click()

    cy.get('.warning-message').should('length', 2)
    cy.get('.warning-message')
      .eq(0)
      .find('.caution-message')
      .should('text', 'Enter a valid email')
    cy.get('.warning-message')
      .eq(1)
      .find('.caution-message')
      .should('text', 'Message cannot be blank')
  })

  it('shows success message', () => {
    cy.visit('/contact/')

    cy.get('.contact-email').type('test@mail.com')
    cy.get('.contact-message').type('test message')
    cy.get('.submit-button').click()

    cy.get('.message-modal').find('.success-title').should('text', 'Success!')
    cy.get('.message-modal')
      .find('.success-message')
      .should('text', 'Your message has been sent')
    cy.get('.message-modal').find('.close-message-button').should('text', 'OK')
  })
})
