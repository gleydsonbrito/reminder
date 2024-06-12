import pg from 'pg'

const { Client } = pg

export default new Client({
    user: 'postgres',
    host: 'roundhouse.proxy.rlwy.net',
    database: 'railway',
    password: 'YvfghGfiHoLZeAPqGYfaWkpAJZedlVGk',
    port: 56888
})
