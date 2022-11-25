FROM node:16
LABEL maintainer="annadrobek&radoslawbiereta"
RUN git clone https://github.com/annadrobek/nodeJS_backend /opt/backend
RUN npm install --prefix /opt/backend
RUN git https://github.com/annadrobek/nodeJS_frontend /opt/frontend
RUN npm install --prefix /opt/frontend
COPY . .
EXPOSE 80
RUN npm install pm2 -g
CMD ["pm2-runtime", "/opt/frontend/process.yml"]
