FROM node:20-alpine
WORKDIR /app
##this package json files are copied and the configuration run for caching the saved 
#configuration response incase the code does not change
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm","start"]

