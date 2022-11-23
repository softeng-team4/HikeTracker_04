# users

| Fields    | Type   |
| :-------- | :----- |
| email     | string |
| firstName | string |
| lastName  | string |
| role      | string |

# hike

| Fields         | Type   |
| :------------- | :----- |
| title          | string |
| country        | string |
| region         | string |
| city           | string |
| description    | string |
| difficulty     | string |
| expectedTime   | number |
| length         | number |
| ascent         | number |
| startPoint     | map    |
| endPoint       | map    |
| referencePoint | string |

startPoint and endPoint are maps with the following elements:
- ele: number
- lat: number
- lon: number
- time: number

referencePoint is a string in a json format. This json is formed by and array of objects that contains "ele", "lat", "lon", and "time" attributes.

# huts

| Fields        | Type     |
| :------------ | :------- |
| name          | string   |
| country       | string   |
| region        | string   |
| city          | string   |
| position      | geopoint |
| bedsNumber    | number   |
| costPerNight  | number   |
| description   | string   |
| openingHour   | number   |
| openingMinute | number   |
| closingHour   | number   |
| closingMinute | number   |

# parkingLots

| Fields        | Type     |
| :------------ | :------- |
| name          | string   |
| country       | string   |
| region        | string   |
| city          | string   |
| position      | geopoint |
| lotsNumber    | number   |
| costPerDay    | number   |
| description   | string   |
| openingHour   | number   |
| openingMinute | number   |
| closingHour   | number   |
| closingMinute | number   |
