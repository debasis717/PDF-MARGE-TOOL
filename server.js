import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { mergePdfs } from './merges.js'; // Ensure this function is properly defined

const app = express();

// This is required for ES Modules to simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'));
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post('/marges', upload.array('pdfs', 2), async (req, res, next) => {
  try {
    console.log(req.files);

    if (req.files.length < 2) {
      return res.status(400).send('Please upload two PDF files.');
    }

    const pdf1Path = path.join(__dirname, req.files[0].path);
    const pdf2Path = path.join(__dirname, req.files[1].path);
    const mergedPdfPath = path.join(__dirname, 'public/merged.pdf');

    // Merging the PDFs
    await mergePdfs(pdf1Path, pdf2Path, mergedPdfPath);

    res.redirect(`/static/merged.pdf`);
  } catch (error) {
    next(error); // Pass any error to the Express error handler
  }
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
