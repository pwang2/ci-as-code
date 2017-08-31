FROM nginx:1-alpine

COPY nginx.conf /etc/nginx/nginx.conf.orig
COPY dist       /usr/share/nginx/html

# should be override by docker run -e
ENV API_HOST="http://API_HOST"
ENV ALLOW_SOURCEMAP="1"

CMD envsubst '\$API_HOST, \$ALLOW_SOURCEMAP' < /etc/nginx/nginx.conf.orig > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
