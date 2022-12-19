import { createSelector } from 'reselect'
import get from 'lodash/get'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import pick from 'lodash/pick'
import values from 'lodash/values'
import mapValues from 'lodash/mapValues'
import sortBy from 'lodash/sortBy'
import groupBy from 'lodash/groupBy'
import orderBy from 'lodash/orderBy'
import sumBy from 'lodash/sumBy'
import slice from 'lodash/slice'
import camelCase from 'lodash/camelCase'

const getDepartmentNodes = (state) =>
  get(state, 'departmentPage.departmentMigratoryData.nodes', {})

const getDepartmentGraphs = (state) =>
  get(state, 'departmentPage.departmentMigratoryData.graphs', [])

export const departmentCoordinatesSelector = createSelector(
  getDepartmentNodes,
  (departmentNodes) => {
    const departments = map(departmentNodes, (node) => {
      return {
        name: get(node, 'name'),
        coordinates: get(node, 'location'),
      }
    })
    return departments
  }
)

export const departmentMigratoryGraphsSelector = createSelector(
  getDepartmentGraphs,
  (departmentGraphs) => {
    let graphs = {}

    forEach(departmentGraphs, (obj) => {
      const objKey = `${obj.startNode}-${obj.endNode}-${obj.isLeft}`
      if (objKey in graphs) {
        graphs[objKey].count++
      } else {
        graphs[objKey] = {
          count: 1,
          ...pick(obj, [
            'startNode',
            'startLocation',
            'isLeft',
            'endNode',
            'endLocation',
          ]),
        }
      }
    })

    return values(graphs)
  }
)

export const departmentMigratoryInfoSelector = createSelector(
  getDepartmentNodes,
  getDepartmentGraphs,
  departmentMigratoryGraphsSelector,
  (departmentNodes, departmentGraphs, departmentMigratoryGraphs) => {
    const years = sortBy(map(departmentGraphs, 'year'))

    const groupedMigratory = groupBy(departmentMigratoryGraphs, 'isLeft')

    const countedMigratory = mapValues(groupedMigratory, (o) =>
      sumBy(o, 'count')
    )

    const sortedMigratory = mapValues(groupedMigratory, (group) =>
      slice(orderBy(group, 'count', 'desc'), 0, 5)
    )

    return {
      years:
        years.length > 1
          ? `${years[0]} - ${years[years.length - 1]}`
          : `${years[0]}`,
      left: {
        count: countedMigratory.true,
        departments: map(sortedMigratory.true, (department) => {
          return {
            ...pick(department, ['count']),
            name: departmentNodes[camelCase(department.endNode)].name,
          }
        }),
      },
      join: {
        count: countedMigratory.false,
        departments: map(sortedMigratory.false, (department) => {
          return {
            ...pick(department, ['count']),
            name: departmentNodes[camelCase(department.startNode)].name,
          }
        }),
      },
    }
  }
)
