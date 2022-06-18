# Interviewing for FE

Interviewing for frontend positions will vary from company to company. But here are some similarities.

**IMPORTANT: the following examples have been sourced and adapted from various interviews I've had over the years. They are not meant to give you "insider info" on any one company, but rather give you a sense of how to think. They are not meant to give you an unfair advantage over others, but rather let you showcase your skills to your potential employer. Good Luck!**

The info below mostly deals with FE interviews. For BE/FS expect more algorithmic/LeetCode questions.

## Expectations Based on Level

The main difference between interviews would be:

* **Junior**: testing for quantitative measurements of you coding ability. You don't have any real experience to point to. But you can study up on LeetCode. Generally problems will be graded on your abililty to study for these types of questions
* **Mid**: expect more interviews aimed at your organization skills (how to architect a simple component, such as an image slider). You will also be asked about your past experience. The main thing to focus on is ability to learn and handle conflict. You will be expected to take ownership of a feature.
* **Senior**: you are expected to showcase your leadership abilities. Mentoring others, pair programming. Having responsibilites such as leading the team, making technical decisions, and having ownership of a project (or lead a small team)
* **Staff**: you are expected to do all the above, but lead on a cross-team level. Meaning you owned implementation across projects. Main signals will come from System Design interviews and ability to solve open ended problems
* **Principal+**: no idea :) I'll tell you when I get there!



**Quick Hack**: If you are interviewing for a certain leveling (ex: IC3), ask the recruiter for the level description. It will list a bunch of bulleted items about what they're looking for. Focus on showcasing those items.

****

Generally speaking for a Senior/Staff position you can expect the following interviews.

## LeetCode/Evaluation Exercise

An evalutation exercise is generally a "LeetCode" style problem, where there are a list of requirements, progressing in difficulty. The exercise is automatically graded, based on passing tests, are you will receive a certain "score" (ex: 500/1000). If the score is passing, you will be directed to an onsite interview.

For frontend interviews, the problems may not be as argorithmic, but will require some basic knowledge of concepts like state management, recursion, and string manipulation.&#x20;

For example, one of my favorite FE problems is [implementing a text editor](https://leetcode.com/discuss/interview-question/860501/Text-Editor-Implementation). In this problem, you are asked to create a function that manages operations on text (appending, deleting, selecting, undoing, redoing). It doesn't require LeetCode-style knowledge (binary trees etc). But it will test your ability to iterate on a problem and still keep your code clean.

The key to solving these problems it to take it step by step. Write custom tests as you go along to ensure you don't break anything from the previous requirement.

So if I were writing tests I would make the following:

* allows to append a string
* handles an empty string while appending
* allows to delete from the end of the string
* allows to select at the beginning of the string
* allows to select at the end of the string
* allows to select in the middle of the string
* allows empty selection
* allows to delete selected string (at the beginning, middle, end)

Make sure you always handle edge cases.

Seperate out code into the smallest functions you can, and pass in only the relevant state the function needs.

Most importantly, don't try to make your code perfect and give yourself 10 minutes at the end to clean up. Since these tests are automated, you want to make sure you have a working version of your code for all the requirements you've solved. 750/1000 becomes 0 if you have a last minute runtime error. Don't worry if you haven't solved all the requirements. The passing score for these types of prompts may be as low as 50%.

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
* Layout of all the components
* How handlers work (do you make API calls in your individual components? page level? a store? context?)
  * hint: Redux may not be the best choice here, as it requires a lot of boilerplate and you only have an hour. However make sure to mention that irl you will use a different state store than your example

## System Design Interviews

These are **crucial** to more senior level positions. They're going to test a whole bunch of hard and soft skills.

You may be given a mockup/design or you may be given a vague prompt. Your job is to describe how you would architect the app in either scenario.

If you read the rest of the pages in this book, you will find all sorts of [Technical](technical-functional-requirements/) and [Non Technical](product-nonfunctional-requirements.md) considerations.&#x20;

Note that depending on the level you are applying for, you'll .&#x20;

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

Your job will be to describe a project where you've had the most impact.&#x20;

**Tell a story.** Draw them in.  Make them live what you went through. There is a wide variety of how you can describe an accomplishment. For example you can say "I wrote a testing framework". Not very special. Or you can tell the story of how frequently bugs happened. How customers compained. How everyone struggled. How the team tried and failed to implement other approaches. And then you come in and save the day!&#x20;

I read a book on storytelling a while back and it changed my world. It referred to the "[Hero's Journey](https://tvtropes.org/pmwiki/pmwiki.php/Main/TheHerosJourney)" trope. Most captivating stories use it. And you can turn even the most mundane technical accomplishment into an amazing story.

![](<.gitbook/assets/image (1).png>)

Show them that you made some interesting technical choices. That you handled conflict well. That you helped the team, and the product, and the company in major ways.&#x20;

Here's my [Pickle](scaling-fe-teams-my-hover-story.md) story about how I helped my company scale their FE team by creating an open source framework.

For these interviews you might have one interview for the technical side (mostly asking architecture questions). And one interview by an EM, asking culture questions.



And that's about it :) Good luck!
