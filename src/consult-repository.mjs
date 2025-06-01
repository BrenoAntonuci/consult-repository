import https from 'https';

export const handler = async (event) => {
    const queryString = event.queryStringParameters;
    const usuario = queryString?.usuario;

    if (!usuario) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: 'Parâmetro "usuario" é obrigatório.' }),
        };
    }

    const url = `https://api.github.com/users/${usuario}/repos`;

    try {
        const repositorios = await new Promise((resolve, reject) => {
            const options = {
                headers: {
                    'User-Agent': 'lambda-function',
                    'Accept': 'application/vnd.github.v3+json',
                }
            };

            https.get(url, options, (res) => {
                let data = '';

                res.on('data', chunk => {
                    data += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode === 404) {
                        reject('Usuário não encontrado no GitHub.');
                    } else {
                        const json = JSON.parse(data);
                        resolve(json);
                    }
                });
            }).on('error', (e) => {
                reject(e);
            });
        });

        const resposta = repositorios.map(repo => ({
            nome: repo.name,
            url: repo.html_url,
        }));

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resposta),
        };
    } catch (error) {
        return {
            statusCode: 404,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: error.toString() }),
        };
    }
};