export const CMS_SECTIONS = {
  FRONT_PAGE: 'FRONT_PAGE',
  FOOTER: 'FOOTER',
}

export const CMS_KEYS = {
  [CMS_SECTIONS.FRONT_PAGE]: {
    summary: 'frontPageSummary',
  },
  [CMS_SECTIONS.FOOTER]: {
    text: 'footerText',
  },
}

export const HTTP_STATUS_CODES = {
  UNAUTHORIZED: 401,
}

export const DATE_FORMAT = {
  LONG_DATE_FORMAT: 'MMM D, YYYY',
}

export const SEARCH_THROTTLE_TIME_OUT = 500
export const MAX_SEARCH_QUERIES = 200
export const MAX_SEARCH_QUERY_SUGGESTIONS = 10

export const MAX_RECENT_ITEMS = 10
export const RECENT_ITEM_TYPES = {
  DEPARTMENT: 'DEPARTMENT',
  OFFICER: 'OFFICER',
  DOCUMENT: 'DOCUMENT',
}

export const REQUEST_CANCEL_MESSAGE = 'Cancel old request'

export const TIMELINE_KIND_ORDERS = {
  JOINED: 1,
  LEFT: 2,
  RANK_CHANGE: 3,
  UNIT_CHANGE: 4,
  SALARY_CHANGE: 5,
  COMPLAINT: 6,
  UOF: 7,
  DOCUMENT: 8,
}

export const TIMELINE_KINDS = {
  JOINED: 'JOINED',
  LEFT: 'LEFT',
  COMPLAINT: 'COMPLAINT',
  UOF: 'UOF',
  DOCUMENT: 'DOCUMENT',
  SALARY_CHANGE: 'SALARY_CHANGE',
  RANK_CHANGE: 'RANK_CHANGE',
  UNIT_CHANGE: 'UNIT_CHANGE',
}

export const TIMELINE_FILTERS = {
  COMPLAINTS: {
    title: 'Complaints',
    kinds: [TIMELINE_KINDS.COMPLAINT],
  },
  DOCUMENTS: {
    title: 'Documents',
    kinds: [TIMELINE_KINDS.DOCUMENT],
  },
  RANKS_AND_UNITS: {
    title: 'Rank/unit',
    kinds: [TIMELINE_KINDS.RANK_CHANGE, TIMELINE_KINDS.UNIT_CHANGE],
  },
  UOF: {
    title: 'Use of force',
    kinds: [TIMELINE_KINDS.UOF],
  },
}

export const QUICK_ANIMATION_DURATION = 400
export const ANIMATION_DURATION = 1500

export const EXPAND_TRACK_ITEMS = {
  COMPLAINT: 'complaint',
  UOF: 'use of force',
}
