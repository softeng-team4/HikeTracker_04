function cov_pqq6p52s() {
  var path = "/home/mistru97/Polito/MasterDegree/02_year/softeng2/HikeTracker_04/client/src/components/MapComponents/MapIcons.js";
  var hash = "f2e81b1c09a8f34a4988a44cd4cfb79af4ec3c3d";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/mistru97/Polito/MasterDegree/02_year/softeng2/HikeTracker_04/client/src/components/MapComponents/MapIcons.js",
    statementMap: {
      "0": {
        start: {
          line: 6,
          column: 18
        },
        end: {
          line: 12,
          column: 2
        }
      },
      "1": {
        start: {
          line: 13,
          column: 16
        },
        end: {
          line: 19,
          column: 2
        }
      },
      "2": {
        start: {
          line: 20,
          column: 16
        },
        end: {
          line: 26,
          column: 2
        }
      },
      "3": {
        start: {
          line: 27,
          column: 16
        },
        end: {
          line: 33,
          column: 2
        }
      },
      "4": {
        start: {
          line: 34,
          column: 17
        },
        end: {
          line: 40,
          column: 2
        }
      },
      "5": {
        start: {
          line: 41,
          column: 19
        },
        end: {
          line: 47,
          column: 2
        }
      },
      "6": {
        start: {
          line: 48,
          column: 20
        },
        end: {
          line: 54,
          column: 2
        }
      },
      "7": {
        start: {
          line: 55,
          column: 25
        },
        end: {
          line: 61,
          column: 2
        }
      },
      "8": {
        start: {
          line: 62,
          column: 19
        },
        end: {
          line: 68,
          column: 2
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0
    },
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "f2e81b1c09a8f34a4988a44cd4cfb79af4ec3c3d"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_pqq6p52s = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_pqq6p52s();
import L from 'leaflet';
import '../MapComponents/leaflet.awesome-markers';

// custom icons for the map markers
const startIcon = (cov_pqq6p52s().s[0]++, L.AwesomeMarkers.icon({
  icon: 'play-circle',
  markerColor: 'green',
  prefix: 'fa',
  iconColor: 'black',
  extraClasses: 'fas fa-2x'
}));
const endIcon = (cov_pqq6p52s().s[1]++, L.AwesomeMarkers.icon({
  icon: 'stop-circle',
  markerColor: 'red',
  prefix: 'fa',
  iconColor: 'black',
  extraClasses: 'fas fa-2x'
}));
const refIcon = (cov_pqq6p52s().s[2]++, L.AwesomeMarkers.icon({
  icon: 'info-circle',
  markerColor: 'blue',
  prefix: 'fa',
  iconColor: 'black',
  extraClasses: 'fas fa-2x'
}));
const hutIcon = (cov_pqq6p52s().s[3]++, L.AwesomeMarkers.icon({
  icon: 'home',
  markerColor: 'blue',
  prefix: 'fa',
  iconColor: 'black',
  extraClasses: 'fas fa-2x'
}));
const parkIcon = (cov_pqq6p52s().s[4]++, L.AwesomeMarkers.icon({
  icon: 'parking',
  markerColor: 'blue',
  prefix: 'fa',
  iconColor: 'black',
  extraClasses: 'fas fa-2x'
}));
const newHutIcon = (cov_pqq6p52s().s[5]++, L.AwesomeMarkers.icon({
  icon: 'home',
  markerColor: 'green',
  prefix: 'fa',
  iconColor: 'black',
  extraClasses: 'fas fa-2x'
}));
const newParkIcon = (cov_pqq6p52s().s[6]++, L.AwesomeMarkers.icon({
  icon: 'parking',
  markerColor: 'green',
  prefix: 'fa',
  iconColor: 'black',
  extraClasses: 'fas fa-2x'
}));
const refIconToConfirm = (cov_pqq6p52s().s[7]++, L.AwesomeMarkers.icon({
  icon: 'info-circle',
  markerColor: 'red',
  prefix: 'fa',
  iconColor: 'black',
  extraClasses: 'fas fa-2x'
}));
const newRefIcon = (cov_pqq6p52s().s[8]++, L.AwesomeMarkers.icon({
  icon: 'plus-circle',
  markerColor: 'green',
  prefix: 'fa',
  iconColor: 'black',
  extraClasses: 'fas fa-2x'
}));
export default {
  startIcon,
  endIcon,
  refIcon,
  newRefIcon,
  refIconToConfirm,
  hutIcon,
  parkIcon,
  newHutIcon,
  newParkIcon
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJMIiwic3RhcnRJY29uIiwiQXdlc29tZU1hcmtlcnMiLCJpY29uIiwibWFya2VyQ29sb3IiLCJwcmVmaXgiLCJpY29uQ29sb3IiLCJleHRyYUNsYXNzZXMiLCJlbmRJY29uIiwicmVmSWNvbiIsImh1dEljb24iLCJwYXJrSWNvbiIsIm5ld0h1dEljb24iLCJuZXdQYXJrSWNvbiIsInJlZkljb25Ub0NvbmZpcm0iLCJuZXdSZWZJY29uIl0sInNvdXJjZXMiOlsiTWFwSWNvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgJy4uL01hcENvbXBvbmVudHMvbGVhZmxldC5hd2Vzb21lLW1hcmtlcnMnO1xuXG5cbi8vIGN1c3RvbSBpY29ucyBmb3IgdGhlIG1hcCBtYXJrZXJzXG5jb25zdCBzdGFydEljb24gPSBMLkF3ZXNvbWVNYXJrZXJzLmljb24oe1xuICAgIGljb246ICdwbGF5LWNpcmNsZScsXG4gICAgbWFya2VyQ29sb3I6ICdncmVlbicsXG4gICAgcHJlZml4OiAnZmEnLFxuICAgIGljb25Db2xvcjogJ2JsYWNrJyxcbiAgICBleHRyYUNsYXNzZXM6ICdmYXMgZmEtMngnLFxufSk7XG5jb25zdCBlbmRJY29uID0gTC5Bd2Vzb21lTWFya2Vycy5pY29uKHtcbiAgICBpY29uOiAnc3RvcC1jaXJjbGUnLFxuICAgIG1hcmtlckNvbG9yOiAncmVkJyxcbiAgICBwcmVmaXg6ICdmYScsXG4gICAgaWNvbkNvbG9yOiAnYmxhY2snLFxuICAgIGV4dHJhQ2xhc3NlczogJ2ZhcyBmYS0yeCdcbn0pO1xuY29uc3QgcmVmSWNvbiA9IEwuQXdlc29tZU1hcmtlcnMuaWNvbih7XG4gICAgaWNvbjogJ2luZm8tY2lyY2xlJyxcbiAgICBtYXJrZXJDb2xvcjogJ2JsdWUnLFxuICAgIHByZWZpeDogJ2ZhJyxcbiAgICBpY29uQ29sb3I6ICdibGFjaycsXG4gICAgZXh0cmFDbGFzc2VzOiAnZmFzIGZhLTJ4J1xufSk7XG5jb25zdCBodXRJY29uID0gTC5Bd2Vzb21lTWFya2Vycy5pY29uKHtcbiAgICBpY29uOiAnaG9tZScsXG4gICAgbWFya2VyQ29sb3I6ICdibHVlJyxcbiAgICBwcmVmaXg6ICdmYScsXG4gICAgaWNvbkNvbG9yOiAnYmxhY2snLFxuICAgIGV4dHJhQ2xhc3NlczogJ2ZhcyBmYS0yeCdcbn0pO1xuY29uc3QgcGFya0ljb24gPSBMLkF3ZXNvbWVNYXJrZXJzLmljb24oe1xuICAgIGljb246ICdwYXJraW5nJyxcbiAgICBtYXJrZXJDb2xvcjogJ2JsdWUnLFxuICAgIHByZWZpeDogJ2ZhJyxcbiAgICBpY29uQ29sb3I6ICdibGFjaycsXG4gICAgZXh0cmFDbGFzc2VzOiAnZmFzIGZhLTJ4J1xufSk7XG5jb25zdCBuZXdIdXRJY29uID0gTC5Bd2Vzb21lTWFya2Vycy5pY29uKHtcbiAgICBpY29uOiAnaG9tZScsXG4gICAgbWFya2VyQ29sb3I6ICdncmVlbicsXG4gICAgcHJlZml4OiAnZmEnLFxuICAgIGljb25Db2xvcjogJ2JsYWNrJyxcbiAgICBleHRyYUNsYXNzZXM6ICdmYXMgZmEtMngnXG59KTtcbmNvbnN0IG5ld1BhcmtJY29uID0gTC5Bd2Vzb21lTWFya2Vycy5pY29uKHtcbiAgICBpY29uOiAncGFya2luZycsXG4gICAgbWFya2VyQ29sb3I6ICdncmVlbicsXG4gICAgcHJlZml4OiAnZmEnLFxuICAgIGljb25Db2xvcjogJ2JsYWNrJyxcbiAgICBleHRyYUNsYXNzZXM6ICdmYXMgZmEtMngnXG59KTtcbmNvbnN0IHJlZkljb25Ub0NvbmZpcm0gPSBMLkF3ZXNvbWVNYXJrZXJzLmljb24oe1xuICAgIGljb246ICdpbmZvLWNpcmNsZScsXG4gICAgbWFya2VyQ29sb3I6ICdyZWQnLFxuICAgIHByZWZpeDogJ2ZhJyxcbiAgICBpY29uQ29sb3I6ICdibGFjaycsXG4gICAgZXh0cmFDbGFzc2VzOiAnZmFzIGZhLTJ4J1xufSk7XG5jb25zdCBuZXdSZWZJY29uID0gTC5Bd2Vzb21lTWFya2Vycy5pY29uKHtcbiAgICBpY29uOiAncGx1cy1jaXJjbGUnLFxuICAgIG1hcmtlckNvbG9yOiAnZ3JlZW4nLFxuICAgIHByZWZpeDogJ2ZhJyxcbiAgICBpY29uQ29sb3I6ICdibGFjaycsXG4gICAgZXh0cmFDbGFzc2VzOiAnZmFzIGZhLTJ4J1xufSk7XG5cblxuZXhwb3J0IGRlZmF1bHQgeyBzdGFydEljb24sIGVuZEljb24sIHJlZkljb24sIG5ld1JlZkljb24sIHJlZkljb25Ub0NvbmZpcm0sIGh1dEljb24sIHBhcmtJY29uLCBuZXdIdXRJY29uLCBuZXdQYXJrSWNvbn0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUE7TUFBQTtJQUFBO0VBQUE7RUFBQTtBQUFBO0FBQUE7QUFmWixPQUFPQSxDQUFDLE1BQU0sU0FBUztBQUN2QixPQUFPLDBDQUEwQzs7QUFHakQ7QUFDQSxNQUFNQyxTQUFTLDJCQUFHRCxDQUFDLENBQUNFLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDO0VBQ3BDQSxJQUFJLEVBQUUsYUFBYTtFQUNuQkMsV0FBVyxFQUFFLE9BQU87RUFDcEJDLE1BQU0sRUFBRSxJQUFJO0VBQ1pDLFNBQVMsRUFBRSxPQUFPO0VBQ2xCQyxZQUFZLEVBQUU7QUFDbEIsQ0FBQyxDQUFDO0FBQ0YsTUFBTUMsT0FBTywyQkFBR1IsQ0FBQyxDQUFDRSxjQUFjLENBQUNDLElBQUksQ0FBQztFQUNsQ0EsSUFBSSxFQUFFLGFBQWE7RUFDbkJDLFdBQVcsRUFBRSxLQUFLO0VBQ2xCQyxNQUFNLEVBQUUsSUFBSTtFQUNaQyxTQUFTLEVBQUUsT0FBTztFQUNsQkMsWUFBWSxFQUFFO0FBQ2xCLENBQUMsQ0FBQztBQUNGLE1BQU1FLE9BQU8sMkJBQUdULENBQUMsQ0FBQ0UsY0FBYyxDQUFDQyxJQUFJLENBQUM7RUFDbENBLElBQUksRUFBRSxhQUFhO0VBQ25CQyxXQUFXLEVBQUUsTUFBTTtFQUNuQkMsTUFBTSxFQUFFLElBQUk7RUFDWkMsU0FBUyxFQUFFLE9BQU87RUFDbEJDLFlBQVksRUFBRTtBQUNsQixDQUFDLENBQUM7QUFDRixNQUFNRyxPQUFPLDJCQUFHVixDQUFDLENBQUNFLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDO0VBQ2xDQSxJQUFJLEVBQUUsTUFBTTtFQUNaQyxXQUFXLEVBQUUsTUFBTTtFQUNuQkMsTUFBTSxFQUFFLElBQUk7RUFDWkMsU0FBUyxFQUFFLE9BQU87RUFDbEJDLFlBQVksRUFBRTtBQUNsQixDQUFDLENBQUM7QUFDRixNQUFNSSxRQUFRLDJCQUFHWCxDQUFDLENBQUNFLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDO0VBQ25DQSxJQUFJLEVBQUUsU0FBUztFQUNmQyxXQUFXLEVBQUUsTUFBTTtFQUNuQkMsTUFBTSxFQUFFLElBQUk7RUFDWkMsU0FBUyxFQUFFLE9BQU87RUFDbEJDLFlBQVksRUFBRTtBQUNsQixDQUFDLENBQUM7QUFDRixNQUFNSyxVQUFVLDJCQUFHWixDQUFDLENBQUNFLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDO0VBQ3JDQSxJQUFJLEVBQUUsTUFBTTtFQUNaQyxXQUFXLEVBQUUsT0FBTztFQUNwQkMsTUFBTSxFQUFFLElBQUk7RUFDWkMsU0FBUyxFQUFFLE9BQU87RUFDbEJDLFlBQVksRUFBRTtBQUNsQixDQUFDLENBQUM7QUFDRixNQUFNTSxXQUFXLDJCQUFHYixDQUFDLENBQUNFLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDO0VBQ3RDQSxJQUFJLEVBQUUsU0FBUztFQUNmQyxXQUFXLEVBQUUsT0FBTztFQUNwQkMsTUFBTSxFQUFFLElBQUk7RUFDWkMsU0FBUyxFQUFFLE9BQU87RUFDbEJDLFlBQVksRUFBRTtBQUNsQixDQUFDLENBQUM7QUFDRixNQUFNTyxnQkFBZ0IsMkJBQUdkLENBQUMsQ0FBQ0UsY0FBYyxDQUFDQyxJQUFJLENBQUM7RUFDM0NBLElBQUksRUFBRSxhQUFhO0VBQ25CQyxXQUFXLEVBQUUsS0FBSztFQUNsQkMsTUFBTSxFQUFFLElBQUk7RUFDWkMsU0FBUyxFQUFFLE9BQU87RUFDbEJDLFlBQVksRUFBRTtBQUNsQixDQUFDLENBQUM7QUFDRixNQUFNUSxVQUFVLDJCQUFHZixDQUFDLENBQUNFLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDO0VBQ3JDQSxJQUFJLEVBQUUsYUFBYTtFQUNuQkMsV0FBVyxFQUFFLE9BQU87RUFDcEJDLE1BQU0sRUFBRSxJQUFJO0VBQ1pDLFNBQVMsRUFBRSxPQUFPO0VBQ2xCQyxZQUFZLEVBQUU7QUFDbEIsQ0FBQyxDQUFDO0FBR0YsZUFBZTtFQUFFTixTQUFTO0VBQUVPLE9BQU87RUFBRUMsT0FBTztFQUFFTSxVQUFVO0VBQUVELGdCQUFnQjtFQUFFSixPQUFPO0VBQUVDLFFBQVE7RUFBRUMsVUFBVTtFQUFFQztBQUFXLENBQUMifQ==