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
  NEWS_ARTICLE: 'NEWS_ARTICLE',
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
  NEWS_ARTICLE: 9,
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
  NEWS_ARTICLE: 'NEWS_ARTICLE',
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
  NEWS_ARTICLES: {
    title: 'News Articles',
    kinds: [TIMELINE_KINDS.NEWS_ARTICLE],
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

export const TRACK_ITEM_TYPES = {
  COMPLAINT: 'complaint',
  UOF: 'use of force',
}

export const EVENT_TYPES = {
  CARD_EXPAND: 'card_expand',
  COPY_CARD_LINK: 'copy_card_link',
  DOWNLOAD_SPREADSHEET: 'download_spreadsheet',
  OPEN_DOCUMENT: 'open_document',
  OPEN_ARTICLE: 'open_article',
  SEARCH: 'search',
  ACCESS_PAGE: 'access_page',
}

export const DEFAULT_DOCUMENT_HEAD = {
  title: 'LLEAD',
}

export const CONTENT_TYPES = {
  JSON: 'application/json',
  SHEET: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

export const CARD_TYPES = {
  DOCUMENT: 'document',
}

export const FRONT_PAGE_SECTIONS = {
  DEPARTMENT: 'DEPARTMENT',
  OFFICER: 'OFFICER',
  DOCUMENT: 'DOCUMENT',
  NEWS_ARTICLE: 'NEWS_ARTICLE',
}

export const QUERY_DOCTYPE_MAPPING = {
  document: 'documents',
  article: 'articles',
}

export const DOCUMENTS_SHOW_MORE_LIMIT = 5
export const NEWS_ARTICLES_SHOW_MORE_LIMIT = 5

export const NEWS_TYPE = 'news'
