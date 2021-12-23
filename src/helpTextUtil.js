export function getHelpText() {

  const helpText = `
$ create-funcdocker

Create a Docker file and more for an Azure Functions project

Usage:
  create-funcdocker [options]

Options:
  -h,   --help                 help for create-funcdocker CLI
  -m,   --manually             suppress collection of configuration from Azure Functions project
  -d    --dryrun               execute the generation in dry run, no files are written 
  --la  --language             language of the project
  --lv  --lversion             version of the language
  --fv  --funccoreversion      version of the Azure Functions runtime
  --di  --dockerbaseimage:     base image for Azure Functions container
  --dh  --disablefunchomepage  disable Azure Functions home page
  --dp  --defaultport:         default port of the container
  --am  --addmakefile:         add a Makefile
  --id  --dockerid:            ID of your Docker account
  --an  --appname:             name of your application 
  --av  --appversion:          version of your application
`
  return helpText
}






