# users

| Fields    | Type   |
| :-------- | :----- |
| email     | string |
| firstName | string |
| lastName  | string |
| role      | string |

# hike

| Fields         | Type              |
| :------------- | :---------------- |
| title          | string            |
| country        | string            |
| region         | string            |
| city           | string            |
| description    | string            |
| difficulty     | string            |
| expectedTime   | number            |
| length         | number            |
| ascent         | number            |
| startPoint     | geopoint          |
| endPoint       | geopoint          |
| referencePoint | array of geopoint |

# huts

| Fields        | Type     |
| :------------ | :------- |
| name          | string   |
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
| position      | geopoint |
| lotsNumber    | number   |
| costPerDay    | number   |
| description   | string   |
| openingHour   | number   |
| openingMinute | number   |
| closingHour   | number   |
| closingMinute | number   |
