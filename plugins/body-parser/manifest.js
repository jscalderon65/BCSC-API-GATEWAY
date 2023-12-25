module.exports = {
    version: '1.2.0',
    init: function (pluginContext) {
      let policy = require('./policies/body-parser.policy')
      pluginContext.registerPolicy(policy)
    },
    policies: ['body-parser'],
    schema: {
      "$id": "https://express-gateway.io/schemas/plugins/body-parser.json"
    }
  }