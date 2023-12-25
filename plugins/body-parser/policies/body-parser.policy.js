const { PassThrough } = require("stream");
const express = require('express')
const urlEncoded = require('express').urlencoded({ extended: true });

module.exports = {
  name: 'body-parser',
  policy: (actionParams)  => {
    return async (req, res, next) => {
        req.egContext.requestStream = new PassThrough();
        req.pipe(req.egContext.requestStream);

      const LIMIT = 16380

      const bodySize = req.headers["content-length"];

      const jsonParser = express.json({ limit: `${bodySize > LIMIT ? '1' : '100'}kb` })

      return jsonParser(req, res, () => urlEncoded(req, res, next));
    };
  }
};
