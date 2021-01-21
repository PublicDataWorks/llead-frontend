import { isLoggedInSelector } from 'selectors/common'

describe('#isLoggedIn', () => {
  describe('has data', () => {
    it('returns true', () => {
      const token = {
        access: 'accessToken',
      }
      const state = {
        token,
      }

      const isUserLoggedIn = isLoggedInSelector(state)

      expect(isUserLoggedIn).toBe(true)
    })
  })

  describe('does not have data', () => {
    it('returns false', () => {
      const isUserLoggedIn = isLoggedInSelector({})

      expect(isUserLoggedIn).toBe(false)
    })
  })
})
