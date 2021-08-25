import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const DEFAULT_STYLE = 'YYYY-MM-DD HH:mm:ss'

export default function formatTimeFilter(
  time: string,
  style: string = DEFAULT_STYLE
) {
  return dayjs.utc(time).format(style)
}
