import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const urlFile = join(root, "site-url.txt");
const output = join(root, "images", "portfolio-qr.png");

const url = readFileSync(urlFile, "utf8").trim();

if (!url) {
  console.error("site-url.txt is empty — add your portfolio URL on one line.");
  process.exit(1);
}

const png = await QRCode.toBuffer(url, {
  type: "png",
  width: 1024,
  errorCorrectionLevel: "M",
  margin: 2,
});

writeFileSync(output, png);
console.log(`QR saved: images/portfolio-qr.png`);
console.log(`URL: ${url}`);
