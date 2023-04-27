import {
  appealItemUrl,
  bradyItemUrl,
  complaintItemUrl,
  postCertificationItemUrl,
  uofItemUrl,
} from 'utils/urls'
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

describe('#appealItemUrl', () => {
  it('returns appeal item url', () => {
    const url = appealItemUrl(1, 12)

    expect(url).toEqual(`${host}/officers/1/?appeal_id=12`)
  })
})

describe('#bradyItemUrl', () => {
  it('returns brady item url', () => {
    const url = bradyItemUrl(1, 12)

    expect(url).toEqual(`${host}/officers/1/?brady_id=12`)
  })
})

describe('#postCertificationItemUrl', () => {
  it('returns post certification item url', () => {
    const url = postCertificationItemUrl(1, 12)

    expect(url).toEqual(`${host}/officers/1/?event_id=12`)
  })
})
