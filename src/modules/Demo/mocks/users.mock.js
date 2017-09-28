import jsf from 'json-schema-faker';

const usersSchema = {
  "type": "array",
  "items": {
    "id": {
      "$ref": "#/definitions/positiveInt"
    },
    "name": {
      "type": "string",
      "faker": "name.findName"
    },
    "email": {
      "type": "string",
      "format": "email",
      "faker": "internet.email"
    }
  },
  "required": [
    "id",
    "name",
    "email"
  ],
  "definitions": {
    "positiveInt": {
      "type": "integer",
      "minimum": 0,
      "exclusiveMinimum": true
    }
  }
};


export default {
  urlPattern: "/users",
  methods: {
    GET: {
      code: 200,
      headers: [],
      body: jsf(usersSchema)
    }
  }
};
