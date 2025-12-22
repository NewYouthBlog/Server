# Docker 部署指南

本指南将帮助您使用 Docker 和 Docker Compose 部署博客后端服务（NestJS + Prisma）。

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
- `DATABASE_URL`: 您的数据库连接地址（确保容器可访问）。
- `PORT`: 应用监听端口（默认 3000）。

### 3. 启动服务

使用 Docker Compose 构建并启动服务：

```bash
docker-compose up -d --build
```

此命令将构建并启动 NestJS 后端容器。

### 4. 验证部署

部署完成后，应用将直接暴露在 3000 端口：

- **API 地址**: `http://<服务器IP>:3000/api`

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
