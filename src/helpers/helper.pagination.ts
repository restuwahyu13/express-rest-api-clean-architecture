export interface Pagination<T = Record<string, any>> {
  limit: number
  offset: number
  sort: 'DESC' | 'ASC'
  filter?: T
}

export const pagination = (query?: Pagination): Pagination | Record<string, any> => {
  let queryPagination: Record<string, any> = Object.assign({}, query)

  if (queryPagination.hasOwnProperty('limit') && queryPagination.hasOwnProperty('offset') && queryPagination.hasOwnProperty('sort')) {
    queryPagination.limit = query.limit
    queryPagination.offset = query.offset
    queryPagination.sort = query.sort
  }

  if (queryPagination.hasOwnProperty('filter')) {
    queryPagination.filter = Object.fromEntries(new URLSearchParams(query.filter))
  }

  if (!queryPagination.hasOwnProperty('limit') && !queryPagination.hasOwnProperty('offset') && !queryPagination.hasOwnProperty('sort')) {
    queryPagination.limit = 10
    queryPagination.offset = 0
    queryPagination.sort = 'DESC'
  }

  return queryPagination
}
