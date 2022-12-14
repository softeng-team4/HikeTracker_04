TEMPLATE FOR RETROSPECTIVE (Team ##)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done 
- Total points committed vs done 
- Nr of hours planned vs spent (as a team)

**Remember**  a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |         |    -   |            |              |
| n      |         |        |            |              |
   

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task (average, standard deviation)
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent -1

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 12h 10m
  - Total hours spent: 13h 35m
  - Nr of automated unit test cases: 8
  - Coverage (if available): N.A
- E2E testing:
  - Total hours estimated: 8h 10m
  - Total hours spent: 8h 15m
- Code review 
  - Total hours estimated: 3h 
  - Total hours spent: 3h 30m
- Technical Debt management:
  - Total hours estimated: 4h 
  - Total hours spent: 3h
  - Hours estimated for remediation by SonarQube: 1d 3h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: N.A
  - Hours spent on remediation: 3h 
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.8%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ):
	- Reilability: A
	- Security: A
	- Maintainability: A
  


## ASSESSMENT

- What caused your errors in estimation (if any)?

- What lessons did you learn (both positive and negative) in this sprint?

- Which improvement goals set in the previous retrospective were you able to achieve? 
  
- Which ones you were not able to achieve? Why?

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

> Propose one or two

- One thing you are proud of as a Team!!