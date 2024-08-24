FROM node:20.16.0 AS build
WORKDIR /usr/task-management-system-frontend
COPY package.json package-lock.json ./
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]
