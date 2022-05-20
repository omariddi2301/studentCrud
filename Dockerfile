FROM node:latest as node
WORKDIR /crud
COPY . .

RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node crud/dist/crud-app /usr/share/nginx/html





