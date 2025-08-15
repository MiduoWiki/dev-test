# 使用官方Node.js运行时作为父镜像
FROM node:18

# 设置工作目录
WORKDIR /usr/src/app

# 复制package.json和package-lock.json（如果存在）
COPY package*.json ./

# 安装PM2
RUN npm install -g pm2

# 安装项目依赖
RUN npm install

# 复制其余的源代码
COPY . .

# 编译TypeScript代码
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pm2-runtime", "start", "ecosystem.config.js"]