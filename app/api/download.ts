
// pages/api/download.ts
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Kérés érkezett a /api/download URL-re:', new Date().toISOString());

    const filePath = path.join(process.cwd(), 'app', '.well-known', 'apple-developer-merchantid-domain-association');

    // Ellenőrizze, hogy a fájl létezik-e
    if (fs.existsSync(filePath)) {
      // Olvasd be a fájlt és küldd el a tartalmát a válaszban
      const fileContent = fs.readFileSync(filePath);

      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', 'attachment; filename=apple-developer-merchantid-domain-association');
      res.status(200).end(fileContent);
    } else {
      // Ha a fájl nem található, küldj vissza 404-et
      res.status(404).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}