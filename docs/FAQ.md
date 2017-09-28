| **Script** | **Description** |
|----------|-------|
| prestart | Runs automatically before start. Calls remove-dist script which deletes the dist folder. This helps remind you to run the build script before committing since the dist folder will be deleted if you don't. ;) |
| start | Runs tests, lints, starts dev webserver, and opens the app in your default browser. |
| lint:tools | Runs ESLint on build related JS files. (eslint-loader lints src files via webpack when `npm start` is run) |
| open:mocks | Runs Mock standalone server (default port is 3002) on localhost
| clean-dist | Removes everything from the dist folder. |
| remove-dist | Deletes the dist folder. |
| create-dist | Creates the dist folder and the necessary subfolders. |
| prebuild | Runs automatically before build script (due to naming convention). Cleans dist folder, builds html, and builds sass. |
| build | Bundles all JavaScript using webpack and writes it to /dist. |
| test | Runs tests (files ending in .spec.js or .test.js) using Jest and outputs results to the command line. Watches all files so tests are re-run upon save. |
| test:cover | Runs tests as described above. Generates a HTML coverage report to ./coverage/index.html |
| test:cover:travis | Runs coverage as described above, however sends machine readable lcov data to Coveralls. This should only be used from the travis build! |
| analyze-bundle | Analyzes webpack bundles for production and gives you a breakdown of where modules are used and their sizes via a convenient interactive zoomable treemap. |

### Can you explain the folder structure? <a name="can-you-explain-the-folder-structure"></a>
```
├── .babelrc                  # Configures Babel
├── .editorconfig             # Configures editor rules
├── .eslintrc                 # Configures ESLint
├── .gitignore                # Tells git which files to ignore
├── .istanbul.yml             # Configure istanbul code coverage
├── .npmrc                    # Configures npm to save exact by default
├── README.md                 # This file.
├── dist                      # Folder where the build script places the built app. Use this in prod.
├── package.json              # Package configuration. The list of 3rd party libraries and utilities
\---src
    +---modules
        +---App               # Application module for reusable components, utils, contants and other things
        |   +---components    # React components inside module (reusable for App module)
        |   +---constants     # Application constants including constants for Redux
        |   +---redux         # Redux part of the module, separated group of reducers, actions, middlewares, sagas...
        |   |   +---reducers
        |   |   +---state
        |   |   \---store
        |   +---styles        # CSS Styles, typically written in Sass
        |   \---utils         # Module utilites (Reusable in Module App)
        +---FuelSaving        # An example of working module
        |   +---components    # Example module components
        |   +---containers    # Example of view for components redux binding and dusplaying aspecially
        |   +---redux         # Locally redux things
        |   |   +---actions
        |   |   \---reducers
        |   \---utils         # Locally utilites
    +---configs               # Build project configs     
    ├── webpack.config.dev.js     # Configures webpack for development builds
    └── webpack.config.prod.js    # Configures webpack for production builds
```

When you run `npm start`:

 1. The sass-loader compiles Sass into CSS
 2. Webpack bundles the compiled CSS into bundle.js. Sounds odd, but it works!
 3. bundle.js contains code that loads styles into the &lt;head&gt; of index.html via JavaScript. This is why you don't see a stylesheet reference in index.html. In fact, if you disable JavaScript in your browser, you'll see the styles don't load either.

The approach above supports hot reloading, which is great for development. However, it also create a flash of unstyled content on load because you have to wait for the JavaScript to parse and load styles before they're applied. So for the production build, we use a different approach:

When you run `npm run build`:

 1. The sass-loader compiles Sass into CSS
 2. The [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin) extracts the compiled Sass into styles.css
 3. buildHtml.js adds a reference to the stylesheet to the head of index.html.

For both of the above methods, a separate sourcemap is generated for debugging Sass in [compatible browsers](http://thesassway.com/intermediate/using-source-maps-with-sass).

### I don't like the magic you just described above. I simply want to use a CSS file. <a name="i-dont-like-the-magic-you-just-described-above-i-simply-want-to-use-a-css-file"></a>
No problem. Reference your CSS file in index.html, and add a step to the build process to copy your CSS file over to the same relative location /dist as part of the build step. But be forwarned, you lose style hot reloading with this approach.

### I just want an empty starter kit. <a name="i-just-want-an-empty-starter-kit"></a>
This starter kit includes an example app so you can see how everything hangs together on a real app. When you're done reviewing it, run this to remove the demo app:




