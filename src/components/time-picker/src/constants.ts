export const timeUnits = ['hours', 'minutes', 'seconds'] as const

export const DEFAULT_FORMATS_TIME = 'HH:mm:ss'
export const DEFAULT_FORMATS_DATE = 'YYYY-MM-DD'
export const DEFAULT_FORMATS_DATEPICKER = {
  date: DEFAULT_FORMATS_DATE,
  daterange: DEFAULT_FORMATS_DATE,
  dates: DEFAULT_FORMATS_DATE,
  datetime: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`,
  datetimerange: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`,
  month: 'YYYY-MM',
  monthrange: 'YYYY-MM',
  week: 'gggg[w]ww',
  year: 'YYYY',
}

export type TimeUnit = typeof timeUnits[number]
