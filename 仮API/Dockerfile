# 选择基础镜像
FROM node:14

# 设置工作目录
WORKDIR /app

# 将本地项目文件复制到容器中
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制其他项目文件
COPY . .

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", "server.js"]
