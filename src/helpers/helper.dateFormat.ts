import moment from 'moment'

export const dateFormat = (date: moment.MomentInput): string => {
  return moment(date).format()
}
