// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API: 'http://localhost:9090',
  // API: 'http://contactmanager1.northeurope.azurecontainer.io:9090',
  TOKEN: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifV0sImlhdCI6MTUzMTQxMzE2NCwiZXhwIjoxNTM1MDEzMTY0fQ.2DhsTiaemCMEK7ZwyT7OHIGrPr2mSC8Z7b42BLTeRik'
};
