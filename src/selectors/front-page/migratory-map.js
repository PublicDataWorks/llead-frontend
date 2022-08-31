import { createSelector } from 'reselect'
import get from 'lodash/get'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty'
import pick from 'lodash/pick'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import { formatDate } from 'utils/formatter'

const getDepartmentNodes = (state) =>
  get(state, 'frontPage.migratoryData.nodes', {})

const getDepartmentGraphs = (state) =>
  get(state, 'frontPage.migratoryData.graphs', [])

const getMapCurrentIndex = (state) => get(state, 'frontPage.mapCurrentIndex', 0)

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

export const migratoryGraphsSelector = createSelector(
  getDepartmentGraphs,
  (departmentGraphs) => {
    let lines = {}

    forEach(departmentGraphs, (obj) => {
      if (`${obj.startNode}-${obj.endNode}` in lines) {
        lines[`${obj.startNode}-${obj.endNode}`]++
      } else {
        lines[`${obj.startNode}-${obj.endNode}`] = 1
      }
      obj.count = lines[`${obj.startNode}-${obj.endNode}`]
    })

    return departmentGraphs
  }
)

export const pulsingPointsSelector = createSelector(
  getDepartmentGraphs,
  (departmentGraphs) => {
    let pulses = []

    forEach(departmentGraphs, (obj) => {
      if (!isEmpty(pulses)) {
        const lastPoints = pulses[pulses.length - 1]
        const newLastPoints = {
          ...lastPoints,
          [obj.endNode]: {
            count: get(lastPoints, `${obj.endNode}.count`, 0) + 1,
            location: obj.endLocation,
          },
        }
        pulses.push(newLastPoints)
      } else {
        pulses.push({
          [obj.endNode]: {
            count: 1,
            location: obj.endLocation,
          },
        })
      }
    })

    return pulses
  }
)

export const migrationDetailsSelector = createSelector(
  getDepartmentNodes,
  getDepartmentGraphs,
  getMapCurrentIndex,
  (departmentNodes, departmentGraphs, currentIndex) => {
    const attributes = [
      'startDepartment',
      'endDepartment',
      'officerName',
      'date',
      'leftReason',
    ]

    forEach(departmentGraphs, (obj) => {
      obj.startDepartment = departmentNodes[camelCase(obj.startNode)].name
      obj.endDepartment = departmentNodes[camelCase(obj.endNode)].name
      obj.date = formatDate(obj.date)
      obj.leftReason = upperFirst(obj.leftReason)
    })

    return pick(get(departmentGraphs, currentIndex), attributes)
  }
)
