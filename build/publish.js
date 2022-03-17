const fs = require('fs')
const https = require('https')
const jszip = require('jszip')
const path = require('path')

const argv = process.argv
const isBeta = argv[2]
const { exec } = require('child_process')

const config = require('../package.json')
const FormData = require('form-data')

const HTTP_URL = 'https://sys.inyoumall.com/product/upload'
const CNPM_P = 'https://registry.npmjs.org'
const zip = new jszip()

const name = config.name.split('/')[1]


exec(`npm publish ${ !!isBeta ? ' --tag beta' : '' } --registry=` + CNPM_P, (error, errMsg, outMsg) => {
	console.log(`exec out ---: ${outMsg}`)
	console.log(`exec err ---: ${errMsg}`)

	if (error) {
		process.exit(1)
	}
	// 读取文件，压缩 docs
	/* readDir(zip, 'iny-router')
	zip
	.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
	.pipe(fs.createWriteStream(`${name}.zip`))
	.on('finish', function() {
		const form = new FormData()
		form.append('file', fs.createReadStream(`${name}.zip`))
		const request = https.request(HTTP_URL, {
			method: 'POST',
			headers: form.getHeaders()
		}, res => {
			let data = ''
			res.setEncoding('utf8');
			res.on('data', (chunk) => {
				data += chunk
			});
			res.on('end', () => {
				const result = JSON.parse(data.toString())
				console.log('文档上传成功')
				// 删除 zip 和 docs
				removeFile(path.resolve(__dirname, `../${name}.zip`))
				removeFile(path.resolve(__dirname, `../${name}`))
				if (result.code === 200) {
						// 提交版本号
						exec(
							`git push origin master`,
							(error, errMsg, outMsg) => {
								console.log(`exec out ---: ${outMsg}`)
								console.log(`exec err ---: ${errMsg}`)
								if (error) {
									process.exit(1)
								}
							}
						)
				} else {
					console.log('docs 上传失败 --->', result.msg)
				}
			});
		})
		form.pipe(request)

		request.on('error', (err) => {
			console.log(err)
			process.exit(1)
		})
	}) */
})

function readDir(obj, nowPath) {
  let files = fs.readdirSync(nowPath) //读取目录中的所有文件及文件夹（同步操作）
  files.forEach(function(fileName, index) {
    //遍历检测目录中的文件
    let fillPath = nowPath + '/' + fileName
    // console.log(fileName, index, nowPath, fillPath) //打印当前读取的文件名
    let file = fs.statSync(fillPath) //获取一个文件的属性
    if (file.isDirectory()) {
      //如果是目录的话，继续查询
      const parentPath = nowPath.split('/').slice(1).join('/')
      const dirPath = (parentPath ? parentPath + '/' + fileName : fileName)
      let dirlist = zip.folder(dirPath) //压缩对象中生成该目录
      readDir(dirlist, fillPath) //重新检索目录文件
    } else {
      obj.file(fileName, fs.readFileSync(fillPath)) //压缩目录添加文件
    }
  })
}

function removeFile (filePath) {
  const file = fs.statSync(filePath)
  if (file.isDirectory()) {
    fs.readdirSync(filePath).forEach(file => {
      removeFile(path.resolve(filePath, file))
    })
    fs.rmdirSync(filePath)
  } else {
    fs.unlinkSync(filePath)
  }
}