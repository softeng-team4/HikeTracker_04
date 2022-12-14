# users

| Fields    | Type   |
| :-------- | :----- |
| email     | string |
| firstName | string |
| lastName  | string |
| role      | string |
| phoneNumber | string |
| reqRole   | string |
| reqStatus | string |
| respDate      | string |
| hutId       | string |
| preferences       | map |
| stats      | map |


**reqRole possible values:** "hut worker", "local guide"

**reqStatus possible values:** "pending", "accepted", "rejected"

**respDate:** date of rejection/approval of the last request

**hutId:** id of the hut that a hut worker works to, written upon approval of a request for a hut worker account (hut worker exclusive)

**preferences:** map of custom preferences on hike filters (length, ascent and expected time ranges) for hikers, a range is an object like
  - min: number
  - max: number

**stats:** map of performance stats of a hiker, It is an object with fields:
  - completed_hikes: number
  - distance: number
  - time: number
  - ascent: number
  - ascending_time: number
  - highest_altitude: number
  - highest_altitude_range: number
  - longest_hike_distance: number
  - longest_hike_time: number
  - shortest_hike_distance: number
  - shortest_hike_time: number
  - fastest_paced_hike: number


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
| linkedHuts     | string |
| condition      | string |
| condDetails    | string |

**condition possible values:** "open","closed","partly blocked","requires special gear"

**condDetails:** only available if the afromentioned condition has a value different than "open"


startPoint and endPoint are maps with the following elements:
- altitude: number
- latitude: number
- longitude: number
- time: timestamp

The field referencePoint is a string in a json format that contains all the points in the track. It is formed by and array of objects that contains:
- lat: number
- lng: number
- alt: number The "alt" attribute is present only if that point is actually a reference point.
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
| altitude      | number   |
| phone         | string   |
| email         | string   |
| website       | string   |
| bedsNumber    | number   |
| costPerNight  | number   |
| description   | string   |
| openingHour   | number   |
| openingMinute | number   |
| closingHour   | number   |
| closingMinute | number   |

**website:** this field is optional

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

# regHikes

| Fields        | Type     |
| :------------ | :------- |
| id          | string   |
| hikeId          | string   |
| status          | string   |
| startTime          | string   |
| endTime          | string   |
| passedRP          | array(GeoPoint)   |
| userId         | string   |

**status possible values:** 'ongoing' (upon hike creation),'terminated' (upon hike termination)
**passedRP:** array containing the list of reference points (belonging to the hike identified by hikeId) that the user has declared as passed
**userId**: id of the user that started the registered hike


