function cov_1fqm4ysr32() {
  var path = "/home/mistru97/Polito/MasterDegree/02_year/softeng2/HikeTracker_04/client/src/model/User.js";
  var hash = "1ea11890c872c6a15e3a4d9cce69a2aa80d95443";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/mistru97/Polito/MasterDegree/02_year/softeng2/HikeTracker_04/client/src/model/User.js",
    statementMap: {
      "0": {
        start: {
          line: 2,
          column: 4
        },
        end: {
          line: 2,
          column: 23
        }
      },
      "1": {
        start: {
          line: 3,
          column: 4
        },
        end: {
          line: 3,
          column: 29
        }
      },
      "2": {
        start: {
          line: 4,
          column: 4
        },
        end: {
          line: 4,
          column: 31
        }
      },
      "3": {
        start: {
          line: 5,
          column: 4
        },
        end: {
          line: 5,
          column: 29
        }
      },
      "4": {
        start: {
          line: 6,
          column: 4
        },
        end: {
          line: 6,
          column: 35
        }
      },
      "5": {
        start: {
          line: 7,
          column: 4
        },
        end: {
          line: 7,
          column: 21
        }
      },
      "6": {
        start: {
          line: 8,
          column: 4
        },
        end: {
          line: 8,
          column: 27
        }
      },
      "7": {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 31
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
          column: 19
        }
      }
    },
    fnMap: {
      "0": {
        name: "User",
        decl: {
          start: {
            line: 1,
            column: 24
          },
          end: {
            line: 1,
            column: 28
          }
        },
        loc: {
          start: {
            line: 1,
            column: 121
          },
          end: {
            line: 12,
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
      "9": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "1ea11890c872c6a15e3a4d9cce69a2aa80d95443"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1fqm4ysr32 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1fqm4ysr32();
export default function User(email, username, firstName, lastName, phoneNumber, role, reqRole, reqStatus, respDate, hut) {
  cov_1fqm4ysr32().f[0]++;
  cov_1fqm4ysr32().s[0]++;
  this.email = email;
  cov_1fqm4ysr32().s[1]++;
  this.username = username;
  cov_1fqm4ysr32().s[2]++;
  this.firstName = firstName;
  cov_1fqm4ysr32().s[3]++;
  this.lastName = lastName;
  cov_1fqm4ysr32().s[4]++;
  this.phoneNumber = phoneNumber;
  cov_1fqm4ysr32().s[5]++;
  this.role = role;
  cov_1fqm4ysr32().s[6]++;
  this.reqRole = reqRole;
  cov_1fqm4ysr32().s[7]++;
  this.reqStatus = reqStatus;
  cov_1fqm4ysr32().s[8]++;
  this.respDate = respDate;
  cov_1fqm4ysr32().s[9]++;
  this.hut = hut;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVc2VyIiwiZW1haWwiLCJ1c2VybmFtZSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicGhvbmVOdW1iZXIiLCJyb2xlIiwicmVxUm9sZSIsInJlcVN0YXR1cyIsInJlc3BEYXRlIiwiaHV0Il0sInNvdXJjZXMiOlsiVXNlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVc2VyKGVtYWlsLCB1c2VybmFtZSwgZmlyc3ROYW1lLCBsYXN0TmFtZSwgcGhvbmVOdW1iZXIsIHJvbGUsIHJlcVJvbGUsIHJlcVN0YXR1cywgcmVzcERhdGUsIGh1dCkge1xuICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcbiAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgdGhpcy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XG4gICAgdGhpcy5sYXN0TmFtZSA9IGxhc3ROYW1lO1xuICAgIHRoaXMucGhvbmVOdW1iZXIgPSBwaG9uZU51bWJlcjtcbiAgICB0aGlzLnJvbGUgPSByb2xlO1xuICAgIHRoaXMucmVxUm9sZSA9IHJlcVJvbGU7XG4gICAgdGhpcy5yZXFTdGF0dXMgPSByZXFTdGF0dXM7XG4gICAgdGhpcy5yZXNwRGF0ZSA9IHJlc3BEYXRlO1xuICAgIHRoaXMuaHV0ID0gaHV0O1xufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBO01BQUE7SUFBQTtFQUFBO0VBQUE7QUFBQTtBQUFBO0FBZlosZUFBZSxTQUFTQSxJQUFJLENBQUNDLEtBQUssRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLFFBQVEsRUFBRUMsV0FBVyxFQUFFQyxJQUFJLEVBQUVDLE9BQU8sRUFBRUMsU0FBUyxFQUFFQyxRQUFRLEVBQUVDLEdBQUcsRUFBRTtFQUFBO0VBQUE7RUFDckgsSUFBSSxDQUFDVCxLQUFLLEdBQUdBLEtBQUs7RUFBQztFQUNuQixJQUFJLENBQUNDLFFBQVEsR0FBR0EsUUFBUTtFQUFDO0VBQ3pCLElBQUksQ0FBQ0MsU0FBUyxHQUFHQSxTQUFTO0VBQUM7RUFDM0IsSUFBSSxDQUFDQyxRQUFRLEdBQUdBLFFBQVE7RUFBQztFQUN6QixJQUFJLENBQUNDLFdBQVcsR0FBR0EsV0FBVztFQUFDO0VBQy9CLElBQUksQ0FBQ0MsSUFBSSxHQUFHQSxJQUFJO0VBQUM7RUFDakIsSUFBSSxDQUFDQyxPQUFPLEdBQUdBLE9BQU87RUFBQztFQUN2QixJQUFJLENBQUNDLFNBQVMsR0FBR0EsU0FBUztFQUFDO0VBQzNCLElBQUksQ0FBQ0MsUUFBUSxHQUFHQSxRQUFRO0VBQUM7RUFDekIsSUFBSSxDQUFDQyxHQUFHLEdBQUdBLEdBQUc7QUFDbEIifQ==