import { getDepartment } from 'selectors/department-page'

describe('#getDepartment', () => {
  describe('has data', () => {
    it('returns department data', () => {
      const departmentData = {
        id: 1,
        name: 'Department data',
      }
      const state = {
        departmentPage: {
          department: departmentData,
        },
      }

      const department = getDepartment(state)

      expect(department).toStrictEqual(departmentData)
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const department = getDepartment({})

      expect(department).toStrictEqual({})
    })
  })
})
