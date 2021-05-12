import { complaintItemUrl, uofItemUrl } from 'utils/urls'
import config from 'config'

const { host } = config

describe('#complaintItemUrl', () => {
  it('returns complaint item url', () => {
    const url = complaintItemUrl(1, 1202)

    expect(url).toEqual(`${host}/officers/1/?complaint_id=1202`)
  })
})

describe('#uofItemUrl', () => {
  it('returns uof item url', () => {
    const url = uofItemUrl(1, 12)

    expect(url).toEqual(`${host}/officers/1/?uof_id=12`)
  })
})
