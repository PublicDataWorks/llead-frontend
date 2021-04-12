import 'cypress-wait-until'
import escapeRegExp from 'lodash/escapeRegExp'

Cypress.Commands.add('setReduxLocalStorage', (data) => {
  const reduxLocalStorage = JSON.parse(window.localStorage.getItem('redux'))
  window.localStorage.setItem(
    'redux',
    JSON.stringify({ ...reduxLocalStorage, ...data })
  )
})

Cypress.Commands.add('login', () => {
  // This is a jwt token generated for testing only which expired at year 2121
  const accessToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQzODc0NzQ3LCJqdGkiOiJjZDQ3NTdlODNjNjI0YWNhOWI4Njk3OWNhMzJmMTQyOCIsInVzZXJfaWQiOjF9.Cj841bRE0HcaRPySj26aJ9ianvKEGpRwOXgCbWn8oAo'
  cy.setReduxLocalStorage({
    token: { access: accessToken },
  })
})

Cypress.Commands.add('interceptExact', (request, response) => {
  const url = new RegExp(
    `^${escapeRegExp(request.url)}${request.noQuery ? '' : '(\\?.*)?'}$`
  )
  delete request.noQuery
  cy.intercept(
    {
      ...request,
      url,
    },
    response
  )
})

beforeEach(() => {
  cy.clearLocalStorage()
})
