# Technical/Functional Requirements

This is really the main job of the FE Architect, gathering as much information on technical requirements as possible, before the team starts building. This is an enormous topic which is very specific to the type of app you are building. I will go through some common conciderations, as well as a few types of common apps.

The requirements for a FE App are very different than a BE service. Yet you will closely interacting with the BE team on many considerations.

## Performace

Contrary to BE considerations, performance may not be the main thing to optimize for. Instead, on the FE, most optimizations lean towards speed of iteration.&#x20;

There are of course exceptions, when dealing with low latency systems (pro trading) and a variety of clients (slow mobile connections).

Here are some general requirements that will help you architect a solution:

* **Response Time:** What is the expected response time for various events. For example, for low latency systems such as trading terminals, you will want to use sockets of gRPC, which don't have much of the overhead of REST and GraphQL. On the flipside, such protocols aren't as advantageous for APIs that will evolve very quickly
* **First Load Speed**: What is the expected time to first load? For example, are we dealing with a blog, where users are impatient and may navigate away after more than a second or two of load time.
  * **Chunking**: Webpack allows "chunking" the app into segments. So your preferences screen may be asynchronously loaded when you navigate to it. This is a great approach to reduce load time. However, it will increase load time in between pages (as opposed to loading up your app all at once)
  * **Max Page Size**: With the Node ecosystem, it's very easy to have bundle sizes in the megabytes. Which are no problem for gigabit LAN connections, but will cause issues on unreliable cellular connections. If lower page sizes are needed, you may want to opt for smaller libraries, or a few other strategies I will suggest below. I will discuss the tradeoffs of each strategy

Improving Performance

* **Monitor Package Sizes**:&#x20;
  * **VSCode**: the [import cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) VSCode plugin will easily show you the size of your individual packages in your IDE, allowing you to instantly see the impact of packages on your bundle.&#x20;
  * **CI**: You may also want to set up a [linter](https://github.com/ai/size-limit) for the package size in CI to make sure your bundle doesn't get too out of control.
  * **Graph**: The [webpack analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) provides a cool interactive graph showing you not only how big your deps are, but the files in your app
* **Alternative Libraries**: Many mainstream libraries (React) will have great features, ecosystem, and support for various scenarios. But they come with a large package size. You may want to investigate alternatives if package size is an issue. For example Preact > React. Note that you may lose the advantages of realiability, ecosystem, and support if you opt for these libraries. So don't make this tradeoff prematurely.&#x20;
  * You may also opt to use modern JS browser APIs in lieu of legacy libraries. For example, for date and currency formatting you might get away with the the built in functionality (like [toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Date/toLocaleString) or [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Intl/NumberFormat)) as opposed to moment.js or currency.js. But note that these APIs offer a much smaller range of supported options.
* **Tree Shaking**: Many libraries offer "tree shaking" support. Meaning webpack will identify which functions you are using, and only include these pieces of the code. This is a somewhat experimental feature, as many libraries are architected in ways where functionality may break. Generally speaking, functional as opposed to class based libraries will support tree shaking more. If you are building a lot of common libraries you may want to read the Webpack [docs](https://webpack.js.org/guides/tree-shaking/) for how to enable tree shaking.



Improving Build Speed

* Yarn Cache
* Docker image cache
* Webpack Optimization
* Sourcemaps?
