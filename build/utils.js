const path = require('path');
const project_config = require('../config/index');

// 处理不同系统下，静态文件所在的目录
function assetsPath(_path){
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? project_config.build.assetsSubDirectory
    : project_config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
  assetsPath: assetsPath
}
