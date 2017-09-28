## Mocks

Any file matching pattern `*.mock.js` is considered to be a mock

Mock should be exporting config like
```javascript
export default {
  urlPattern: "/regions",
  methods: {
    GET: {
      code: 200,
      headers: [],
      body: {}
    },
    POST: {
      ...
    },
    ...
  }
}
```


___
### Mock config
#### `urlPattern`
Will be used to determine which mock needs to be served for this particular request.
[url-pattern](https://www.npmjs.com/package/url-pattern) is used for matching.  
apiPrefix is prepended automatically - `new UrlPattern(apiPrefix + mock.urlPattern)`

#### `methods`
Must be an object with keys being a request method and value being a response config


___
### Response config
#### `body`
Must be a simple js object. You can either generate mock data by hand or use [json-schema-faker](https://github.com/json-schema-faker/json-schema-faker)
```javascript
import jsf from 'json-schema-faker';

export default {
  ...,
  methods: {
    GET: {
      ...,
      body: jsf({
        type: 'array',
        items: {
            ...
        }
      })
    }
  }
}
```
