RETROSPECTIVE (Team 4)
=====================================

Sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done

  5 stories committed vs 5 stories done 

- Total points committed vs done 

  47 points committed vs 47 points done

- Nr of hours planned vs spent (as a team)

  72h planned vs 72h 28m spent


**Remember**  a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 18      | -      | 38h 10m    | 37h 56m      |
| 17    | 4       | 8      | 5h         | 3h 52m       |
| 18    | 4       | 8      | 8h 30m     | 8h 35m       |
| 34    | 4       | 5      | 6h 20m     | 6h 40m       |
| 19    | 4       | 13     | 6h         | 6h 25m       |
| 35    | 4       | 13     | 8h         | 9h           |
   

> technical tasks correspond to story `#0` and don't include story points (not applicable in this case)

- Hours per task (average, standard deviation)
	- Average: 1.5h estimated vs 1.51h spent
	- Standard deviation: `todo` estimated vs `todo` spent

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent -1
	- TTEER = -0.0068965517

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 12h 40m
  - Total hours spent: 12h
  - Nr of automated unit test cases: `todo`
  - Coverage (if available): `todo`
- E2E testing:
  - Total hours estimated: 10h 50m
  - Total hours spent: 15h 55m
- Code review 
  - Total hours estimated: 5h 30m
  - Total hours spent: 4h 30m
- Technical Debt management:
  - Total hours estimated: 4h
  - Total hours spent: 5h 8m
  - Hours estimated for remediation by SonarQube: `todo`
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: `todo`
  - Hours spent on remediation: `todo`
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): `todo`
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ): `todo`
	
	- Reilability: A
	- Security: A
	- Maintainability: A


## ASSESSMENT

- What caused your errors in estimation (if any)?
	- Our estimations were more or less correct

- What lessons did you learn (both positive and negative) in this sprint?
	- More tests means a better quality of the product
	- Holidays can influence the organization in a team

- Which improvement goals set in the previous retrospective were you able to achieve? 
	- We could arrange a horizontal task on usability and correctly exploit it.
	- We arranged to store data on SonarQube, in order to better keep track on our progress on technical debt

- Which ones you were not able to achieve? Why?
  - We weren't able to arrange a full meeting schedule, this was due to the ongoing holidays that gave us just a few matches in our work schedule.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
	- Set up a meeting schedule to make communication smoother

- One thing you are proud of as a Team!!
  - All the tasks and some additional ideas were implemented.
  - We managed to deliver a better quality product thanks to the whole team effort on tests
  - Everyone was able to help everyone on every task, because during the sprints we managed to distribute the tasks evenly among the teams members
