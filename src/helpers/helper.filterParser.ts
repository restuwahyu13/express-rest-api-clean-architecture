import * as typeorm from 'typeorm'

export const filterParser = (filter: Record<string, any>): Record<string, any>[] => {
  const getKeys: string[] = Object.keys(filter)
  const parseData: Record<string, any>[] = getKeys.map((val: any): Record<string, any> => {
    return { [val]: typeorm.ILike(`%${filter[val]}%`) }
  })

  return parseData
}
