FROM node:16.13.2-alpine3.14 as base

WORKDIR /app
COPY ./package.json ./

RUN npm install 
COPY . .
RUN NODE_OPTIONS=--max-old-space-size=2048 npm run build

FROM nginx:1.16

#COPY --from=base /data/build /srv/www/dist
EXPOSE 3000 

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=base /app/build /usr/share/nginx/html
