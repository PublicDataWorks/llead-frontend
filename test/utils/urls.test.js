import { complaintItemUrl } from 'utils/urls'
import config from 'config'

const { host } = config

describe('#complaintItemUrl', () => {
  it('returns complaint item url', () => {
    const url = complaintItemUrl(1, 1202)

    expect(url).toEqual(`${host}/officers/1/?complaint_id=1202`)
  })
})
