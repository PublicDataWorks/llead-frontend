import { isLoggedIn } from 'selectors/common'

describe('#isLoggedIn', () => {
  describe('has data', () => {
    it('returns true', () => {
      const user = {
        accessToken: 'accessToken',
      }
      const state = {
        user,
      }

      const isUserLoggedIn = isLoggedIn(state)

      expect(isUserLoggedIn).toBe(true)
    })
  })

  describe('does not have data', () => {
    it('returns false', () => {
      const isUserLoggedIn = isLoggedIn({})

      expect(isUserLoggedIn).toBe(false)
    })
  })
})
