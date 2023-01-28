FROM node:18.13.0 as build-stage
WORKDIR /var/jenkins_home/workspace/tify/front
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/tify/front/dist /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/tify/front/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g","daemon off;"]
