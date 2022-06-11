# Technical/Functional Requirements

This is really the main job of the FE Architect, gathering as much information on technical requirements aszx possible, before the team starts building. This is an enormous topic which is very specific to the type of app you are building. I will go through some common conciderations, as well as a few types of common apps.

The requirements for a FE App are very different than a BE service. Yet you will closely interacting with the BE team on many considerations.

## Performace

Contrary to BE considerations, performance may not be the main thing to optimize for. Instead, on the FE, most optimizations lean towards speed of iteration.&#x20;

There are of course exceptions, when dealing with low latency systems (pro trading) and a variety of clients (slow mobile connections).

Here are some general requirements that will help you architect a solution:

* **Response Time:** What is the expected response time for various events. For example, for low latency systems such as trading terminals, you will want to use sockets of gRPC, which don't have much of the overhead of REST and GraphQL. On the flipside, such protocols aren't as advantageous for APIs that will evolve very quickly
* **First Load Speed**: What is the expected time to first load? For example, are we dealing with a blog, where users are impatient and may navigate away after more than a second or two of load time.
  * **Chunking**: Webpack allows "chunking" the app into segments. So your preferences screen may be asynchronously loaded when you navigate to it. This is a great approach to reduce load time. However, it will increase load time in between pages (as opposed to loading up your app all at once)
  * **Max Page Size**: With the Node ecosystem, it's very easy to have bundle sizes in the megabytes. Which are no problem for gigabit LAN connections, but will cause issues on unreliable cellular connections. If lower page sizes are needed, you may want to opt for smaller libraries, or a few other strategies I will suggest below. I will discuss the tradeoffs of each strategy
* **Mobile App Considerations**: Often times there will be a significant variation for the mobile vs desktop experience. While it's very convenient to maintain them as one app, sometimes the mobile experience could benefit from a smaller package size due to the cellular connection. There are many strategies to get the best of both worlds, such as sharing a common code library with tree shaking (ex: buttons, style guide, API handling) and chunking by route
* **\[T] Dataset Size**:&#x20;
  * Do we anticipate any huge datasets to be rendered (thousands of history rows somehow) Ex: progressive tables, google photos

Improving Performance

* **Monitor Package Sizes**:&#x20;
  * **VSCode**: the [import cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) VSCode plugin will easily show you the size of your individual packages in your IDE, allowing you to instantly see the impact of packages on your bundle.&#x20;
  * **CI**: You may also want to set up a [linter](https://github.com/ai/size-limit) for the package size in CI to make sure your bundle doesn't get too out of control.
  * **Graph**: The [webpack analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) provides a cool interactive graph showing you not only how big your deps are, but the files in your app
* **Alternative Libraries**: Many mainstream libraries (React) will have great features, ecosystem, and support for various scenarios. But they come with a large package size. You may want to investigate alternatives if package size is an issue. For example Preact > React. Note that you may lose the advantages of realiability, ecosystem, and support if you opt for these libraries. So don't make this tradeoff prematurely.&#x20;
  * You may also opt to use modern JS browser APIs in lieu of legacy libraries. For example, for date and currency formatting you might get away with the the built in functionality (like [toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Date/toLocaleString) or [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Intl/NumberFormat)) as opposed to moment.js or currency.js. But note that these APIs offer a much smaller range of supported options.
* **Rolling Your Own Libraries:** In general, there are very few scenarios where you might want to roll your own library, unless you have a very specific use case. The React community has optimized for every major use case of rendering standard components. You can most likely build on top of it rather than rewriting it.&#x20;
  * **Special Requirements**: However there are a few scenarios where standard libraries are not enough. For example, working at HOVER, we built a custom 3D Rendering library (on top of ThreeJS), because we had extremely specific needs, and there simply was nothing out there that covered those needs (for example ray tracing in the browser). Yet it still leaned heavily on ThreeJS when possible.&#x20;
  * **Performance**: There may be some very high performance scenarios where standard libraries aren't sufficient. For example, charting and graphing come to mind. Standard tables will eat up all your memory when dealing with thousands of rows that need to be rendered at once. Likewise for charting. HighCharts does a great job, but may not be feasible if you have hundreds of charts on a dashboard. Remember to consider these requirements
* **Tree Shaking**: Many libraries offer "tree shaking" support. Meaning webpack will identify which functions you are using, and only include these pieces of the code. This is a somewhat experimental feature, as many libraries are architected in ways where functionality may break. Generally speaking, functional as opposed to class based libraries will support tree shaking more. If you are building a lot of common libraries you may want to read the Webpack [docs](https://webpack.js.org/guides/tree-shaking/) for how to enable tree shaking.&#x20;
  * Often times you can import just a portion of a package (ex `underscore/map` instead of `underscore`)
* **Functional vs Object Oriented**: There is a lot of debate over which coding style is "better". And there certaintly are pros and cons to both, which I will go into later. However, when it comes to bundle sizes, functional will usually win out. It forces a style of few dependencies, and small objects. You will usually export individual functions as opposed to huge classes, which will enable tree shaking
* **SSR and SSG**: Server Side Rendering is a great way to speed up that first load.
  * Many common frameworks such as React will have tooling to help you do SSR (ex: Next.js with [Vercel](https://vercel.com/?utm\_source=google\&utm\_medium=cpc\&utm\_campaign=16369030002\&utm\_campaign\_id=16369030002\&utm\_term=nextjs\&utm\_content=139376545808\_584248847641\&gclid=Cj0KCQjw-pCVBhCFARIsAGMxhAcaezmP8ujQ5VnQdMoNoEtrNz0hnbSTm7W6NQFzSEXiJc3rICDqbSwaAp3TEALw\_wcB)). Note that there are downsides to SSR, such as making sure that all of your components and pages render properly on the server side. It definitely takes quite a lot more checking around.&#x20;
  * An additional benefit of SSR is SEO by Google, Bing, etc
  * SSG (Static Site Generation) includes tools like [Gatsby](https://www.gatsbyjs.com/) which pre-generate static HTML pages. This may not be applicable to many scenarios which require generation on the fly, but for blogs and other more or less "static" pages this is perfect
* **Don't Put Marketing Pages In Your Main App**: Your site will likely include many "marketing" pages, such as the home page, feature pages, help, contact, blog, etc. These pages tend to change very frequently in terms of content and design. But require no real "JS" functionality. Meaning by having your core app team work on marketing pages you are taking away from their time to work on the app. Additionally you are bloating your bundle size. And a lot of FE tooling is optimized for static content. Instead I recommend tools like Webflow and Squarespace where non-technical users can easily make copy changes. Additionally a Webflow engineer is significantly more affortable than an application engineer
* **Progressive Rendering/Loading**: One way to speed up the time to first load is to render elements as the data becomes available



## Todo

* **\[T] Performace Analytics/Performance Monitoring:**
  * Perf-analytics-fe Google Performance API Just log manually Datadog
* Images
  * Image optimization - different sizes Retina Display (2x) Alt Text srcset (multiple image sizes)
  * Lazy load images
* Serving over HTTP2 vs HTTP1 - compatibility, fallback
* CDN - something like CloudFront? Akamai? Do we need multiple edge locations? Where are our users located?
* Caching - latest info each time or slightly outdated ok? Latest - huge network usage Cache - might be slightly outdated Browser caching, cache busting LocalStorage Cookies or LocalStorage for Auth
* Server Side rendering for public pages? Google optimization
* What metrics are we optimizing for
  * Track metrics&#x20;
* Load on Server&#x20;
  * If doing SSR, more load on the server, are we using a separate server? Same server?&#x20;
  * Load balancing for failover K8S cluster for server app?&#x20;
  * For SSR app?&#x20;
  * Lambda @ Edge?&#x20;
  * Lots of API requests = too much load on server?&#x20;
  * Or do we want the latest info all the time?&#x20;
  * Microservices for FE, so that one app doesn’t affect another&#x20;
  * Progress Web App?&#x20;
    * Offline mode&#x20;
    * No internet connection

User Experience Tracking

Usage Metrics Talk w/ Marketing and PM about tooling to keep track of metrics Usage of app: Mixpanel, Fullstory Errors, Logging: Datadog, Sentry Marketing: Google Ads, FB Pixel Feature Flagging: LaunchDarkly - feature flagging conversion tracking or segments Feature Flagging LaunchDarkly Are we turning on features slowly? One by one? For specific segments? By type of user? Blue/Green Deploys Rolling back deploys strategy? Horrible error? Automatically track errors and roll back? A/B testing using feature flags, collect metrics on what does better



## \[T] Improving Build Speed

* Yarn Cache
* Docker image cache
* Webpack Optimization
* Sourcemaps?
