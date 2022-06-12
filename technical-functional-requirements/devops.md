# DevOps

## Configure CI/CD pipelines

* Testing
* Deployment to appropriate environments
* Rolling Back

## Time Requirements

* Should take < 10m? Would require optimization on tests?
* Optimizing Build,

## Source Maps

* Do we want include source maps? In staging? Production
* Will it work with Sentry for error tracking

## Cloud/Local?&#x20;

* K8S? Etc?
* Migrations of data (mostly for BE, but should FE be aware/interact somehow)

## Environments

* Prod/Dev/Staging/Local environments
* Auth for each - Auth0
* Permissions to push to each via GitHub
* GitHub flow for merging and promoting app through environments
* Restrict push to main/staging (CI passes, # of approvals)

## Dockerize

* Dockerize local Env with mock backend or seeded backend or shared staging backend
  * Give DB access to add fake data on your own for FE devs for local integration testing

## Status Tracking

* Notify users what status of servers is, outages, 404 pages, 500 pages
* Independent from main service
* PagerDuty if something goes down for fast responses

## Mono Repo? Separate Repo? Component Repos?

* Do we separate out different parts of the app - admin vs public pages vs user frontend?
* Makes the app a lot more modular, forces to code in a self-contained way
* Slightly decreases dev speed
* Do we separate out components - charting etc for use in other apps

## Error Message strategy

* Codes? Contact links? Logging? How do we display? Standardized Language
* Separate environments for logging and error tracking (Datadog, Sentry)

## Testing Strategy

* Unit - Jest
* Ability to add seed data, API calls to seed data
* Common Scenarios to seed data
* Parallel Tests - different containers for parallelization in CI to avoid data race conditions
* Integration - with and without BE
* Mocking APIs (faster, doesn't account for actual state of API)
* Cypress
* Selenium
* Pickle/Cucumber
* Visual Regression Testing
* Chromatic
* Browser/Mobile Testing
* BrowserStack

## Logging/Observability Strategy

* DataDog
* What do we want to log
* Details every part of system with spans
* Sensitive info scrubbing
* User profile tracking
* Access controls for logged information
* Logging across BE/FE, ray tracing
* Start with FE API request, and then see what happened on the BE
* Configure Useful Views in Sentry/Datadog
* Analytics - Looker
