FROM nginx:1.19.6

COPY dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/nginx.conf
