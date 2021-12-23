import { writeFile } from 'fs/promises'
import chalk from 'chalk'
import { buildDockerFileContent, buildDockerIgnoreFileContent, buildMakeFileContent } from './builder'

export async function writeDockerFile(options) {

    const content = buildDockerFileContent(options)

    await writeFile(`Dockerfile`, content)
}

export async function writeDockerIgnoreFile(options) {

    const content = buildDockerIgnoreFileContent(options)

    await writeFile(`.dockerignore`, content)

}

export async function writeMakeFile(options) {

    const content = buildMakeFileContent(options)

    await writeFile(`Makefile`, content)
}

export function writeFilesInDryRunMode(options) {

    const header = chalk.yellow('DRYRUN') + ' - No files will be written'

    const boxHeader = chalk.yellow('--- Content of -------')
    const boxEmptyLine = chalk.yellow('|                    |')
    const boxFooter = chalk.yellow('----------------------')

    console.log(header)

    console.log('\n')

    const boxContentDockerFile = chalk.yellow('| Dockerfile         |')

    console.log(boxHeader)
    console.log(boxEmptyLine)
    console.log(boxContentDockerFile)
    console.log(boxEmptyLine)
    console.log(boxFooter)

    const contentDockerFile = buildDockerFileContent(options)
    console.log(contentDockerFile)

    console.log('\n')

    const boxContentDockerIgnore = chalk.yellow('| .dockerignore      |')

    console.log(boxHeader)
    console.log(boxEmptyLine)
    console.log(boxContentDockerIgnore)
    console.log(boxEmptyLine)
    console.log(boxFooter)

    const contentDockerIgnore = buildDockerIgnoreFileContent(options)
    console.log(contentDockerIgnore)

    console.log('\n')

    if (options.addmakefile === true) {

        const boxContentMakeFile = chalk.yellow('| Makefile           |')

        console.log(boxHeader)
        console.log(boxEmptyLine)
        console.log(boxContentMakeFile)
        console.log(boxEmptyLine)
        console.log(boxFooter)


        const contentMakefile = buildMakeFileContent(options)
        console.log(contentMakefile)

        console.log('\n')
    }
}
