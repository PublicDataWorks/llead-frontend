import { departmentSelector } from 'selectors/department-page'

describe('#departmentSelector', () => {
  describe('has data', () => {
    it('returns department data', () => {
      const departmentData = {
        id: 1,
        name: 'Department data',
        wrglFiles: [
          {
            id: 2,
            name: 'Com Madison Village pd',
            slug: 'com-madisonville-pd',
            extraField: 'field',
          },
        ],
      }
      const state = {
        departmentPage: {
          department: departmentData,
        },
      }

      const department = departmentSelector(state)

      expect(department).toStrictEqual({
        ...departmentData,
        wrglFiles: [
          {
            id: 2,
            name: 'Com Madison Village pd',
            slug: 'com-madisonville-pd',
          },
        ],
      })
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const department = departmentSelector({})

      expect(department).toStrictEqual({ wrglFiles: [] })
    })
  })
})
