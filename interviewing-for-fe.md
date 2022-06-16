# Interviewing for FE

Interviewing for frontend positions will vary from company to company. But here are some similarities.

Generally speaking for a Senior/Staff position you will have the following interviews.

**Please note that the following examples are just examples sourced from various interviews I've had over the years. They may or may not have been actual questions from companies. But generally follow the concepts I've seen throughout.**

## Evaluation Exercise

An evalutation exercise is generally a "LeetCode" style problem, where there are a list of requirements, progressing in difficulty. The exercise is automatically graded, based on passing tests, are you will receive a certain "score". If the score is passing, you will be directed to an onsite interview.

For frontend interviews, the problems may not be as argorithmic, but will require some basic knowledge of concepts like state management, recursion, and string manipulation. For example you may be asked to create a function that manages operations on text (appending, deleting, selecting, undoing, redoing).

## Debugging Interview

These type of interviews will test your real world debugging skills. It's a bit difficult to prepare for these, but if you've been coding for a while, it will be second nature.

You'll be given a simple app, often not written in any specific framework. Let's just say a vanilla MVC setup. It will have a list of bugs. And it's your job to trace down why these bugs are occuring.

You will use the Chrome Inspector, console.logs, debugger statements, network inspector, to trace what's going on.

At the end of the day, it's really just an exercise to see that you understand the basic flow of data in an application.

Try cloning an example [Todo app](https://github.com/tastejs/todomvc) to see how data will flow.

In the Todo app you might encounter the following bugs:

* Text is not saving to the server
* Handlers are firing multiple times
* Text is not escaping properly
* Weird CSS anomalies&#x20;

## Live Coding Interview

Here your interviewer will give you a mockup or even an open ended prompt. Your job is to develop the component in a CodePen in the language/framework of your choice (or vanilla JS). Just in case study up on the basics of vanilla JS node manipulation (setting innerHTML, css, etc).

For example, you may be asked to design a carousel component with back/forward buttons. Make sure you know how to load and traverse JSON data from the server.&#x20;

Some common features you might want to implement are:

* Waiting for images to finish loading
* Debouncing clicks (what if I click the next button a few times? Will the right image render or the one that loaded first?)
* CSS and positioning of course

## System Design Interviews

These are **crucial** to more senior level positions. They're going to test a whole bunch of hard and soft skills.

You may be given a mockup/design or you may be given a vague prompt. Your job is to describe how you would architect the app in either scenario.

If you read the rest of the pages in this book, you will find all sorts of [Technical](technical-functional-requirements/) and [Non Technical](product-nonfunctional-requirements.md) considerations.&#x20;

You generally will be asked to:

* **gather requirements**: this is SUPER important and usually what interviewers are looking for in a senior engineer/architect. You need to ask the right questions to understand what is needed for the app in the short and long term. Make sure you read the links above for an idea of what kind of questions to ask
* **discuss the high level design of the app**: what frameworks you will use, how pages and components and data flow are organized
* **drill down into specific components**. For example, let's say we are desigining a Google Calendar clone, you may be asked to describe the React components of the date bar, time bar, appointment space, how to place calendar events, concurrent events. Make sure you describe the data flow in detail, API requests, handlers
* **propose a plan**: how would you go about developing the app, start to finish. Not just technically, but how will you talk to the team, PMs. Handles releases, testing strategies.

This is a tough interview to ace, as there aren't necesseraly LeetCode-style hard skills you can practice a few days before your interview. There is no objectively right or wrong answer. Interviews are looking for signals that you can work with a team well.

I strongly suggest booking a mock interview for this and getting feedback. There are many paid services available. And I might even offer a few free mock interviews to folks applying to my new employer (Dropbox) as a thank you to those who helped me ;) If you got this far and really read through my site, feel free to reach out to me on LI.

## Behavioral Interviews

These interviews will try to gauge what you're like to work with. Engineering is not a lone 🐺 sport. You can be the smartest person in the company, but if you don't work well with others, you're worthless.

Common questions will include:

* Describe a disagreement you had with your team. How did you handle it
* What impact have you had on your team mates? Pair programming? Mentoring? Helping with personal problems. **Tell stories**. Everyone can say "oh yeah I love mentoring coworkers". But how? What actual impact have you had on your team mates?

I will write a few examples of stories in [Culture](culture.md). Also check out [Success/Failure Stories](success-failure-stories/).

## Project Deep Dive

Your job will be to describe a project where you've had the most impact. Tell a story. Draw them in. Show them that you made some interesting technical choices. That you handled conflict well. That you helped the team, and the product, and the company in major ways. Here's my [Pickle](scaling-fe-teams-my-hover-story.md) story about how I helped my company scale their FE team by creating an open source framework.

For these interviews you might have one interview for the technical side (mostly asking architecture questions). And one interview by an EM, asking culture questions.



And that's about it :) Good luck!
