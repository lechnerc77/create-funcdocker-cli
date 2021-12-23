import { writeFile } from 'fs/promises'
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