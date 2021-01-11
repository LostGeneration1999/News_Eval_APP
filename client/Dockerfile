### Build

FROM node:15.5.1-alpine as build-stage

WORKDIR /app
COPY ./news_app ./
RUN npm install
RUN npm run build
CMD [ "node", "server.js"]

### Production

FROM nginx:1.19.6-alpine as production-stage

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

COPY nginx/ /var/work
RUN mkdir -p /var/log/nginx/log\
    && mkdir /var/www\
    && mkdir /var/www/clients

COPY --from=build-stage /app/build /var/www/clients
WORKDIR /var/work
RUN rm -f /etc/nginx/conf.d/*.conf\
    && rm -f /etc/nginx/nginx.conf\
    && cp -i *.conf /etc/nginx

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;","-c","/etc/nginx/nginx.conf"]
