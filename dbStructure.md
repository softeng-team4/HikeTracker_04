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
- altitude: number
- latitude: number
- longitude: number
- time: timestamp

The field referencePoint is a string in a json format that contains all the points in the track. It is formed by and array of objects that contains:
- lat: number
- lng: number
- name: string
The "name" attribute is present only if that point is actually a reference point.

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
