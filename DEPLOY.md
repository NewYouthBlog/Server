# Docker 部署指南

本指南将帮助您使用 Docker 和 Docker Compose 部署博客后端服务（NestJS + Prisma + Nginx）。

## 前置要求

确保您的服务器上已安装：
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 部署步骤

### 1. 克隆项目

将项目克隆到您的服务器：

```bash
git clone <your-repo-url>
cd blog/Server
```

### 2. 环境配置

复制 `.env.example` 为 `.env` 并根据实际情况修改配置：

```bash
cp .env.example .env
```

**关键配置项：**
- `DATABASE_URL`: 您的数据库连接地址（如果您的数据库也在 Docker 中，请使用 host.docker.internal 或相应的服务名，如果数据库是外部服务，请填写实际地址）。
- `PORT`: 应用监听端口（默认为 3000，Docker 容器内部使用）。

### 3. Nginx 配置

Nginx 配置文件位于 `nginx/nginx.conf`。
默认情况下，Nginx 监听 **80** 端口，并将 `/api` 开头的请求转发给后端服务。

### 4. 启动服务

使用 Docker Compose 构建并启动所有服务：

```bash
docker-compose up -d --build
```

此命令将：
1. 构建 NestJS 后端镜像。
2. 拉取 Nginx 镜像。
3. 创建名为 `blog_network` 的网络。
4. 启动 `blog_server` 和 `blog_nginx` 容器。

### 5. 验证部署

部署完成后，您可以通过以下方式访问 API：

- **API 地址**: `http://<服务器IP>/api`
- **示例**: `http://localhost/api`

## 常用运维命令

- **查看日志**:
  ```bash
  docker-compose logs -f
  ```

- **停止服务**:
  ```bash
  docker-compose down
  ```

- **重启服务**:
  ```bash
  docker-compose restart
  ```

- **重新构建**:
  如果有代码更新，请执行：
  ```bash
  docker-compose up -d --build
  ```

## 目录结构说明

- `Dockerfile`: 定义了 NestJS 应用的构建过程（多阶段构建，优化镜像大小）。
- `docker-compose.yml`: 定义了服务编排（Server + Nginx）。
- `nginx/nginx.conf`: Nginx 反向代理配置。
- `.dockerignore`: 构建时排除的文件列表。
