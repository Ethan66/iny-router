import InyRouter from '../src/iny-router'

const router = new InyRouter({
  routes: {
    MINI: [
      {
        path: '/pages/index/index',
        tab: true
      },
      {
        path: '/pages/open-share/index',
        tab: false
      },
      {
        path: "activity-package/pages/card-share/index",
        tab: false
      }
    ],
    APP: [
      {
        path: 'goods-detail',
        fullPath: '/lsd-web/opennative?name=GOODS_DETAIL_INFO'
      },
      {
        path: 'to-share',
        fullPath: '/lsd-web/opennative?name=MINI_APP_PAGE',
        encode: 'encodeURI'
      },
      {
        path: 'webview',
        fullPath: '/lsd-web/opennative?name=TO_H5WEB',
        encode: 'encode'
      },
      {
        path: 'back',
        fullPath: '/lsd-web/opennative?name=RETURN_BACK'
      }
    ]
  },
  mode: 'MINI',
  host: 'https://ths.inyoumall.com'
})

// router.setEnv('APP')

router.setAuth('dfdhfdksjfkdsjfkdjsfkj')
debugger
router.inyPush('open-share?tagId=51',)


// router.pushH5('unknow', {
//   a: 2,
//   b: [1, 2, 3]
// })

// router.push('goods-detail', {
//   goodsId: 10
// })

// router.replace('goods-detail', {
//   goodsId: 10
// })

debugger
// router.pushH5('https://ths.inyoumall.com/tag?tagId=51', {
//   goodsId: 10
// })


// router.pushH5('template/first?id=1', {
//   tag: 1
// })

// router.back(1)

// router.nativeBack(1)

