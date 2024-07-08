## Uso local

para o docker ter acesso ao script de criar a tabela do dynamodb
```
chmod +x init-aws.sh
```
para executar:
```
docker compose up -d
npm install
npm start
```
o app vai estar disponivel na seguinte url: 

```
http://localhost:4000/graphql
```

### Deployment

```
npm install
```

e depois faça o deploy com o comando:

```
serverless deploy
```

Depois de rodar o deploy, voce vai ver um output parecido com esse: 
```
Deploying "test-lambda" to stage "dev" (us-east-1)

✔ Service deployed to stack test-lambda-dev

endpoints:
  GET - https://n47u1vosu8.execute-api.us-east-1.amazonaws.com/graphql
  POST - https://n47u1vosu8.execute-api.us-east-1.amazonaws.com/graphql
functions:
  graphql: test-lambda-dev-graphql (9 MB)

```