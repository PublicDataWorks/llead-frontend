import { createSelector } from 'reselect'
import capitalize from 'lodash/capitalize'
import compact from 'lodash/compact'
import filter from 'lodash/filter'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import indexOf from 'lodash/indexOf'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import orderBy from 'lodash/orderBy'
import pick from 'lodash/pick'
import sum from 'lodash/sum'
import upperFirst from 'lodash/upperFirst'
import values from 'lodash/values'
import some from 'lodash/some'

import { formatTimelineDate } from 'utils/formatter'
import { documentFormatter } from 'selectors/common'
import {
  TIMELINE_FILTERS,
  TIMELINE_KINDS,
  TIMELINE_KIND_ORDERS,
} from 'constants/common'

const baseTimelineItemFormatter = (item) => pick(item, ['kind'])

const complaintTimelineItemFormatter = (item) => {
  const attributes = ['kind', 'trackingNumber', 'id']

  const capitalizeAttributes = [
    'ruleViolation',
    'paragraphViolation',
    'disposition',
    'action',
    'ruleCode',
    'paragraphCode',
    'allegationFinding',
    'allegationClass',
  ]

  return {
    ...pick(item, attributes),
    ...mapValues(pick(item, capitalizeAttributes), capitalize),
  }
}

const documentTimelineItemFormatter = (document) => {
  const formattedDocument = documentFormatter(document)
  return {
    ...baseTimelineItemFormatter(document),
    ...formattedDocument,
    recentData: formattedDocument,
  }
}

const salaryChangeTimelineItemFormatter = (salaryChange) => {
  const attributes = ['kind', 'annualSalary']
  return pick(salaryChange, attributes)
}

const rankChangeTimelineItemFormatter = (rankChange) => {
  return {
    kind: rankChange.kind,
    rankDesc: upperFirst(rankChange.rankDesc),
  }
}

const unitChangeTimelineItemFormatter = (unitChange) => {
  const unitChangeAttributes = ['kind', 'departmentCode', 'prevDepartmentCode']

  const unitChangeUpperFirstAttributes = [
    'departmentDesc',
    'prevDepartmentDesc',
  ]

  return {
    ...pick(unitChange, unitChangeAttributes),
    ...mapValues(
      pick(unitChange, unitChangeUpperFirstAttributes),
      (value) => value && upperFirst(value)
    ),
  }
}

const TIMELINE_ITEMS_MAPPINGS = {
  [TIMELINE_KINDS.JOINED]: baseTimelineItemFormatter,
  [TIMELINE_KINDS.LEFT]: baseTimelineItemFormatter,
  [TIMELINE_KINDS.COMPLAINT]: complaintTimelineItemFormatter,
  [TIMELINE_KINDS.DOCUMENT]: documentTimelineItemFormatter,
  [TIMELINE_KINDS.SALARY_CHANGE]: salaryChangeTimelineItemFormatter,
  [TIMELINE_KINDS.RANK_CHANGE]: rankChangeTimelineItemFormatter,
  [TIMELINE_KINDS.UNIT_CHANGE]: unitChangeTimelineItemFormatter,
}

const timelineItemsFormatter = (items) => {
  const formattedItems = map(items, (item) => {
    const formatter = get(TIMELINE_ITEMS_MAPPINGS, item.kind, null)
    return formatter && formatter(item)
  })

  return orderBy(
    compact(formattedItems),
    (item) => TIMELINE_KIND_ORDERS[item.kind],
    'asc'
  )
}

const getTimeline = (state) => get(state.officerPage, 'timeline', [])

export const getTimelineFilterGroupKey = (state) =>
  get(state.officerPage, 'filterGroupKey', [])

export const timelineSelector = createSelector(
  getTimeline,
  getTimelineFilterGroupKey,
  (timeline, groupKey) => {
    const filterGroupKinds = get(TIMELINE_FILTERS, `${groupKey}.kinds`)

    const filteredTimeline = isEmpty(filterGroupKinds)
      ? timeline
      : filter(
          timeline,
          (timelineItem) => indexOf(filterGroupKinds, timelineItem.kind) !== -1
        )

    const groups = groupBy(
      filteredTimeline,
      (item) => item.date || item.year || ''
    )

    const formattedGroups = map(groups, (items, groupName) => ({
      groupName,
      isDateEvent: !isEmpty(items[0].date),
      items: timelineItemsFormatter(items),
    }))

    const orderedGroup = orderBy(
      formattedGroups,
      (item) =>
        item.groupName ? `${item.groupName}${item.isDateEvent || 'z'}` : '',
      'desc'
    )

    return map(orderedGroup, (group) => ({
      ...group,
      groupName: formatTimelineDate(group.groupName),
    }))
  }
)

export const timelineFilterGroupsSelector = createSelector(
  getTimeline,
  (timeline) => {
    const filterGroupKeyCounts = mapValues(groupBy(timeline, 'kind'), 'length')

    const groups = filter(
      map(TIMELINE_FILTERS, ({ kinds, title }, filterGroupKey) => ({
        filterGroupKey,
        title,
        count: sum(values(pick(filterGroupKeyCounts, kinds))),
      })),
      (timelineGroup) => timelineGroup.count > 0
    )

    return isEmpty(groups)
      ? []
      : [
          {
            filterGroupKey: '',
            title: 'All',
          },
          ...groups,
        ]
  }
)

export const hasEventDetailsSelector = createSelector(getTimeline, (timeline) =>
  some(timeline, { kind: TIMELINE_KINDS.COMPLAINT })
)
