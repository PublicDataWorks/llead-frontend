import { getResponse } from 'selectors/contact-page'

describe('#getResponse', () => {
  it('returns message submission response ', () => {
    const state = {
      contactPage: {
        sendMessageResponse: {
          email: 'test@email.com',
          message: 'Test message',
        },
      },
    }
    const response = getResponse(state)

    expect(response).toStrictEqual({
      email: 'test@email.com',
      message: 'Test message',
    })
  })

  it('returns empty data if get no data', () => {
    const response = getResponse({})

    expect(response).toStrictEqual({})
  })
})
