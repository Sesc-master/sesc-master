# Sescmaster

## Up project
- make sure u install docker
- set vars
```shell
cp .env.example .env
```
- up docker containers
```shell 
docker compose up
```

## Environment
This is an example .env file:
```shell
PORT=4000

SESC_REQUEST_LOCK_DELAY=10000

SCHEDULES_MAX_PARALLEL_REQUESTS=10

GRAPHQL_LANDING_PAGE=playground

SCHEDULING_TZ=Asia/Yekaterinburg
```
### PORT
This variable specifies port, on which server will listen. Default value is `4000`.

### SCHEDULES_TYPE_DELAY
This variable specifies delay in milliseconds between several requests for schedules of weekday with different types. If it`s not defined, delay will not occur.

### SCHEDULES_MAX_PARALLEL_REQUESTS
This variable specifies max parallel requests when getting a schedule in schedulesUpdater. If defined value less than `1`, value will be forced to `1`. Default value is `10`.

### GRAPHQL_LANDING_PAGE
This variable specifies landing page of graphql endpoint. If it is set `playground`, on endpoint in browser will be [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/v2/testing/graphql-playground) page, otherwise nothing.

### SCHEDULING_TZ
This variable specifies timezone for schedules of updaters. Default is `Asia/Yekaterinburg`, because of SESC UrFU location. 
