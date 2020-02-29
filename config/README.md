# 打包 部署（browserHistory）

## 打包

config配置项

```js
  // browserHistory
  {
    history: 'browser',
    base: '/', // 指定部署目录，根目录'/'，非根目录'/dist/'
    publicPath: '/', // 同上
    hash: true, // 开启 hash 文件后缀
    ...
  }
  // hashHistory
  {
    history: 'hash', // 'hash'部署到非根目录 会有url/#/
    base: '/',
    publicPath: '/',
    hash: true, // 开启 hash 文件后缀
    ...
  }
```

## 部署

主要是针对browserHistory使用，hashHistory简单

```shell
  server {
    #前端访问接口
    listen 80;
    # gzip config
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    root /usr/share/nginx/html;

    location / {
        # 用于配合 browserHistory使用
        root      html/dist;
        index     index.html index.htm;
        # 解决二级路由刷新报404
        try_files $uri $uri/ /index.html;

        # 如果有资源，建议使用 https + http2，配合按需加载可以获得更好的体验
        # rewrite ^/(.*)$ https://preview.pro.ant.design/$1 permanent;

    }
    location /api {
        # proxy_pass  http://127.0.0.1:3999; 后台服务地址
        proxy_pass  http://127.0.0.1:3999;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   Host              $http_host;
        proxy_set_header   X-Real-IP         $remote_addr;
    }
  }
```
