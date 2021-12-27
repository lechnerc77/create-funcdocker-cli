import { ValueHelper } from './valueHelper'

export function buildDockerFileContent(options) {

    let content

    const baseImagePath = ValueHelper.getValidBaseImagePathByLanguageAndLanguageVersion(options.language, options.lversion)

    if (options.language === ValueHelper.languageNode) {

        content = getContentForNode(baseImagePath, options)
    }
    else if (options.language === ValueHelper.languagePython) {

        content = getContentForPython(baseImagePath, options)

    }
    else if (options.language === ValueHelper.languagePowerShell) {

        content = getContentForPowerShell(baseImagePath, options)

    }
    else if (options.language === ValueHelper.languageDotNet) {

        content = getContentForDotnet(baseImagePath, options)

    }

    return content
}


export function buildDockerIgnoreFileContent(options) {

    return '.vscode \nlocal.settings.json \nMakefile \ndeployment.yaml \n*.http \n*.md'
}

export function buildKubernetesFileContent(options) {
    let content

    content = `kind: Service\n`
    content += `apiVersion: v1\n`
    content += `metadata:\n`
    content += `  name: ${options.appname}\n`
    content += `  labels:\n`
    content += `    app: ${options.appname}\n`
    content += `spec:\n`
    content += `  selector:\n`
    content += `    app: ${options.appname}\n`
    content += `  ports:\n`
    content += `    - protocol: TCP\n`
    content += `      port: ${options.defaultport}\n`
    content += `      targetPort: ${options.defaultport}\n`
    content += `  type: ClusterIP\n`
    content += '\n'
    content += `---\n`
    content += `apiVersion: apps/v1\n`
    content += `kind: Deployment\n`
    content += `metadata:\n`
    content += `  name: ${options.appname}\n`
    content += `  labels:\n`
    content += `    app: ${options.appname}\n`
    content += `spec:\n`
    content += `  replicas: 1\n`
    content += `  selector:\n`
    content += `    matchLabels:\n`
    content += `      app: ${options.appname}\n`
    content += `  template:\n`
    content += `    metadata:\n`
    content += `      labels:\n`
    content += `        app: ${options.appname}\n`
    content += `      annotations:\n`
    content += `        dapr.io/enabled: "true"\n`
    content += `        dapr.io/app-id: "${options.appname}"\n`
    content += `        dapr.io/app-port: "${options.defaultport}"\n`
    content += `    spec:\n`
    content += `      containers:\n`
    content += `        - name: ${options.appname}\n`
    content += `          image: ${options.dockerid}/${options.appname}:${options.appversion}\n`
    content += `          ports:\n`
    content += `            - containerPort: ${options.defaultport}\n`
    content += `          imagePullPolicy: Always\n`

    return content
}

export function buildMakeFileContent(options) {

    let content

    content = `RELEASE=${options.appversion}\n`
    content += `APP=${options.appname}\n`
    content += `DOCKER_ACCOUNT=${options.dockerid}\n`
    content += `CONTAINER_IMAGE=\${DOCKER_ACCOUNT}/\${APP}:\${RELEASE}\n`
    content += `\n`
    content += `.PHONY: build-image push-image\n`
    content += `\n`
    content += `build-image:\n`
    content += `	docker build -t $(CONTAINER_IMAGE) --no-cache --rm .\n`
    content += `\n`
    content += `build-and-push-image: build-image\n`
    content += `	docker push $(CONTAINER_IMAGE)\n`
    content += `\n`
    content += `push-image:\n`
    content += `	docker push $(CONTAINER_IMAGE)\n`
    content += `\n`
    content += `docker-run:\n`

    if (options.defaultport != '80') {
        content += `	docker run -p ${options.defaultport}:${options.defaultport} $(CONTAINER_IMAGE)\n`
    }
    else {
        content += `	docker run -it -p 8080:80 $(CONTAINER_IMAGE)\n`
    }

    return content

}

function getContentForNode(baseImagePath, options) {

    let content

    content = '# To enable ssh & remote debugging on app service change the base image to the one below \n'

    if (options.funccoreversion === ValueHelper.funcCoreVersion3) {
        content += `# FROM ${baseImagePath}:3.0-${options.language}${options.lversion}-appservice \n`
    }
    else if (options.funccoreversion === ValueHelper.funcCoreVersion4) {
        content += `# FROM ${baseImagePath}:4-${options.language}${options.lversion}-appservice \n`
    }

    content += `FROM ${baseImagePath}:${options.dockerbaseimage} \n`
    content += `\n`
    content += `ENV AzureWebJobsScriptRoot=/home/site/wwwroot \\ \n`

    if (options.disablefunchomepage === true || options.defaultport != '80') {
        content += `    AzureFunctionsJobHost__Logging__Console__IsEnabled=true \\ \n`
    }
    else {
        content += `    AzureFunctionsJobHost__Logging__Console__IsEnabled=true \n`
    }

    if (options.disablefunchomepage === true && options.defaultport != '80') {
        content += `    AzureWebJobsDisableHomepage=true \\ \n`
    }
    else if (options.disablefunchomepage === true && options.defaultport == '80') {
        content += `    AzureWebJobsDisableHomepage=true \n`
    }

    if (options.defaultport != '80') {
        content += `    ASPNETCORE_URLS=http://*:${options.defaultport} \n`
    }

    content += `\n`
    content += `COPY . /home/site/wwwroot \n`
    content += `\n`
    content += `RUN cd /home/site/wwwroot && \\ \n`
    content += `    npm install`

    return content

}

function getContentForPython(baseImagePath, options) {

    let content

    content = '# To enable ssh & remote debugging on app service change the base image to the one below \n'

    if (options.funccoreversion === ValueHelper.funcCoreVersion3) {
        content += `# FROM ${baseImagePath}:3.0-${options.language}${options.lversion}-appservice \n`
    }
    else if (options.funccoreversion === ValueHelper.funcCoreVersion4) {
        content += `# FROM ${baseImagePath}:4-${options.language}${options.lversion}-appservice \n`
    }

    content += `FROM ${baseImagePath}:${options.dockerbaseimage} \n`
    content += `\n`
    content += `ENV AzureWebJobsScriptRoot=/home/site/wwwroot \\ \n`

    if (options.disablefunchomepage === true || options.defaultport != '80') {
        content += `    AzureFunctionsJobHost__Logging__Console__IsEnabled=true \\ \n`
    }
    else {
        content += `    AzureFunctionsJobHost__Logging__Console__IsEnabled=true \n`
    }

    if (options.disablefunchomepage === true && options.defaultport != '80') {
        content += `    AzureWebJobsDisableHomepage=true \\ \n`
    }
    else if (options.disablefunchomepage === true && options.defaultport == '80') {
        content += `    AzureWebJobsDisableHomepage=true \n`
    }

    if (options.defaultport != '80') {
        content += `    ASPNETCORE_URLS=http://*:${options.defaultport} \n`
    }

    content += `\n`

    content += `COPY requirements.txt / \n`
    content += `RUN pip install -r /requirements.txt \n`

    content += `\n`

    content += `COPY . /home/site/wwwroot`

    return content

}

function getContentForPowerShell(baseImagePath, options) {

    let content

    let languageTag = `${options.lversion}`
    languageTag = languageTag.replace(/\s+/g, "");

    content = '# To enable ssh & remote debugging on app service change the base image to the one below \n'

    if (options.funccoreversion === ValueHelper.funcCoreVersion3) {
        content += `# FROM ${baseImagePath}:3.0-${languageTag}-appservice \n`
    }
    else if (options.funccoreversion === ValueHelper.funcCoreVersion4) {
        content += `# FROM ${baseImagePath}:4-${languageTag}-appservice \n`
    }

    content += `FROM ${baseImagePath}:${options.dockerbaseimage} \n`
    content += `\n`
    content += `ENV AzureWebJobsScriptRoot=/home/site/wwwroot \\ \n`

    if (options.disablefunchomepage === true || options.defaultport != '80') {
        content += `    AzureFunctionsJobHost__Logging__Console__IsEnabled=true \\ \n`
    }
    else {
        content += `    AzureFunctionsJobHost__Logging__Console__IsEnabled=true \n`
    }

    if (options.disablefunchomepage === true && options.defaultport != '80') {
        content += `    AzureWebJobsDisableHomepage=true \\ \n`
    }
    else if (options.disablefunchomepage === true && options.defaultport == '80') {
        content += `    AzureWebJobsDisableHomepage=true \n`
    }

    if (options.defaultport != '80') {
        content += `    ASPNETCORE_URLS=http://*:${options.defaultport} \n`
    }

    content += `\n`

    content += `COPY . /home/site/wwwroot`

    return content

}

function getContentForDotnet(baseImagePath, options) {

    let content
    let languageTag

    if (options.lversion === ValueHelper.dotNetVersion31core || options.lversion === ValueHelper.dotNetVersion6inproc) {
        content = `FROM mcr.microsoft.com/dotnet/sdk:6.0 AS installer-env \n`

        languageTag = 'dotnet3'
    }
    else if (options.lversion === ValueHelper.dotNetVersion5iso || options.lversion === ValueHelper.dotNetVersion6iso) {
        content = `FROM mcr.microsoft.com/dotnet/sdk:5.0 AS installer-env \n`

        languageTag = 'isolated5.0'
    }

    content += `\n`

    content += `# Build requires 3.1 SDK \n`
    content += `COPY --from=mcr.microsoft.com/dotnet/core/sdk:3.1 /usr/share/dotnet /usr/share/dotnet \n`

    content += `\n`

    content += `COPY . /src/dotnet-function-app \n`
    content += `RUN cd /src/dotnet-function-app && \\ \n`
    content += `    mkdir -p /home/site/wwwroot && \\ \n`
    content += `    dotnet publish *.csproj --output /home/site/wwwroot \n`

    content += `\n`

    content += '# To enable ssh & remote debugging on app service change the base image to the one below \n'
    if (options.funccoreversion === ValueHelper.funcCoreVersion3) {
        content += `# FROM ${baseImagePath}:3.0-${languageTag}-appservice \n`
    }
    else if (options.funccoreversion === ValueHelper.funcCoreVersion4) {
        content += `# FROM ${baseImagePath}:4-${languageTag}-appservice \n`
    }

    content += `FROM ${baseImagePath}:${options.dockerbaseimage} \n`

    content += `\n`

    content += `ENV AzureWebJobsScriptRoot=/home/site/wwwroot \\ \n`

    if (options.disablefunchomepage === true || options.defaultport != '80') {
        content += `    AzureFunctionsJobHost__Logging__Console__IsEnabled=true \\ \n`
    }
    else {
        content += `    AzureFunctionsJobHost__Logging__Console__IsEnabled=true \n`
    }

    if (options.disablefunchomepage === true && options.defaultport != '80') {
        content += `    AzureWebJobsDisableHomepage=true \\ \n`
    }
    else if (options.disablefunchomepage === true && options.defaultport == '80') {
        content += `    AzureWebJobsDisableHomepage=true \n`
    }

    if (options.defaultport != '80') {
        content += `    ASPNETCORE_URLS=http://*:${options.defaultport} \n`
    }

    content += `\n`

    content += `COPY --from=installer-env ["/home/site/wwwroot", "/home/site/wwwroot"]`

    return content

}
