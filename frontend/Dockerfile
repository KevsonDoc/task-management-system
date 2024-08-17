FROM node:20.16.0 AS build
WORKDIR /usr/task-management-system-frontend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
