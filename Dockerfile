######################
# START STAGE 1
######################
FROM node:14.19.1-alpine3.15 as start
USER ${USER}
ENV NODE_OPTIONS=--max_old_space_size=32768
ADD ./package.*json ./
ADD . ./

#######################
# UPGRADE STAGE 2
#######################
FROM start as upgrade
COPY --from=start . ./
RUN apk -U upgrade \
  && apk --no-cache --update add build-base 

#######################
# FINAL STAGE 3
#######################
FROM upgrade as final
COPY --from=upgrade . ./
RUN rm -rf node_modules \
  && npm cache clean -f \
  && npm config delete proxy \
  && npm config delete https-proxy \
  && npm config delete proxy -g \
  && npm config delete https-proxy -g \
  && npm config set proxy null \
  && npm config set https-proxy null \
  && npm config set fetch-retries 15 \
  && npm config set fetch-retry-factor 30 \
  && npm config set fetch-retry-mintimeout 6000000 \
  && npm config set fetch-retry-maxtimeout 12000000 \
  && npm config set fetch-timeout 30000000 \
  && npm config set prefer-offline true \
  && npm config set unsafe-perm true \
  && npm config set strict-ssl false \
  && npm config set audit false \
  && npm i -g --unsafe-perm \
  && npm i node-gyp -g \
  && npm i @xpack-dev-tools/windows-build-tools@latest -g \
  && npm i pm2 -g \
  && npm i --loglevel verbose --no-audit \
  && npm run build
EXPOSE 3000
CMD npm run start:docker
