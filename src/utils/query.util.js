const queryUtil = ({ skip, limit, page, populate, sort, search }) => {
    const query = {}
    query.page = page ? page : 1
    query.limit = limit ? limit : 25
    query.skip = skip ? skip : (query.page - 1) * query.limit
    populate && (query.populate = populate)
    sort && (query.sort = sort === "new" ? { createdAt: -1 } : { createdAt: 1 })
    search && (query.search = search)
    return query
}

module.exports = queryUtil
