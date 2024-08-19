import PDFMerger from 'pdf-merger-js';
import fs from 'fs';

const mergePdfs = async (p1, p2, outputPath) => {
  const merger = new PDFMerger();

  await merger.add(p1);  // Merge the first PDF
  await merger.add(p2);  // Merge the second PDF
  
  // Save the merged PDF to the specified output path
  await merger.save(outputPath);
};

export { mergePdfs };
