# 阶段2：使用 Nginx 镜像提供静态文件
FROM nginx:latest

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 从 Jenkins 构建产物目录复制构建好的前端应用到 Nginx 的默认静态文件目录
COPY ./dist .

# Nginx 默认监听 80 端口，所以我们将 Docker 容器的 80 端口映射到宿主机的任意端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]