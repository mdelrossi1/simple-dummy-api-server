const express = require('express');
const fs = require('fs');

const app = express();

const handleData = (req, res, next) => {
  const fileName = `./${req.params.filename}.gz`;


  var options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  if (!fileName) {
    res.json({
      error: 'Missing required parameter `filename`'
    });

    return;
  }

  res.set('Content-Type', 'text/javascript');
  res.set('Content-Encoding', 'gzip');

  res.sendFile(fileName, options, err => {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
  return;
};

app.set('port', process.env.PORT || 4000);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.post('/api/:filename', handleData);

app.get('/api/:filename', handleData);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
