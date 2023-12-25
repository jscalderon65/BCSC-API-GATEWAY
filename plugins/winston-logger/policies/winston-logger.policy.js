const logger = require("../logger.config");
const zlib = require("zlib");

module.exports = {
    name: 'winston-logger',
    schema: {
      $id: 'http://express-gateway.io/schemas/policies/winston-logger.policy.json',
      type: 'object'
    },
    policy: (actionParams) => {
      return (req, res, next, err) => {
        try {
          if (process.env.LOG_LEVEL === "debug"){

            let resOldWrite = res.write;
            let resOldEnd = res.end;
            let resChunks = [];

            res.write = function (chunk) {
              resChunks.push(chunk);

              return resOldWrite.apply(res, arguments);
            };

            res.end = function (chunk) {
              if (chunk)
                resChunks.push(chunk);

              try {
                const regEx = /^[4-5][0-9][0-9]$/;
                if(!regEx.test(res.statusCode)){
                  if (resChunks.length > 0)
                    logger.info({ request:{method: req.method, path:req.path, params:req.params, headers: req.headers, body: req.body}, response: JSON.parse(Buffer.concat(resChunks).toString('utf8'))});
                }else{
                  logger.info({ request:{method: req.method, path:req.path, params:req.params, headers: req.headers, body: req.body}, response: JSON.parse(Buffer.concat(resChunks).toString('utf8'))});
                }
              } catch (e){
                return resOldEnd.apply(res, arguments);
              }

              resChunks = [];

              return resOldEnd.apply(res, arguments);
            };
          }
        } catch (error) {
          logger.error(error);
          res.status(500).send('Something broke!');
        }

        if (err){
          logger.error(err);
          res.status(500).send('Something broke!');
        }

        next();
      };
    }
};