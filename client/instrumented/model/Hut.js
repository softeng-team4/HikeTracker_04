function cov_1y5t9mo7lf() {
  var path = "/home/mistru97/Polito/MasterDegree/02_year/softeng2/HikeTracker_04/client/src/model/Hut.js";
  var hash = "062101da95cfe63645985b6065c714e2131f84e9";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/mistru97/Polito/MasterDegree/02_year/softeng2/HikeTracker_04/client/src/model/Hut.js",
    statementMap: {
      "0": {
        start: {
          line: 2,
          column: 4
        },
        end: {
          line: 2,
          column: 21
        }
      },
      "1": {
        start: {
          line: 3,
          column: 4
        },
        end: {
          line: 3,
          column: 23
        }
      },
      "2": {
        start: {
          line: 4,
          column: 4
        },
        end: {
          line: 4,
          column: 23
        }
      },
      "3": {
        start: {
          line: 5,
          column: 4
        },
        end: {
          line: 5,
          column: 27
        }
      },
      "4": {
        start: {
          line: 6,
          column: 4
        },
        end: {
          line: 6,
          column: 29
        }
      },
      "5": {
        start: {
          line: 7,
          column: 4
        },
        end: {
          line: 7,
          column: 27
        }
      },
      "6": {
        start: {
          line: 8,
          column: 4
        },
        end: {
          line: 8,
          column: 25
        }
      },
      "7": {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 21
        }
      },
      "8": {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 10,
          column: 29
        }
      },
      "9": {
        start: {
          line: 11,
          column: 4
        },
        end: {
          line: 11,
          column: 33
        }
      },
      "10": {
        start: {
          line: 12,
          column: 4
        },
        end: {
          line: 12,
          column: 37
        }
      },
      "11": {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 13,
          column: 34
        }
      },
      "12": {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 14,
          column: 35
        }
      },
      "13": {
        start: {
          line: 15,
          column: 4
        },
        end: {
          line: 15,
          column: 39
        }
      },
      "14": {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 16,
          column: 35
        }
      },
      "15": {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 17,
          column: 39
        }
      }
    },
    fnMap: {
      "0": {
        name: "Hut",
        decl: {
          start: {
            line: 1,
            column: 24
          },
          end: {
            line: 1,
            column: 27
          }
        },
        loc: {
          start: {
            line: 1,
            column: 195
          },
          end: {
            line: 18,
            column: 1
          }
        },
        line: 1
      }
    },
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
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0,
      "13": 0,
      "14": 0,
      "15": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "062101da95cfe63645985b6065c714e2131f84e9"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1y5t9mo7lf = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1y5t9mo7lf();
export default function Hut(name, phone, email, website, altitude, country, region, city, position, bedsNumber, costPerNight, description, openingHour, openingMinute, closingHour, closingMinute) {
  cov_1y5t9mo7lf().f[0]++;
  cov_1y5t9mo7lf().s[0]++;
  this.name = name;
  cov_1y5t9mo7lf().s[1]++;
  this.phone = phone;
  cov_1y5t9mo7lf().s[2]++;
  this.email = email;
  cov_1y5t9mo7lf().s[3]++;
  this.website = website;
  cov_1y5t9mo7lf().s[4]++;
  this.altitude = altitude;
  cov_1y5t9mo7lf().s[5]++;
  this.country = country;
  cov_1y5t9mo7lf().s[6]++;
  this.region = region;
  cov_1y5t9mo7lf().s[7]++;
  this.city = city;
  cov_1y5t9mo7lf().s[8]++;
  this.position = position;
  cov_1y5t9mo7lf().s[9]++;
  this.bedsNumber = bedsNumber;
  cov_1y5t9mo7lf().s[10]++;
  this.costPerNight = costPerNight;
  cov_1y5t9mo7lf().s[11]++;
  this.description = description;
  cov_1y5t9mo7lf().s[12]++;
  this.openingHour = openingHour;
  cov_1y5t9mo7lf().s[13]++;
  this.openingMinute = openingMinute;
  cov_1y5t9mo7lf().s[14]++;
  this.closingHour = closingHour;
  cov_1y5t9mo7lf().s[15]++;
  this.closingMinute = closingMinute;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJIdXQiLCJuYW1lIiwicGhvbmUiLCJlbWFpbCIsIndlYnNpdGUiLCJhbHRpdHVkZSIsImNvdW50cnkiLCJyZWdpb24iLCJjaXR5IiwicG9zaXRpb24iLCJiZWRzTnVtYmVyIiwiY29zdFBlck5pZ2h0IiwiZGVzY3JpcHRpb24iLCJvcGVuaW5nSG91ciIsIm9wZW5pbmdNaW51dGUiLCJjbG9zaW5nSG91ciIsImNsb3NpbmdNaW51dGUiXSwic291cmNlcyI6WyJIdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSHV0KG5hbWUsIHBob25lLCBlbWFpbCwgd2Vic2l0ZSwgYWx0aXR1ZGUsIGNvdW50cnksIHJlZ2lvbiwgY2l0eSwgcG9zaXRpb24sIGJlZHNOdW1iZXIsIGNvc3RQZXJOaWdodCwgZGVzY3JpcHRpb24sIG9wZW5pbmdIb3VyLCBvcGVuaW5nTWludXRlLCBjbG9zaW5nSG91ciwgY2xvc2luZ01pbnV0ZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5waG9uZSA9IHBob25lO1xuICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcbiAgICB0aGlzLndlYnNpdGUgPSB3ZWJzaXRlO1xuICAgIHRoaXMuYWx0aXR1ZGUgPSBhbHRpdHVkZTtcbiAgICB0aGlzLmNvdW50cnkgPSBjb3VudHJ5O1xuICAgIHRoaXMucmVnaW9uID0gcmVnaW9uO1xuICAgIHRoaXMuY2l0eSA9IGNpdHk7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMuYmVkc051bWJlciA9IGJlZHNOdW1iZXI7XG4gICAgdGhpcy5jb3N0UGVyTmlnaHQgPSBjb3N0UGVyTmlnaHQ7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uXG4gICAgdGhpcy5vcGVuaW5nSG91ciA9IG9wZW5pbmdIb3VyO1xuICAgIHRoaXMub3BlbmluZ01pbnV0ZSA9IG9wZW5pbmdNaW51dGU7XG4gICAgdGhpcy5jbG9zaW5nSG91ciA9IGNsb3NpbmdIb3VyO1xuICAgIHRoaXMuY2xvc2luZ01pbnV0ZSA9IGNsb3NpbmdNaW51dGU7XG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUE7TUFBQTtJQUFBO0VBQUE7RUFBQTtBQUFBO0FBQUE7QUFmWixlQUFlLFNBQVNBLEdBQUcsQ0FBQ0MsSUFBSSxFQUFFQyxLQUFLLEVBQUVDLEtBQUssRUFBRUMsT0FBTyxFQUFFQyxRQUFRLEVBQUVDLE9BQU8sRUFBRUMsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLFFBQVEsRUFBRUMsVUFBVSxFQUFFQyxZQUFZLEVBQUVDLFdBQVcsRUFBRUMsV0FBVyxFQUFFQyxhQUFhLEVBQUVDLFdBQVcsRUFBRUMsYUFBYSxFQUFFO0VBQUE7RUFBQTtFQUMvTCxJQUFJLENBQUNmLElBQUksR0FBR0EsSUFBSTtFQUFDO0VBQ2pCLElBQUksQ0FBQ0MsS0FBSyxHQUFHQSxLQUFLO0VBQUM7RUFDbkIsSUFBSSxDQUFDQyxLQUFLLEdBQUdBLEtBQUs7RUFBQztFQUNuQixJQUFJLENBQUNDLE9BQU8sR0FBR0EsT0FBTztFQUFDO0VBQ3ZCLElBQUksQ0FBQ0MsUUFBUSxHQUFHQSxRQUFRO0VBQUM7RUFDekIsSUFBSSxDQUFDQyxPQUFPLEdBQUdBLE9BQU87RUFBQztFQUN2QixJQUFJLENBQUNDLE1BQU0sR0FBR0EsTUFBTTtFQUFDO0VBQ3JCLElBQUksQ0FBQ0MsSUFBSSxHQUFHQSxJQUFJO0VBQUM7RUFDakIsSUFBSSxDQUFDQyxRQUFRLEdBQUdBLFFBQVE7RUFBQztFQUN6QixJQUFJLENBQUNDLFVBQVUsR0FBR0EsVUFBVTtFQUFDO0VBQzdCLElBQUksQ0FBQ0MsWUFBWSxHQUFHQSxZQUFZO0VBQUM7RUFDakMsSUFBSSxDQUFDQyxXQUFXLEdBQUdBLFdBQVc7RUFBQTtFQUM5QixJQUFJLENBQUNDLFdBQVcsR0FBR0EsV0FBVztFQUFDO0VBQy9CLElBQUksQ0FBQ0MsYUFBYSxHQUFHQSxhQUFhO0VBQUM7RUFDbkMsSUFBSSxDQUFDQyxXQUFXLEdBQUdBLFdBQVc7RUFBQztFQUMvQixJQUFJLENBQUNDLGFBQWEsR0FBR0EsYUFBYTtBQUN0QyJ9