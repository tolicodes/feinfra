# Trading System

## Screens

Go through success, loading, all expected/unexpected error states, empty states, multiple page stages for each component

### Nav

* Links to each major page
* Use React Router

### Login/SignUp (/auth)

* Using Passport or provider like Auth0 or Okta (recommended because it takes care of a lot of security, logging, etc)
  * OAuth?
  * Twilio for 2FA?
* Signup flow
  * Discuss with marketing and PM
  * FB Ads/Google Ads tracking for conversions
* Able to see the stocks page before signup? Any other pages? What are protected pages?
  * Limited dashboard view?
  * Clicking "Buy" starts the signup process
    * What does copy/screen look like? Same as regular flow?
* What is the expected conversion funnel?
  * What is strategy for testing use segments for conversions
* Profile Creation
  * risk tolerance, favorite stocks, etc
  * How does this affect features shown to the user?
  * Feature Flagging

### Settings

* Add Bank Account
* Fund Bank Account
* Close Account
  * Needs Flow for retention
* Account Stats
* Statements (links to pdfs)
* Logout

### Add Bank Account (/bank/add-bank)

* Available on initial sign up and afterwards from Settings page
* Using Plaid?
* KYC? Uploading Docs?
* Multiple Accounts?
* Verification? Deposits? Emails that it's verified?
* Custodial Account - something like Unit?

### Deposit/Withdraw Funds (/bank/deposit)

* Display Clearing Time
* Amount of Cash in Account Now, Cash Pending
* Choose Account Source (for multiple accounts)
* Allow adding cash amount
  * Validation (Min, Max?)
* Current Transfers? Multiple Transfers ok?
* Check if $ in account
* Display when deposit will clear
* Send email when deposit clears
* Withdraw Funds
  * pick bank account
  * Validation (too much)
  * Display pending withdrawals and estimated time
  * Email when complete
* Error if it fails
  * Not enough $?
  * Other
* Handling bouncing back of funds after clearing?
  * Selling stock, etc, talk to legall

### Dashboard (/)

* Portfolio Over Time Graph - HighCharts
  * Filter 1D, 1W, 3M, 6M, 1Y, ALL
* Portfolio Total Worth
* Account Cash Available To Buy
* Your Stocks
  * List
  * Shares Owned
  * Current Stock Price
  * Current Position $
  * Up/Down over last day
  * Sort By Up/Down in last day, amount
  * Click on stock goes to stock page
  * Basic Line Chart over last 1m
* Favorite/Watched Stocks (didn't buy yet)
  * Same metrics (- owned)
* Stock Search
  * Autocomplete with AJAX call
  * Click on stock goes to stock page
* Stocks By Category
  * List of Categories
  * Click in, lists top stocks

### Stock Page

* Graph over last year
* Candlestick vs Line
* How much of the stock you own
* Stats on stock (highs and lows)
* Company history and blurbs
* News feed
* Follow stock
* Buy stock
* Buy/sell history
* Recommended related stocks
* Operations
  * Buy: text for how many shares, auto update cash needed, validate that it's not too much
  * Sell
  * Limit
  * Schedule a future purchase
  * Account for pending transactions
  * Confirmation Email

### Search for stocks

* AJAX Search
* Works like the one in portfolio, probably using same(ish) component
* Filters like category

### History

See history of transactions

### Other

* Explanations of trading
* Ancillary pages
  * Help and contact
  * Legal pages
* Landing Pages? Home Page?

##

* ## Models
  * auth: Describes the authorization object, follows Passport or Auth0 standards
  * bank: Describes user's bank account, such as routing, balance, and status information
  * stock: Describes a stock, including current price,
  * portfolio: Describes
    * stocks: in the user's portfolio (stock object)
      * ownershipDetails: additional info on stock related to user (average bought price, total value
    * portfolioStats: describes the portfolio as a whole (stock value, cash value)
  * portfolioHistory: lists the ups and downs of a portfolio over time
  * transactions: Lists transactions a user made
    * doTransaction: allows to perform buy/sell etc txn
  * profile: user details and administrations

##

## API Structure

### Common

#### Standard Errors/Codes:

* 200: OK, JSON Response
* 500: Server Error (retry 3x automatically, then fail)
* 404: Resource not found
* 403: Unauthorized (redirect to Auth Screen)
* 400: Known error message (display via Toast)

#### Common Standards

* Pagination
  * Results Pointer
  * With offset, if new items are added, it will miss results
* Query Params
  * Arrays Serialization
* Wrapping 1st level objects
* Retry Mechanism
* Request Tracing (Datadog)

### /api/auth

Standard Passport Authentication returning JWT

### /api/bank/accounts

GET

* \[]
  * uuid
  * bankName: Chase
  * bankRouting: 0000009
  * bankAccountLast4: 0323
  * status: CONNECTED | AWAITING\_VERIFICATION | INVALID | FROZEN
  * bankBalance: 32000

POST (follow Plaid's Docs)

DELETE

Query Params:

* uuid

Res:

* 200: Deleted

### /api/stocks

Describes a stock, including current price,

GET

Query Parms

* searchString
* category: Tech | Education | ...
* Page

Response

* uuid
* tickerSymbol
* stockName
* stockPrice
* metadata
  * companyDescription
* stats
  * lastYearsProfits

### /api/portfolio

Used for displaying the user's stock portfolio and basic details

GET

* cashBalance: 10000
* buyingPower: 20000
* currentStockValue: 20000
* ownedStocks\[]:
  * uuid
  * stock
    * uuid
    * tickerSymbol
    * stockName
    * stockPrice
    * metadata
      * companyDescription
    * stats
      * lastYearsProfits
  * ownershipDetails
    * amountShares
    * currentValue

### /api/portfolio/portfolio-history

* \[]
  * date: 2021-06-07 10:00
  * value: 19000

### /api/transactions

GET

* \[]
  * triggerDate
  * settlementDate
  * type: STOCK | ACH
  * subType: BUY | SELL | LIMIT WITHDRAWAL | DEPOSIT | BOUNCEBANK
  * status: pending | settled | failed
  * triggeredBy: USER | SYSTEM (margin call)
  * stockDetails
    * dollarAmount
    * stockAmount
    * stockPrice
  * transactionRules
    * type: LIMIT | BUY
    * limitPrice: 300
*
