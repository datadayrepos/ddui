// scripts/build_index.js
// this is used to create the export index.ts file at the root of src
import fs from 'node:fs/promises'
import path from 'node:path'

const srcDir = path.join(process.cwd(), 'src/components')
const outputFile = path.join(process.cwd(), 'src/index.ts')

// function toComponentName(folderName) { return `El${folderName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`}

async function createIndexFile() {
  try {
    const entries = await fs.readdir(srcDir, { withFileTypes: true })
    const exportLines = entries
      .filter(entry => entry.isDirectory())
      .map((dir) => {
        // const componentName = toComponentName(dir.name)
        // return `export { default as ${componentName} } from './components/${dir.name}';`
        // return `export {  ${componentName} } from './components/${dir.name}';`
        return `export * from './components/${dir.name}';`
      })

    const comment = `// 🌟 Hello there! This file is auto-generated, so any changes you make here will be magically overwritten.\n`
    const content = `${comment + exportLines.join('\n')}\n`
    await fs.writeFile(outputFile, content)
    console.log('index.ts file created successfully.')
  }
  catch (err) {
    console.error('Error occurred:', err)
  }
}

createIndexFile()
