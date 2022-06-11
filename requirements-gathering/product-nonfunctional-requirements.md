# Product/Nonfunctional Requirements

## User Profile

First and foremost, you must understand your user. This will entirely drive the rest of the architecture experience.

For example, let's say we are building a stock trading platform.&#x20;

An amateur investor will have very different needs than a professional trader. Not only will this guide UX choices, but it will guide technical requirements.

**Amateur** users value:

* simple UX
* lots of explanation text
* a more "guided" flows
* less "bells and whistles"

From the technical requirement point of view we will be prioritizing

* Iteration speed: frameworks and libraries that allow engineers to quickly test and experiment with what works and what doesn't
* A/B testing: everything should be modual and configurable. We should be able to refactor often and quickly. There should be no hard dependencies on how components are architected
* Speed of the app/request is not a priority. We don't need ms response time to show the stock price

**Professional** users value:

* Wide feature set: they know what they're doing, and generally know what they want better than your product team does. Here the priroity is building MORE features than iterating on existing flows. We need a highly extensible system
* Legacy support: we need to make sure that there are no drastic changes to the interface when built. Always give the option to "upgrade" to the beta experience rather than forcing it onto the user. Most professional users require predictability and stability

From the technical side:

* Speed is of utmost importance. We want to make sure the load and response time is as fast as possible. This will influence our choice in libraries (Preact over React, gRPC/Sockets over REST/GraphQL)
* Lots of data: professional products often stream immense amount of data into tables and charts. This is where JS performance really comes in. We may be focusing a lot more on custom render logic, rather than using the "one size fits all" approach of ecosystem libraries



I could write a whole section on this. But other considerations are:

* **User Size**: if you are a high end SaaS company, with clients paying thousands a month, you will almost definitely have a support team. Meaning the focus is not so much on reducing bugs, but implementing a strong observability stack so that you can debug what's doing on. Scenarios will be very complex, and you can't account for everything. For example, I worked at a FB Ads company (we did ads for big companies like Uber, AirBnB, and Spotify). Our product allowed incredibly complex scenarios, which almost always resulted in some bug when you launch an ad set. That's why we had an incredible observability stack which let SDEs/Support debug what happened in those individual scenarios.
* **Users' Users**: many SaaS companies sell platforms to their users, enabling them to serve their customers. For example, I worked at a Shopify platform company, that enabled sellers to provide subscriptions to their customers. Here, you don't just have to account for your user (the vendor), but their users as well (customers)

## Current Roadmap

As a FE Architect, especially in a large org, it's rare that your management comes up to you with completely vague requirements, like "build a trading app".&#x20;

So it's very important to understand what the stakeholders already know and want before coming up with your own suggestions.

Work closely with Product Management, Design, Sales, Marketing, and of course the Backend Team to build a rough Roadmap of what the product will look like.

* Are there any specced out pages or functionality?
* What's the MVP (fewest possible features to test our concept with a segment of users)?
* What is the plan for 1mo? 6mo? 12mo?
* What are possible features that we will build down the road? We don't necessarily need to architect them just yet, but we do need to account for them in the data model
  * Ex: if I'm building a hotel booking app for one hotel, we might want to account for multiple hotels, multiple room types, chains. We won't build out the functionality just yet, but our data model will be significantly different. Data models are very tough to change later on, as opposed to FE. You may think this is BE's job, but a good FE architect is equally responsible in understanding and defining the data model to ensure that it works for her team's microservices going forward
* **What is anticipated growth in the near future:**&#x20;
  * 10x? 100x in the next year?&#x20;
  * How many initial users?&#x20;
  * Are we having a beta launch or going straight to the public?&#x20;
  * Do we anticipate a big marketing push with a spike in users?
  * These questions will help guide you as to how much you should focus on observability and testing over development speed

## Designs, Wireframes, Style Guide

I believe that FE architects should be present in the design conversation from the start. The best way to define the product and uncover the requiements is visual. The architect should sit down with the Product and Design team to sketch out initial wireframes and designs. Actually mapping out all the screens will definitely show gaps in the data architecture that you missed.

Additionally, I believe in a strong Style Guide approach from the start. A Style Guide will define common elements (inputs, modals, page structure, fonts, typeography, margins, spacing) so that engineers don't have to worry about pixel perfect design. Ideally there should be very few "design" scenarios, all defined in components. I've seen such effective design systems, that almost no CSS was needed. Not to mention it's a very fluid user experience, and complete redesigns are trivial. You don't have to hunt down the margin prop on every component.

## Refactor Strategy

Different companies approach refactoring in different ways. When I worked at the Fed, the org would plan, research, and write specs for 1-2y. Then we would spend 2-5y engineering the product. And finally we would launch it. Refactors were extremely rare. And the product was expected to be in "maintence mode" once released. That's because it had a very different kind of user requirement from most businesses.

However, for the most part, in modern SaaS companies, a "refactor often" approach, especially in the beginning is best. You don't know what the user wants unless you test it. And generally, requirements will shift significantly, especially in the beginning.&#x20;

It's important to discuss and account for refactoring time with PM. At HOVER, we had "infra sprint" once a month. As a team, we would take one week to refactor and take on infrastructural problems that would improve the team's velocity. Discussing the feasibility of such a structure is important early on.

You should also discuss with Design, how often redesigns will happen. When I worked at Accrue, we had 6, yes 6 major redesigns, before our public launch. This majorly changes how components are architectred. Not to mention, additional time should be allotted.

## Competitors

I strongly believe, whether it comes to software packages, or product itself, the best way to build is to use what others have built (obviously without any copyright infringement) as opposed to rolling your own. They already did the work, why reinvent the wheel? Before building, I would spend some time investigating the competitor's product. Taking apart each screen. Looking in the Inspector for the data structures. It will save you months of headaches for what you might have missed otherwise.

## Admin Interfaces

One part that if often forgotten is the admin interface. There's obvious focus on the customer facing app. But what about admin tools?&#x20;

Common problems include:

* **User Administration**: Deleting, Suspending, editing details
* **Billing**: all sorts of billing exceptions will occur such as refunds, pricing exceptions, etc
* **Analytics**: You really need to understand what's going on in your app. You'll want tabular data and visualizations broken down by customer and segment. This is really a topic on its own. But at the very least you may want to discuss what you may want to know about your customer
