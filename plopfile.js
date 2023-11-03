import fs from 'node:fs'

export default async function (plop) {
  for (const item of fs.readdirSync('./plop-templates')) {
    if (fs.lstatSync(`./plop-templates/${item}`).isDirectory())
      plop.setGenerator(item, (await import(`./plop-templates/${item}/prompt.js`)).default)
  }
};
