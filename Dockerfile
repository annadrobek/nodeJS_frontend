FROM node:16
LABEL maintainer="annadrobek&radoslawbiereta"
WORKDIR /opt/backend
RUN git clone https://github.com/annadrobek/nodeJS_backend /opt/backend
COPY . /opt/backend
RUN npm install --prefix /opt/backend
WORKDIR /opt/frontend
RUN git clone https://github.com/annadrobek/nodeJS_frontend /opt/frontend
COPY . /opt/frontend
RUN npm install --prefix /opt/frontend
EXPOSE 80
RUN npm install pm2 -g
CMD ["pm2-runtime", "/opt/frontend/process.yml"]
