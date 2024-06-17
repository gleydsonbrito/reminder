
const config = {
    user: 'postgres',
    host: 'roundhouse.proxy.rlwy.net',
    database: 'railway',
    password: 'YvfghGfiHoLZeAPqGYfaWkpAJZedlVGk',
    port: 56888
}

async function testarConexao() {
    try {
        // Conecta ao PostgreSQL
        await client.connect();
        const res = await client.query('SELECT * FROM provas')
        console.log(res.rows);
    } catch (err) {
        console.error('Erro ao conectar ao PostgreSQL:', err);
    } finally {
        // Fecha a conexão com PostgreSQL, se estiver aberta
        await client.end();
    }
}

// Chama a função para testar a conexão
//testarConexao();

export default config