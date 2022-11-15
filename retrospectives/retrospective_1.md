TEMPLATE FOR RETROSPECTIVE (Team ##)
=====================================

The retrospective should include _at least_ the following
sections:

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

**Remember**a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics

| Story          | # Tasks | Points | Hours est. | Hours actual |
| -------------- | ------- | ------ | ---------- | ------------ |
| _#0_           | 6       |        | 32         | 21           |
| Browse hikes   | 4       | 8      | 10         | 11.5         |
| Describe hikes | 5       | 5      | 16         | 27.83        |
| Register       | 5       | 13     | 14         | 13.33        |
   

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
  - Estimated hours per task: 72 / 20 = 3.6
  - Actual hours per task: 73.66 / 20 = 3.683
  - Estimated standard deviation: 2
  - Actual standard deviation: 3.66
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1
  - 72 / 73.66 -1 = -0.023

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated : 7h
  - Total hours spent : 7h 40m
  - Nr of automated unit test cases : 8
  - Coverage (if available) :
- E2E testing:
  - Total hours estimated : 7h
  - Total hours spent : 5h 10m
- Code review 
  - Total hours estimated : 8h
  - Total hours spent : 5h 10m
  


## ASSESSMENT

- What caused your errors in estimation (if any)?

We tried our hands on a new technology, hoping it would have made it easiser to implement some tasks (and it did), but it also brought
many unexpected problems that required a lot of time to solve. This made us spend a lot more time than expected on some tasks

- What lessons did you learn (both positive and negative) in this sprint?

New techonlogy can make seemingly complicated tasks very straightforward, but it can also introduce issues that complicated tasks originally
taken for granted


- Which improvement goals set in the previous retrospective were you able to achieve?

	- Compared to the demo project, it has been done a better job at defining cross-cutting tasks.
	- More effort has been spent in assuring an overall more cohesive design of the application.
	- The definition of the tasks didn't lead to misunderstandigs or confusion, thanks to higher effort in the planning phase and a better synergy within the team.
  
- Which ones you were not able to achieve? Why?

	- The priority of the stories had been set before the start of the sprint, so there was no need for the team to evaluate it
	- The team ultimately decided not to dedicate its entire effort on one story at a time, as it wold have made coordination very difficult, and all the stories that had been inserted into the backlog were delivered. However, each team memeber was more willing to give up on their task to assure that stories are committed according to the priority set by the PO.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

> Propose one or two

	- Apart from tasks assigned to multiple people, there hasn't been much communication among team member about the state of development. More meetings are probably needed to improve on that.

- One thing you are proud of as a Team!!

The team has been able to deliver all that it had proposed to at the beginning of the sprint.