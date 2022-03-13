export const convertTime = (time: number, type: string): number => {
  let timeNumber: number

  switch (type) {
    case 'second':
      timeNumber = 60 * time
      return Math.abs(timeNumber)
    case 'minute':
      timeNumber = 60 * 60 * time
      return Math.abs(timeNumber / 60 / 60)
    case 'days':
      timeNumber = 24 * 60 * 60 * time
      return Math.abs(timeNumber / 24 / 60 / 60)
    default:
      return 0
  }
}
