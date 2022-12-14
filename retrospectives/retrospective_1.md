RETROSPECTIVE (Team 4)
=====================================

Sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done
  
  3 stories committed vs. 3 stories done
 
- Total points committed vs. done 
  
  26 points committed vs. 26 points done

- Nr of hours planned vs. spent (as a team)
  
  72 hours planned vs. 73h 40m spent

A story is done only if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story          | # Tasks | Points | Hours est. | Hours actual |
| -------------- | ------- | ------ | ---------- | ------------ |
| _#0_           | 6       |        | 32         | 21           |
| Browse hikes   | 4       | 8      | 10         | 11.5         |
| Describe hikes | 5       | 5      | 16         | 27.83        |
| Register       | 5       | 13     | 14         | 13.33        |
   

> technical tasks correspond to story `#0` and don't include story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
  - Estimated hours per task: 72 / 20 = 3.6
  - Actual hours per task: 73.66 / 20 = 3.683
  - Estimated standard deviation: 2
  - Actual standard deviation: 3.66
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1
  - TTEER = -0.023

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 7h
  - Total hours spent: 7h 40m
  - Nr of automated unit test cases: 8
  - Coverage (if available): N.A.
- E2E testing:
  - Total hours estimated: 7h
  - Total hours spent: 5h 10m
- Code review 
  - Total hours estimated: 8h
  - Total hours spent: 5h 10m
  

## ASSESSMENT

- What caused your errors in estimation (if any)?
  - We tried our hands on a new technology, hoping it would have made it easiser to implement some tasks (and it did), but it also brought many unexpected problems that required a lot of time to solve. This made us spend a lot more time than expected on some tasks

- What lessons did you learn (both positive and negative) in this sprint?
  - New techonlogy can make seemingly complicated tasks very straightforward, but it can also introduce issues that complicated tasks originally taken for granted


- Which improvement goals set in the previous retrospective were you able to achieve?
	- Compared to the demo project, it has been done a better job at defining cross-cutting tasks.
	- More effort has been spent in assuring an overall more cohesive design of the application.
	- The definition of the tasks didn't lead to misunderstandigs or confusion, thanks to higher effort in the planning phase and a better synergy within the team.
  
- Which ones you were not able to achieve? Why?
	- The priority of the stories had been set before the start of the sprint, so there was no need for the team to evaluate it
	- The team ultimately decided not to dedicate its entire effort on one story at a time, as it wold have made coordination very difficult, and all the stories that had been inserted into the backlog were delivered. However, each team memeber was more willing to give up on their task to assure that stories are committed according to the priority set by the PO.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  - Apart from tasks assigned to multiple people, there hasn't been much communication among team member about the state of development. More meetings are probably needed to improve on that. Also spent more time at the beginning of the sprint to create a solid backbone between subtasks that need to be integrated in future, with definition of clear constraints on data structures and interafaces. Maybe this infos could be shared in a document easily accessible by all scrum members. This approach will save more time in the end avoiding superflous fixes in the code.

- One thing you are proud of as a Team!!
  - The team has been able to deliver all that it had proposed to at the beginning of the sprint.
