/* global process */

export default function getParams(isDev) {
  const basePath = '/lkfl';
  const apiBasePath = `${ basePath }/api/v1`;

  return Object.assign({
    basePath,
    apiBasePath,
    apiUrl: (isDev ? 'http://localhost:3002' : '') + apiBasePath
  }, parseProcessArgs());
}

function parseProcessArgs() {
  const args = {
    node: process.argv[0],
    script: process.argv[1]
  };

  process.argv.slice(2).forEach(function (arg) {
    const key = arg.split('=')[0];
    args[key] = arg.substr(key.length + 1);
  });

  return args;
}
