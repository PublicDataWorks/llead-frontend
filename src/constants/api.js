import config from 'config'

const API_URL = `${config.serverUrl}/api/`
export const TOKEN_API_URL = `${API_URL}token/`
export const FORGOT_PASSWORD_API_URL = `${API_URL}password-reset/`
export const FORGOT_PASSWORD_CONFIRM_API_URL = `${API_URL}password-reset/confirm/`
export const USER_INFO_API_URL = `${API_URL}user/`
export const LOG_OUT_API_URL = `${API_URL}token/revoke/`
export const REFRESH_TOKEN_API_URL = `${API_URL}token/refresh/`
export const APP_CONFIG_API_URL = `${API_URL}app-config/`
export const RECENT_ITEMS_API_URL = `${API_URL}historical-data/recent-items/`
export const RECENT_QUERIES_API_URL = `${API_URL}historical-data/recent-queries/`
export const ANALYTIC_SUMMARY_API_URL = `${API_URL}analytics/summary/`
export const DEPARTMENTS_API_URL = `${API_URL}departments/`
export const OFFICERS_API_URL = `${API_URL}officers/`
export const DOCUMENTS_API_URL = `${API_URL}documents/`
export const NEWS_ARTICLES_API_URL = `${API_URL}news-articles/`
export const SEARCH_API_URL = `${API_URL}search/`
export const FRONT_PAGE_ORDERS_API_URL = `${API_URL}front-page-orders/`
export const FRONT_PAGE_CARDS_API_URL = `${API_URL}front-page-cards/`
export const Q_AND_A_API_URL = `${API_URL}q-and-a/`
