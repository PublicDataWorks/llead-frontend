import 'cypress-wait-until'

Cypress.Commands.add('login', () => {
  // This is a jwt token generated for testing only which expired at year 2121
  const accessToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQzODc0NzQ3LCJqdGkiOiJjZDQ3NTdlODNjNjI0YWNhOWI4Njk3OWNhMzJmMTQyOCIsInVzZXJfaWQiOjF9.Cj841bRE0HcaRPySj26aJ9ianvKEGpRwOXgCbWn8oAo'

  window.localStorage.setItem(
    'redux',
    JSON.stringify({
      token: { access: accessToken },
    })
  )
})
