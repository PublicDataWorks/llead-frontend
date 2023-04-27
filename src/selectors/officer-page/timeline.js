import { createSelector } from 'reselect'
import capitalize from 'lodash/capitalize'
import compact from 'lodash/compact'
import filter from 'lodash/filter'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import indexOf from 'lodash/indexOf'
import isEmpty from 'lodash/isEmpty'
import lowerCase from 'lodash/lowerCase'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import orderBy from 'lodash/orderBy'
import pick from 'lodash/pick'
import some from 'lodash/some'
import sum from 'lodash/sum'
import upperFirst from 'lodash/upperFirst'
import values from 'lodash/values'
import forEach from 'lodash/forEach'
import join from 'lodash/join'

import { formatTimelineDate } from 'utils/formatter'
import { documentFormatter, newsArticleFormatter } from 'selectors/common'
import { formatDataPeriods, formatSalary, formatDate } from 'utils/formatter'
import {
  TIMELINE_FILTERS,
  TIMELINE_KINDS,
  TIMELINE_KIND_ORDERS,
} from 'constants/common'

const baseTimelineItemFormatter = (item) => pick(item, ['kind', 'department'])

const joinedTimelineItemFormatter = (item) => {
  const attributes = [
    'kind',
    'department',
    'leftDepartment',
    'leftDate',
    'leftReason',
  ]

  const capitalizeAttributes = ['leftReason']

  return {
    ...pick(item, attributes),
    ...mapValues(pick(item, capitalizeAttributes), capitalize),
  }
}

const complaintTimelineItemFormatter = (item) => {
  const attributes = [
    'kind',
    'trackingId',
    'id',
    'allegation',
    'allegationDesc',
    'associatedOfficers',
  ]

  const capitalizeAttributes = ['disposition', 'action']

  return {
    ...pick(item, attributes),
    ...mapValues(pick(item, capitalizeAttributes), capitalize),
  }
}

const useOfForceTimelineItemFormatter = (item) => {
  const attributes = ['kind', 'trackingId', 'id', 'citizenInformation']

  const upperFirstAttributes = [
    'useOfForceDescription',
    'useOfForceReason',
    'disposition',
    'serviceType',
  ]

  const detailAttributes = [
    'citizenArrested',
    'citizenInjured',
    'citizenHospitalized',
    'officerInjured',
  ]

  const details = map(
    filter(detailAttributes, (attribute) => get(item, attribute) === 'yes'),
    lowerCase
  )

  return {
    ...pick(item, attributes),
    ...mapValues(pick(item, upperFirstAttributes), upperFirst),
    details,
  }
}

const appealTimelineItemFormatter = (item) => {
  const attributes = [
    'id',
    'kind',
    'year',
    'chargingSupervisor',
    'actionAppealed',
    'motions',
    'department',
  ]

  return {
    ...pick(item, attributes),
    appealDisposition: capitalize(item.appealDisposition),
    date: formatDate(item.date),
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

const newsArticleTimelineItemFormatter = (news_article) => {
  const formattedNewsArticle = newsArticleFormatter(news_article)
  return {
    ...baseTimelineItemFormatter(news_article),
    ...formattedNewsArticle,
    recentData: {
      ...formattedNewsArticle,
    },
  }
}

const salaryChangeTimelineItemFormatter = (salaryChange) => {
  const attributes = ['kind']

  const salary = get(salaryChange, 'salary')
  const salaryFreq = get(salaryChange, 'salaryFreq')

  const salaryString = formatSalary(salary, salaryFreq)

  return {
    ...pick(salaryChange, attributes),
    salary: salaryString,
  }
}

const rankChangeTimelineItemFormatter = (rankChange) => {
  return {
    kind: rankChange.kind,
    rank: upperFirst(rankChange.rankDesc) || rankChange.rankCode,
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

const postDecertificationTimelineItemFormatter = (item) => {
  const attributes = ['id', 'kind', 'department']

  const allegations = join(item.allegations, ', ')

  return {
    ...pick(item, attributes),
    allegations,
  }
}

const bradyTimelineItemFormatter = (item) => {
  const attributes = [
    'kind',
    'allegationDesc',
    'chargingDepartment',
    'department',
    'sourceDepartment',
    'date',
    'trackingIdOg',
    'id',
  ]

  const capitalizeAttributes = ['disposition', 'action']

  return {
    ...pick(item, attributes),
    ...mapValues(pick(item, capitalizeAttributes), capitalize),
  }
}

const TIMELINE_ITEMS_MAPPINGS = {
  [TIMELINE_KINDS.JOINED]: joinedTimelineItemFormatter,
  [TIMELINE_KINDS.LEFT]: baseTimelineItemFormatter,
  [TIMELINE_KINDS.TERMINATED]: baseTimelineItemFormatter,
  [TIMELINE_KINDS.RESIGNED]: baseTimelineItemFormatter,
  [TIMELINE_KINDS.COMPLAINT]: complaintTimelineItemFormatter,
  [TIMELINE_KINDS.UOF]: useOfForceTimelineItemFormatter,
  [TIMELINE_KINDS.DOCUMENT]: documentTimelineItemFormatter,
  [TIMELINE_KINDS.SALARY_CHANGE]: salaryChangeTimelineItemFormatter,
  [TIMELINE_KINDS.RANK_CHANGE]: rankChangeTimelineItemFormatter,
  [TIMELINE_KINDS.UNIT_CHANGE]: unitChangeTimelineItemFormatter,
  [TIMELINE_KINDS.NEWS_ARTICLE]: newsArticleTimelineItemFormatter,
  [TIMELINE_KINDS.APPEAL]: appealTimelineItemFormatter,
  [TIMELINE_KINDS.POST_DECERTIFICATION]: postDecertificationTimelineItemFormatter,
  [TIMELINE_KINDS.BRADY_LIST]: bradyTimelineItemFormatter,
  [TIMELINE_KINDS.FIREARM_CERTIFICATION]: baseTimelineItemFormatter,
  [TIMELINE_KINDS.PC_12_QUALIFICATION]: baseTimelineItemFormatter,
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

const getTimeline = (state) => get(state.officerPage, 'timeline.timeline', [])

const getTimelinePeriod = (state) =>
  get(state.officerPage, 'timeline.timelinePeriod', [])

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
      year: items[0].year,
    }))

    const orderedGroup = orderBy(
      formattedGroups,
      (item) =>
        item.groupName ? `${item.groupName}${item.isDateEvent || 'z'}` : '',
      'desc'
    )

    let currentYear, leftGroup
    forEach(orderedGroup, (group, groupIndex) => {
      if (groupIndex === 0) {
        leftGroup = true
      } else if (group.year !== currentYear) {
        leftGroup = !leftGroup
      }
      currentYear = group.year
      group.leftGroup = leftGroup
    })

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
  some(timeline, (item) =>
    [TIMELINE_KINDS.COMPLAINT, TIMELINE_KINDS.UOF].includes(item.kind)
  )
)

export const timelinePeriodSelector = createSelector(
  getTimelinePeriod,
  formatDataPeriods
)

export const isDownloadingFileSelector = (state) =>
  get(state, 'officerPage.isDownloading', false)
