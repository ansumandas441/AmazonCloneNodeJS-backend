FROM node:20-alpine as base 
WORKDIR /app
##this package json files are copied and the configuration run for caching the saved 
#configuration response incase the code does not change
COPY package*.json ./
RUN npm install --only=prod
COPY . .

FROM base as development
RUN npm install --only=dev
# CMD ["npm","run","dev"]

FROM base as production
ENV NODE_PATH=./dist
RUN npm run build
# CMD ["npm","start"]