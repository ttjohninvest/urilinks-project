const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
//const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.path.endsWith(".map")) {
//     return res.sendStatus(404);
//   }

//   next();
// });

app.use(express.static(publicPath)); //serves all of the files in public folder to user's browser
// app.use( //does not server the source maps in public folder to user's browser
//   express.static(publicPath, {
//     setHeaders: (res, filePath) => {
//       if (filePath.endsWith(".map")) {
//         res.setHeader("Cache-Control", "no-store");
//       }
//     }
//   })
// );

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// app.listen(port, () => {
//   console.log('Node/Express Server is up and waiting to receive Browser https requests for index.html file or other file types through this port='+port);
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});