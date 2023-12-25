module.exports = {
    version: '0.0.1',
    init: function (pluginContext) {
      let policy = require('./policies/winston-logger.policy')
      pluginContext.registerPolicy(policy)
    },
    policies: ['winston-logger'],
    schema: {
      "$id": "https://express-gateway.io/schemas/plugins/winston-logger.json"
    }
  }