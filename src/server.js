'use strict';

const app = require('./app');

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening in ${process.env.NODE_ENV} 
  at httP://localhost:${PORT}`);
});