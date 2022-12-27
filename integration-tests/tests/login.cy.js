import { appConfigData } from '../data/common-data'

describe('Login Page', () => {
  it('should redirect to FrontPage when loging in successfully', () => {
    cy.interceptExact(
      {
        method: 'POST',
        url: 'http://localhost:8000/api/token/',
      },
      {
        access: 'accessToken',
        refresh: 'refreshToken',
      }
    )
    cy.interceptExact(
      {
        method: 'GET',
        url: 'http://localhost:8000/api/app-config/',
      },
      appConfigData
    )
    cy.clearLocalStorage()

    cy.visit('/login')

    cy.get('input[name="email"]').type('username@mail.com')
    cy.get('input[name="password"]').type('password')
    cy.get('.btn').click()

    cy.waitUntil(() => cy.location('pathname').should('eq', '/'))
  })

  it('should show error when loging in unsuccessfully', () => {
    cy.interceptExact(
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

  it('toggles show hide password', () => {
    cy.visit('/login')

    cy.get('input[name="password"]').type('password')
    cy.get('input[name="password"]').should('have.attr', 'type', 'password')

    cy.get('.eye-icon').click()
    cy.get('input[name="password"]').should('have.attr', 'type', 'text')
  })
})
