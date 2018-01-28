FROM node as builder
LABEL maintainer="Wassim DHIF <wassimdhif@gmail.com> (https://github.com/wdhif)"
WORKDIR world-cup-front
COPY . .
RUN npm install && npm run build-dev

FROM nginx
LABEL maintainer="Wassim DHIF <wassimdhif@gmail.com> (https://github.com/wdhif)"
WORKDIR /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder world-cup-front/build .

