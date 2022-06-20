# Development Roadmap

How to approach the dev process, start to finish



* **Get the Team Onboard**: Go through general plan with PM, Designers, and rest of Team. What do they already have in mind?
* **Data Architecture**: Go through proposed data architecture with the BE Team. We will probably write out the API contract in Swagger to make sure it roughly lines up with the feature plan
* **MVP Design Review**: work with Design team on the wireframes/design for the components we will be building out for the MVP. Have stakeholders check off on that. At least have a rough sketch to get started approved by PM/Design
* **Dev Conventions/Boilerplate**: Go through general conventions like error codes, authentication, query Param formats, common models, rough DB table diagram
* **Conversion/Tracking Strategy**: Go through tracking and conversion strategy with PMs/marketing (Mixpanel, etc)
* **Propose Stack**: Ask around - what is the proposed stack in the rest of the org, use that. Otherwise below is my standard stack
  * If there is a migration strategy from an older stack in progress, ask how to fit into that
* Does the company have some sort of UI Kit/Style Guide/Common Components library
* Start building individual components using Storybook
  * Discuss style guide with design teams - how do general components look like and interact, build that out first (examples below)
* Each component is self contained and built for modularity, doesn't require API, uses handlers for async requests passed down from page level, accepts mock data, all possible states listed including errors and empty
* Integration testing with Cypress/Pickle - write out the tests as scenarios before building, and then make component fit those scenarios
* Unit test (TDD) with Jest
* Tech Stack:
  * Discuss performance vs features tradeoff of each library we use and individual performance aspects
    * Consider libs that have tree shaking
    * Fallbacks to old technologies
  * React (Hooks)
  * Next.js - SSR
  * TypeScript - for generating types, avoiding errors, auto-documentation
  * GraphQL or REST (axios), Socket.io for streaming data
    * GraphQL handles complex relationships efficiently but has tradeoffs
    * POST requests don't cache (GraphQL uses)
    * Adds complexity, makes bundle slightly bigger, sometimes increases dev time
    * GraphQL has typing built in, but if you use OpenAPI also has types generation
  * Auth - Passport.js
  * Styled Components or MUI
  * Next.js or React Router
  * React Forms - validations etc
  * Moment - dates
  * HighCharts - charts
    * Uses SVG so not as fast, but very complete and has lots of docs
  * Redux - complex state management
    * Usually Context is enough
  * ESLint - linting
* CI/CD
  * GH Actions or CodeFresh (great for K8S)
  * K8S or Netlify for hosting
  * Commitizen - commit messages
  * Release tagging
  * GH Merge process (how many reviews, standards)
  * Static code checking - Sonar
* Discuss Sockets strategy - message format etc
* Project Management
  * Sprints - 2w?
  * Write out user stories before starting
  * Tracking velocity
  * Assigning tasks
  * Pair programming to get engineers started
  * Pair programming philosophy
  * Architecture sprint - refactoring (1x a month)
