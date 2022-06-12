# Design System & Common Components



* Go through app and other apps in the org to implement a common component library with help of Design and PM\
  \* Style Guide - Typography (H1s, Paragraphs, etc)
  * Loading Fonts - preloading, Google Fonts or host/package, default fonts before font is loaded?
    * Causes reflow if we didn't load font
    * Try to limit amount and weights of fonts
  * CSS Handling
    * Styled Components
    * Reset CSS
    * Less?
  * Common Colors, padding, spacing, fonts for elements
    * Ideally very little variation on these values, so you don't have to worry about pixel perfect designs and everything looks super consistent, and if we decide to do a redesign it's very simple, don't have to change values everywhere
  * Buttons and Common Elements
    * Buttons - no double submits by default esp with finance operations, block onClicks if in Loading State, have a loading state
    * Selects
    * Autocompletes
  * Go through Google MUI and make sure we have relevant elements for our Style Guide
  * Forms, interaction, validation, submitting
  * Modals and Dialogues
  * Error Toasts or bars or error dialogues
  * Confirmation dialogue/flow for deleting, buying, and other dangerous/permanent operations should be consistent - important for financial
  * Infinite Scrolling components like transaction lists and search results
  * Loading spinners
  * AJAX search - debounce
  * Auth Wrapper - Allowing/disallowing access to pages
  * Autofills for address - Google Maps
  * Phone verification - Twilio
  * Packaging
    * Create React App?
    * Webpack?
    * And customizations needed?
  * Linting
    * ESLint
    * Airbnb rule set
  * Common approach for Charting warrants a whole discussion
    * HighCharts?
    * How do we deal with time series
    * How do we deal with candlesticks
    * How do we load data?
    * How do we deal with filtering for time segments? Reloading data? Caching Data?
    * Probably separate this into its own library eventually so that it can be used and developed independently from this app
  *
