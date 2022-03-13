#######################################
# BUILD APPLICATION STAGE
#######################################
FROM node:14.18.3-alpine3.14 as build
USER ${USER}
COPY package*.json ./
COPY . ./
RUN npm i npm -g \
  && npm ci
#######################################
# LAUNCH APPLICATION STAGE
#######################################
FROM build
WORKDIR /usr/share/app
COPY --from=build . /usr/share/app
RUN npm i pm2 -g \
  && npm run build
EXPOSE 3000
CMD npm run start:docker