FROM nginx:alpine

COPY ./dist/ /usr/share/nginx/html

# Install Tini
RUN apk --no-cache --no-progress add tini

# Disable logging
RUN sed -ir 's/access_log.*/access_log off;/g' /etc/nginx/nginx.conf && \
  sed -ir 's/error_log.*/error_log off;/g' /etc/nginx/nginx.conf

ENTRYPOINT ["tini", "--", "nginx", "-g", "daemon off;"]
