import { createSelector } from 'reselect'
import moment from 'moment'
import capitalize from 'lodash/capitalize'
import compact from 'lodash/compact'
import filter from 'lodash/filter'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import indexOf from 'lodash/indexOf'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import orderBy from 'lodash/orderBy'
import pick from 'lodash/pick'
import sum from 'lodash/sum'
import trim from 'lodash/trim'
import upperFirst from 'lodash/upperFirst'
import values from 'lodash/values'

import {
  formatDate,
  formatDataPeriods,
  formatTimelineDate,
} from 'utils/formatter'
import { officerFormatter, documentFormatter } from 'selectors/common'
import {
  TIMELINE_FILTERS,
  TIMELINE_KINDS,
  TIMELINE_KIND_ORDERS,
} from 'constants/common'

const officerDocumentFormatter = (document) => {
  const documentAttributes = [
    'id',
    'title',
    'documentType',
    'url',
    'textContent',
  ]
  const rawDepartments = get(document, 'departments')
  const departments = map(rawDepartments, (department) =>
    pick(department, ['id', 'name'])
  )

  return {
    ...pick(document, documentAttributes),
    incidentDate: formatDate(document.incidentDate),
    departments,
    recentData: documentFormatter(document),
  }
}

const baseTimelineItemFormatter = (item) => pick(item, ['kind'])

const complaintTimelineItemFormatter = (item) => {
  const attributes = ['kind', 'trackingNumber', 'id']

  const capitalizeAttributes = [
    'ruleViolation',
    'paragraphViolation',
    'disposition',
    'action',
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

const TIMELINE_ITEMS_MAPPINGS = {
  [TIMELINE_KINDS.JOINED]: baseTimelineItemFormatter,
  [TIMELINE_KINDS.LEFT]: baseTimelineItemFormatter,
  [TIMELINE_KINDS.COMPLAINT]: complaintTimelineItemFormatter,
  [TIMELINE_KINDS.DOCUMENT]: documentTimelineItemFormatter,
  [TIMELINE_KINDS.SALARY_CHANGE]: salaryChangeTimelineItemFormatter,
  [TIMELINE_KINDS.RANK_CHANGE]: rankChangeTimelineItemFormatter,
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

const formatOfficerDescription = (officer) => {
  const birthYear = get(officer, 'birthYear')

  const age = birthYear
    ? `${moment().diff(moment(birthYear, 'YYYY'), 'years')}-year-old`
    : ''
  return trim(
    join([age, get(officer, 'gender', ''), get(officer, 'race', '')], ' ')
  )
}

const officerDetailsFormatter = (officer) => {
  if (isEmpty(officer)) {
    return {}
  }

  const officerDepartmentAttributes = ['id', 'name']
  const officerAttributes = [
    'id',
    'name',
    'badges',
    'documentsCount',
    'complaintsCount',
  ]

  const rawAnnualSalary = get(officer, 'annualSalary')
  const annualSalary = rawAnnualSalary ? `$${rawAnnualSalary}/year` : ''

  const allDataPeriods = mapValues(
    pick(officer, [
      'documentsDataPeriod',
      'complaintsDataPeriod',
      'dataPeriod',
    ]),
    (value) => formatDataPeriods(value)
  )

  const officerDepartment = get(officer, 'department')

  return {
    ...pick(officer, officerAttributes),
    description: formatOfficerDescription(officer),
    annualSalary,
    ...allDataPeriods,
    department: pick(officerDepartment, officerDepartmentAttributes),
  }
}

const getOfficer = (state) => get(state.officerPage, 'officer', {})
const getDocuments = (state) => get(state.officerPage, 'documents', {})
const getTimeline = (state) => get(state.officerPage, 'timeline', [])

export const getTimelineFilterGroupKey = (state) =>
  get(state.officerPage, 'filterGroupKey', [])

export const getIsOfficerRequesting = (state) =>
  get(state, 'officerPage.isOfficerRequesting')

export const officerSelector = createSelector(
  getOfficer,
  officerDetailsFormatter
)

export const officerRecentDataSelector = createSelector(
  getOfficer,
  officerFormatter
)

export const documentsSelector = (state) => {
  const rawDocuments = getDocuments(state)

  return map(rawDocuments, officerDocumentFormatter)
}

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

export const hasTimelineSelector = createSelector(
  getTimeline,
  (timeline) => !isEmpty(timeline)
)
