
/*
Run locally to watermark a file:
node tools/watermark.js input.jpg output.jpg "Watermark text"
*/
const sharp = require('sharp')
const fs = require('fs')
async function run(inf, outf, text){
  const buf = fs.readFileSync(inf)
  const meta = await sharp(buf).metadata()
  const svg = `<svg width="${meta.width}" height="${meta.height}"><style>.t{fill:rgba(255,255,255,0.8);font-size:40px;font-family:Arial}</style><text x="30" y="${meta.height-40}" class="t">${text}</text></svg>`
  await sharp(buf).composite([{ input: Buffer.from(svg), gravity:'southwest' }]).jpeg({ quality:82 }).toFile(outf)
  console.log('Saved',outf)
}
if (require.main === module){
  const args = process.argv.slice(2)
  if (args.length < 3) { console.log('Usage'); process.exit(1) }
  run(args[0], args[1], args[2])
}
