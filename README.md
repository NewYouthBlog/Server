---
title: nestjs-blog v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.17"

---

# nestjs-blog

## 🚀 快速开始 (Quick Start)

如果你是首次获取本项目，请按照以下步骤运行：

1.  **安装依赖 (Install Dependencies)**
    ```bash
    npm install
    ```

2.  **配置环境 (Configure Environment)**
    复制 `.env.example` 为 `.env`，并修改其中的 `DATABASE_URL` 为你的数据库连接地址。
    ```bash
    cp .env.example .env
    ```

3.  **初始化数据库 (Initialize Database)**
    同步数据库结构并生成客户端：
    ```bash
    npx prisma db push
    ```

4.  **填充初始数据 (Seed Data)**
    **重要**：首次运行需要执行此命令以创建默认管理员用户。
    ```bash
    npx prisma db seed
    ```
    > 默认管理员账户:
    > - 用户名: `admin`
    > - 密码: `lcg9899`
    > - 角色: `admin`

5.  **启动服务 (Run Server)**
    ```bash
    npm run dev
    ```

---

> v1.0.0

Base URLs:

* <a href="127.0.0.1:3001">开发环境: 127.0.0.1:3001</a>

# Authentication

- HTTP Authentication, scheme: bearer

# Default

## GET 测试

GET /

> 返回示例

> 200 Response

```json
{
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» msg|string|true|none||none|

# 标签

## POST 新建标签

POST /tags

> Body 请求参数

```json
{
  "name": "go"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## PATCH 更新标签

PATCH /tags/6554b0fa811da35d5760e517

> Body 请求参数

```json
{
  "name": "py",
  "id": 111
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 404 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|记录不存在|Inline|

### 返回数据结构

## DELETE 删除标签

DELETE /tags/6554b0fa811da35d5760e517

> Body 请求参数

```yaml
{}

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 404 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|记录不存在|Inline|

### 返回数据结构

# 文章

## POST 添加文章

POST /articles

> Body 请求参数

```json
{
  "tags": [
    "python"
  ],
  "createdAt": "2022-01-15T12:03:24.772Z",
  "title": "测试归档",
  "status": 1,
  "content": "dsafkljwlkf;jdklsa;jfwkl;jfkldsjflasd;jf\n",
  "image": "https://pic.52112.com/2019/07/23/JPG-190723_759/mfvvEHO7sx_small.jpg"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## PATCH 更新文章

PATCH /articles/6554b3aebe401103d8517b78

> Body 请求参数

```json
{
  "title": "nice",
  "status": 1,
  "image": "https://aioseo.com/wp-content/uploads/2021/04/how-to-find-and-fix-404-errors-in-wordpress.png",
  "content": "我被改了"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## DELETE 删除文章

DELETE /articles/6554b3aebe401103d8517b78

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 前前端接口

## GET 查看所有标签

GET /tags

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 所有文章（不分页）

GET /articles

该接口可以查询草稿和已发布的所有文章

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查看所有头条文章

GET /headline

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "articles": [
      {
        "ID": 0,
        "CreatedAt": "string",
        "UpdatedAt": "string",
        "DeletedAt": null,
        "Tags": null,
        "title": "string",
        "status": 0,
        "content": "string",
        "image": "string",
        "headimg": "string"
      }
    ]
  },
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» data|object|true|none||none|
|»» articles|[object]|true|none||none|
|»»» ID|integer|true|none||none|
|»»» CreatedAt|string|true|none||none|
|»»» UpdatedAt|string|true|none||none|
|»»» DeletedAt|null|true|none||none|
|»»» Tags|null|true|none||none|
|»»» title|string|true|none||none|
|»»» status|integer|true|none||none|
|»»» content|string|true|none||none|
|»»» image|string|true|none||none|
|»»» headimg|string|true|none||none|
|» msg|string|true|none||none|

## GET 根据id查找文章

GET /articles/6554b39cbe401103d8517b74

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "article": {
      "ID": 0,
      "CreatedAt": "string",
      "UpdatedAt": "string",
      "DeletedAt": null,
      "Tags": [
        {
          "ID": 0,
          "name": "string",
          "HasArt": null
        }
      ],
      "title": "string",
      "status": 0,
      "content": "string",
      "image": "string",
      "headimg": "string"
    }
  },
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» data|object|true|none||none|
|»» article|object|true|none||none|
|»»» ID|integer|true|none||none|
|»»» CreatedAt|string|true|none||none|
|»»» UpdatedAt|string|true|none||none|
|»»» DeletedAt|null|true|none||none|
|»»» Tags|[object]|true|none||none|
|»»»» ID|integer|false|none||none|
|»»»» name|string|false|none||none|
|»»»» HasArt|null|false|none||none|
|»»» title|string|true|none||none|
|»»» status|integer|true|none||none|
|»»» content|string|true|none||none|
|»»» image|string|true|none||none|
|»»» headimg|string|true|none||none|
|» msg|string|true|none||none|

## GET 根据tag查找文章(分页)

GET /articles/tags/python

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 否 |none|
|limit|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "ID": 0,
    "name": "string",
    "HasArt": [
      {
        "ID": 0,
        "CreatedAt": "string",
        "UpdatedAt": "string",
        "DeletedAt": null,
        "Tags": null,
        "title": "string",
        "status": 0,
        "content": "string",
        "image": "string",
        "headimg": "string"
      }
    ]
  },
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» data|object|true|none||none|
|»» ID|integer|true|none||none|
|»» name|string|true|none||none|
|»» HasArt|[object]|true|none||none|
|»»» ID|integer|true|none||none|
|»»» CreatedAt|string|true|none||none|
|»»» UpdatedAt|string|true|none||none|
|»»» DeletedAt|null|true|none||none|
|»»» Tags|null|true|none||none|
|»»» title|string|true|none||none|
|»»» status|integer|true|none||none|
|»»» content|string|true|none||none|
|»»» image|string|true|none||none|
|»»» headimg|string|true|none||none|
|» msg|string|true|none||none|

## GET 根据发布时间查询文章简略信息

GET /archive

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "articles": [
      {
        "ID": 0,
        "Title": "string",
        "CreatedAt": "string"
      }
    ]
  },
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» data|object|true|none||none|
|»» articles|[object]|true|none||none|
|»»» ID|integer|true|none||none|
|»»» Title|string|true|none||none|
|»»» CreatedAt|string|true|none||none|
|» msg|string|true|none||none|

# 用户接口

## POST 创建用户

POST /users/

> Body 请求参数

```json
{
  "username": "xinghe",
  "password": "9899",
  "roles": "admin"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询用户

GET /users/

> 返回示例

> 200 Response

```json
{
  "id": 0,
  "username": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» id|integer|true|none||none|
|» username|string|true|none||none|

## POST 登录

POST /users/login

> Body 请求参数

```json
{
  "username": "admin",
  "password": "9899"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## PATCH 更新用户

PATCH /users/65503eca0356309781e95f07

> Body 请求参数

```json
{
  "password": "9899",
  "roles": "user"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 404 Response

```json
{
  "statusCode": 0,
  "timestamp": "string",
  "path": "string",
  "code": 0,
  "data": {
    "message": "string",
    "error": "string",
    "statusCode": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|记录不存在|Inline|

### 返回数据结构

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» statusCode|integer|true|none||none|
|» timestamp|string|true|none||none|
|» path|string|true|none||none|
|» code|integer|true|none||none|
|» data|object|true|none||none|
|»» message|string|true|none||none|
|»» error|string|true|none||none|
|»» statusCode|integer|true|none||none|

## DELETE 删除用户

DELETE /users/654f84755af7dc3dcc469f26

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 数据模型

