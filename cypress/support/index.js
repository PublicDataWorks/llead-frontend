import 'cypress-wait-until'

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

Cypress.Commands.add('resetDatabase', () => {
  cy.exec('docker exec -i db-test psql -U ipno ipno < data.pgsql').then(
    (res) => {
      cy.log(res)
    }
  )
})

Cypress.Commands.add('rebuildIndex', () => {
  cy.exec('docker exec -i web-test ipno/manage.py search_index --rebuild -f', {
    timeout: 300000,
  }).then((res) => {
    cy.log(res)
  })
})

Cypress.Commands.add('clearCache', () => {
  cy.exec(
    'docker exec -i web-test ipno/manage.py shell --command="from django.core.cache import cache;cache.clear()"'
  ).then((res) => {
    cy.log(res)
  })
})

beforeEach(() => {
  cy.clearLocalStorage()
})
