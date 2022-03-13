import moment from 'moment'
import { convertTime } from '@/helpers/helper.convertTime'

export const expiredAt = (ms: number, type: string): string | null => {
  const time: number = convertTime(ms, type)
  const date: any = moment(new Date())

  switch (type) {
    case 'second':
      date.set('seconds', date.seconds() + time)
      return date.format()
    case 'minute':
      date.set('minutes', date.minutes() + time)
      return date.format()
    case 'days':
      date.set('days', date.days() + time)
      return date.format()
    default:
      return null
  }
}
