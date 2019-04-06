/* eslint-disable no-unused-vars */

module.exports = {
  fakeData: {
    defaultFakeRecords: 0, // Number of records to generate if JSON-schema does not have a fakeRecords property.
    noFakesOnAll: false, // Don't generate fake data with "feathers-plus generate all" when true.
    expContext: { // Additional context passed to expressions
      // Invoked with: faker: { exp: 'foo(...)'}
      // foo: (bar, baz) => { return ... }
    },
    postGeneration: data => {
      // Mutate fake data after its generated.
      // We need to remove ids from all objects so that Sequelize can automatically assign appropriate ids
      const {users, ...rest} = data

      return {
        users: users.map((user, i) => ({
          ...user,
          email: `demo${i}@example.com`
        }))
      }
    },
    // https://github.com/json-schema-faker/json-schema-faker#custom-options
    jsf: {
      minItems: 0, // This will override the minimum items found inside a JSON Schema.
      maxItems: 100, // This will override the maximum items found inside a JSON Schema.
      // maxLength: 40, // This will override the maximum length found inside a JSON Schema.
      // random: () => (), // A replacement for Math.random to support pseudorandom number generation.
      // A number from 0 to 1 indicating the probability to fake a non-required object property.
      // When 0.0, only required properties are generated; when 1.0, all properties are generated.
      optionalsProbability: 1.0,
      // Support  JSONPath expressions such as jsonPath: '$..book[?(@.price<30 && @.category=="fiction")]'
      // https://github.com/dchester/jsonpath
      resolveJsonPath: true,
      // Custom seeders.
      extend: {
        // Invoked with: format: 'foo'
        // foo: () => jsf.random.randexp('\\d\\.\\d\\.[1-9]\\d?');,
      },

    },
    // https://github.com/Marak/Faker.js#localization
    faker: {
      seed: 1, // If you want consistent results, you can set your own seed.
      locale: 'en', // Language to generate for.
      localeFallback: 'en', // Fallback language for missing definitions.
      // Custom seeders.
      plain: (v = 'qwe') => `${v}` // default password
      // faz: {
      // Invoked with: faker: 'faz.foo', faker: { 'faz.foo': 'bar' } or faker: { 'faz.foo': ['bar', 'baz'] }
      // foo: (p1 = 'hello', p2 = 'world') => `${p1} ${p2}`,
      // },
    },
    // http://chancejs.com/usage/seed.html
    chance: {
      seed: undefined,
      // Custom seeders.
      // Invoked with: chance: 'foo', chance: { foo: 'bar' } or chance: { foo: ['bar', 'baz'] }
      // foo: (p1 = 'hello', p2 = 'world') => `${p1} ${p2}`,
    },
  }
}
