import { createSelector } from 'reselect'
import get from 'lodash/get'
import map from 'lodash/map'
import countBy from 'lodash/countBy'
import forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty'

export const getDepartmentNodes = (state) =>
  get(state, 'frontPage.migratoryData.nodes', [])

export const getDepartmentGraphs = (state) =>
  get(state, 'frontPage.migratoryData.graphs', [])

export const getDepartmentCoordinates = createSelector(
  getDepartmentNodes,
  (departmentNodes) => {
    const coordinates = map(departmentNodes, (node) => {
      return get(node, 'location')
    })

    return coordinates
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
