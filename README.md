A contribution to the Level-Up Society Hackathon by Janusan Lingeswaran, Philipp Kant, Romelo Gilbert, Mohammad Patel and Radhhicka Kishorpouria.
The overall theme of the hackathon is, as the name suggests, leveraging gamification to improve society. We have chosen the area of learning.
# Motivation
A 2011 study (DOI:10.1016/j.system.2011.01.009) shows that intrinsic motivation for learning generally declines in participating students from third to sixth grade.
Another paper (DOI:10.1016/j.sbspro.2014.08.287) shows that rewards are not harmful, but that there is some relationship between external motivators and task oriented motivation. Rewards are viewed as primarily beneficial, rather than constraining, to human freedom and independence. Some research has shown that
the dichotomy between extrinsic and intrinsic motivation is unnecessary, even unacceptable.
# Learn City
This gave us an idea to make learning more fun and playful for elementary school students to increase motivation through gamification concepts:
Learn City, a virtual city representing a school class.
Each student can create his own character. Customization is an important gamification concept, especially for children.
Each school subject that the teachers have set gets its own building. In these buildings there are regular lessons, tasks and tests to get experience points or an in-game currency. 
This, in turn, can be invested in items, such as clothes to customize the character as desired and, above all, furniture for your own apartment. In the apartment building, all the students' apartments can be found and everyone can visit and admire each other's furniture.
We tried to pick up as many gamification concepts as possible and integrate them in a natural way into Learn City. In doing so, we followed the list provided by gamified.uk (https://www.gamified.uk/user-types/gamification-mechanics-elements/).
We used the following concepts:
- Theme → The class is a virtual city with buildings for subjects. Every student has their own apartment.
- Personalization + Virtual Economy + Investment + Collect & Trade + Gifting / Sharing → Own Avatars + an in-game currency which you earn by doing tests successfully etc. to buy  clothes, vehicles and furniture to improve your own apartment. Items can be traded and gifted to friends.
- Progress / Feedback → The students get EXP for doing tests.
- Loss Aversion + Consequences → The students have to reach certain levels/progress every week. The students lose money/EXP if they don’t.
- Curiosity / Mystery Box → If the students finish a chapter, a mystery box will appear. They can win money or items.
- Time Pressure → Final Tests (at the end of a chapter) have countdowns
- Scarcity → Some items are very rare/expensive.
- Random Rewards → For every day a student enter the game he will get a random reward
- Leaderboards / Ladders + Badges / Achievements → Leaderboards for every subject + overall. Badges if a student is the best in a week or completes a test/task very well (Gold for 90%, silver for 80%, bronze for 70%)
- Meaning / Purpose → Semester goal for the whole class. If the whole class reaches (all levels added together) a certain level in the semester, they will go eating ice cream at the end of the semester


# Deployment
To run the project, do following steps :
1. git clone the project https://github.com/EinGuterWaran/LearnCity.git
2. Run "npm install" inside the folder
3. Run "npm start" to start the server
4. Go to "http://localhost:8080/elevator.html" on browser
## Entering the apartment
To enter the building you will first have to go into the elevator and then select a room, once you select a room it will take you directly to your room, where you will be able to move around. In order to see the badges you have obtained in the game, you may click the board on the right hand side of the screen to view your badges. 

## View the challenges/games
Open the page: http://localhost/LearnCity/subjects/index.html?s=mathematics
To change the topic edit the parameters in url:
You may do:
?s=mathematics
?s=english
Then you can the select the challenges you want to do.



