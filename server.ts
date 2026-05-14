import express from 'express';
import path from 'path';
import * as fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

const distPath = path.resolve(process.cwd(), 'dist');

console.log('Server starting...');
console.log('Current working directory:', process.cwd());
console.log('Dist path:', distPath);

// Verify dist directory exists
if (!fs.existsSync(distPath)) {
  console.error('Error: dist directory not found at', distPath);
  process.exit(1);
}

// Serve static files from the 'dist' directory
app.use(express.static(distPath));

app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
