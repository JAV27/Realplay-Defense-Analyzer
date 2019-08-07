# Realplay Defense Analyzer

This project was created to parse through and analyze baseball games, giving relevant fielding data that would be hard to get otherwise. To use the the analyzer, simply select whether the team you want to track was home or away, and then paste the relevant JSON into the text box. 

It can be accessed on [github pages here](https://jav27.github.io/Realplay-Defense-Analyzer/) 


## Some Sample JSON 
To test out the project there's some sample text in the standard JSON format used at Realplay under /resources/sample.json.

## Results 

### General Info
The General Info page gives a quick overview of the game. As of now it gives number of innings, number of defensive plays by the selected team, and runs let in. As the scoring system gets more standardized and robust however, more data will be able to be added.

### Play Breakdown
The play breakdown gives a bar graph showing all the defensive plays sorted by frequency. 

### Players Breakdown
The first part of the players breakdown is the overview. This doughnut graph displays how the total amount of plays was distributed between the positions. This can be broken up even further by choosing a certain position to track. Tracking a certain player will return how many plays they had as well as what they were. 

## Tech used

The Realplay Defense Analyzer was build with:
-Vanilla HTMl
-CSS/SASS
-Javacript
-Jquery
-CanvasJS
