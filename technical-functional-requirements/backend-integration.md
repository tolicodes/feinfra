# Backend Integration

## Todo

* Am I designing Backend? Or Just FE?&#x20;
* API&#x20;
  * Already written? Writing together with BE? Proposing?&#x20;
  * Protocols: Sockets? REST? GraphQL? GRPC? Mix of each (REST for one time info, Sockets for Stock Prices)&#x20;
* Error Handling&#x20;
  * Retry Mechanism?&#x20;
  * Messaging to the user&#x20;
* Long Async Requests&#x20;
  * Ex: Buy operation that may take 1+ minutes, chunked buy (buy shares as they become available)&#x20;
  * Push messaging when operation is complete, email, think about this flow Multi Day operations - clearing of funds (prob email)&#x20;
* Interaction with BE&#x20;
  * Something like OpenAPI/Swagger to sync on documentation/API contract&#x20;
  * Generating TypeScript Types from OpenAPI&#x20;
  * Are we synching API versions between releases?&#x20;
  * Make sure FE is released at same time as corresponding BE Major releases.&#x20;
  * Minor releases? Breaking API releases?&#x20;
  * How do we make sure nothing breaks as BE changes?&#x20;
  * Integration testing strategy
  * Postman
