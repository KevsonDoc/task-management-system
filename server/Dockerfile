FROM node:20.16.0 as development
WORKDIR /usr/task-management-system-server
COPY package*.json ./
COPY . .
RUN npm install
CMD [ "npm", "run", "start:dev" ]

FROM node:20.16.0 as test
WORKDIR /usr/task-management-system-server
COPY package*.json ./
COPY . .
RUN npm install
RUN npm install -g @nestjs/cli
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "test:cov"]

FROM node:20.16.0 as production
WORKDIR /usr/task-management-system-server
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "start:prod"]