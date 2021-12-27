import { writeFile, access, mkdir } from 'fs/promises'
import chalk from 'chalk'
import { buildDockerFileContent, buildDockerIgnoreFileContent, buildMakeFileContent, buildKubernetesFileContent } from './builder'

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

export async function writeKubernetesDeploymentFile(options) {

    const content = buildKubernetesFileContent(options)

    const dir = './k8s'
    const filepath = `${dir}/deployment.yaml`

    try {
        await access(dir)
    } catch (error) {
        await mkdir(dir)
    }

    await writeFile(filepath, content)
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

    if (options.kubernetes === true) {
        const boxContentDockerIgnore = chalk.yellow('| deployment.yaml    |')

        console.log(boxHeader)
        console.log(boxEmptyLine)
        console.log(boxContentDockerIgnore)
        console.log(boxEmptyLine)
        console.log(boxFooter)

        const contentDockerIgnore = buildKubernetesFileContent(options)
        console.log(contentDockerIgnore)

        console.log('\n')

    }
}
