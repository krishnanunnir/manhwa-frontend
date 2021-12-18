FROM node:14.4.0-alpine3.10

WORKDIR /app/frontend
COPY . /app/frontend/
ARG API_URL
ENV REACT_APP_PROXY_HOST $API_URL
RUN yarn
RUN yarn build
