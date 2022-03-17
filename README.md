
# iny-router

iny-router 工具库

## 注意要点

本工具库，当 master 分支 提交代码后，会自动发布 npm 版本，请勿随意合并、提交 master

同时，本工具库每一个工具函数，必须有完整的测试用例

## 开发流程

1. 需要在types/index.ts 中，对应的模块下，添加函数接口
2. 在对 core 文件夹下的对应模块中，实现函数
3. 在 test 文件夹下的 iny-router.spec.ts 中添加测试用例，测试 iny-router 实例上拥有新增的方法
4. 在 test/core 文件夹下对应的测试用例中中添加对用的e测试用例，测试 该方法的实现

## 文档地址

[文档地址](https://sys.inyoumall.com/public/iny-router/index.html)
