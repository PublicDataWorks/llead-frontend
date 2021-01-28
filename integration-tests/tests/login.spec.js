import { appConfigData } from '../data/common-data'

describe('Login Page', () => {
  it('should redirect to FrontPage when loging in successfully', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'http://localhost:8000/api/token/',
      },
      {
        access: 'accessToken',
        refresh: 'refreshToken',
      }
    )
    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:8000/api/app-config',
      },
      appConfigData
    )

    cy.visit('/login')

    cy.get('input[name="email"]').type('username@mail.com')
    cy.get('input[name="password"]').type('password')
    cy.get('.btn').click()

    cy.contains(
      'We are building a database of Louisiana police officers, departments, and documents.'
    )
  })

  it('should show error when loging in unsuccessfully', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'http://localhost:8000/api/token/',
      },
      {
        statusCode: 401,
      }
    )

    cy.clearLocalStorage()

    cy.visit('/login')

    cy.get('input[name="email"]').type('username@mail.com')
    cy.get('input[name="password"]').type('password')
    cy.get('.btn').click()

    cy.contains('Password/email combination aren’t recognized')
  })
})
