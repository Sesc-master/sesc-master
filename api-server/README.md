# SESC-master-api-server

This is GraphQL API server for [sescmaster](https://sescmaster.ru).

### Installation:
```shell
yarn install
```

### Building:
```shell
yarn build
```

### Start:
```shell
yarn start
```

## Principe

### Caches
Caches are objects, that implements [ICache](src/utils/ICache.ts) interface. They should somehow store data, and return it with async getValue method. Also, Cache object should update data by updateValue async method and return true, if values is different.

There used simple [Cache class](src/utils/cache.ts) and [caches](src/caches.ts), that store data in memory, like common object's fields. But others that implement the ICache interface can be used.

### Parsers
[Parsers](src/sesc/parsers) are just functions, that parse html pages or JS scripts from [site of SESC UrFU](https://lyceum.urfu.ru). List of them below, in table of updaters.

### Updaters
[Updaters](src/updaters.ts) are objects of [Updater](src/utils/updater.ts) class, that execute updater function by schedule and load value to provided cache. If updater function has returned new value (that is not equal with previous one), updater executes onChange function (if this one`s provided) and triggers updaters, which are subscribed to executed one.

| Updater               | Parsers                                                                                                                           | Parsing time     | Required              | link                                                                  |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------|------------------|-----------------------|-----------------------------------------------------------------------|
| IDsUpdater            | [parseIDs.ts](src/api/types/parseIDs.ts)                                                                                       | 09-01-07:00      |                       | https://lyceum.urfu.ru/ucheba/raspisanie-zanjatii                     |
| calendarChartsUpdater | [parseCalendarChart.ts](src/api/types/parseCalendarChart.ts) [parseLessonsTimings.ts](src/api/types/parseLessonsTimings.ts) | 09-01-07:00      |                       | https://lyceum.urfu.ru/fileadmin/user_upload/scripts/zvonkiCalGraf.js |
| announcementsUpdater  | [parseAnnouncements.ts](src/api/types/parseAnnouncements.ts)                                                                   | 07:00            |                       | https://lyceum.urfu.ru/dopolnitelnye-stranicy/objavlenija             |
| schedulesUpdater      |                                                                                                                                   | Every 30 minutes | IDsUpdater            | https://lyceum.urfu.ru/ucheba/raspisanie-zanjatii                     |
| eatTimingsUpdater     | [parseEatTimings.ts](src/api/types/parseEatTimings.ts)                                                                         | 09-01-07:00      | calendarChartsUpdater | https://lyceum.urfu.ru/ucheba/godovoi-kalendarnyi-grafik              |

### SESCRequest
[SESCRequest](src/sesc/request.ts) is function, that just return body of HTTPS response as string by options or URL. Also, it redoes HTTPS request, if got stub page with text `Page is being generated.`. And if got 502 HTTP code, function locks for a time in `SESC_REQUEST_LOCK_DELAY` environment variable. These 2 aspects are necessary, because of the CRM and nginx configuration used on the [SESC UrFU site](https://lyceum.urfu.ru).

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
