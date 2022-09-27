import {
  getAccessToken,
  getDocumentHead,
  getRefreshToken,
  getUserInfo,
  isAppConfigFetchedSelector,
  isLoggedInSelector,
  getIsAdmin,
} from 'selectors/common'

describe('#getAccessToken', () => {
  it('returns access token', () => {
    const token = {
      access: 'accessToken',
    }
    const state = {
      token,
    }

    const accessToken = getAccessToken(state)

    expect(accessToken).toEqual('accessToken')
  })
})

describe('#getRefreshToken', () => {
  it('returns refresh access token', () => {
    const token = {
      refresh: 'refreshToken',
    }
    const state = {
      token,
    }

    const refreshToken = getRefreshToken(state)

    expect(refreshToken).toEqual('refreshToken')
  })
})

describe('#isLoggedInSelector', () => {
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

describe('#isAppConfigFetchedSelector', () => {
  describe('app config is fetched', () => {
    it('returns true', () => {
      const appConfig = {
        cms: {},
      }
      const state = {
        appConfig,
      }

      const isAppConfigFetched = isAppConfigFetchedSelector(state)

      expect(isAppConfigFetched).toBe(true)
    })
  })

  describe('app config is not fetched', () => {
    it('returns false', () => {
      const isAppConfigFetched = isAppConfigFetchedSelector({})

      expect(isAppConfigFetched).toBe(false)
    })
  })
})

describe('#getUserInfo', () => {
  it('returns user info', () => {
    const userInfoData = {
      email: 'user@mail.com',
    }
    const state = {
      userInfo: userInfoData,
    }

    const userInfo = getUserInfo(state)

    expect(userInfo).toEqual(userInfoData)
  })

  it('returns empty object if userInfo is null', () => {
    const userInfo = getUserInfo({})

    expect(userInfo).toEqual({})
  })
})

describe('#getDocumentHead', () => {
  it('returns document head', () => {
    const documentHeadData = {
      title: 'page title',
    }
    const state = {
      documentHead: documentHeadData,
    }

    const documentHead = getDocumentHead(state)

    expect(documentHead).toEqual(documentHeadData)
  })
})

describe('#getAdmin', () => {
  it('returns isAdmin', () => {
    const userInfoData = {
      email: 'user@mail.com',
      isAdmin: true,
    }
    const state = {
      userInfo: userInfoData,
    }

    const isAdmin = getIsAdmin(state)

    expect(isAdmin).toEqual(true)
  })

  it('returns default false', () => {
    const isAdmin = getIsAdmin()

    expect(isAdmin).toEqual(false)
  })
})
