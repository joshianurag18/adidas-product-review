FROM mhart/alpine-node:12.20 as builder

WORKDIR /app

COPY . /app

# ARG NPM_USERNAME
# ARG NPM_TOKEN

RUN apk add --no-cache binutils=2.31.1-r2 && \
    echo "$NPM_USERNAME:$NPM_TOKEN" > /tmp/auth && \
    npm config set update-notifier false && \
    npm config set "@falabella-gitlab:registry=https://gitlab.com/api/v4/packages/npm/" && \
    npm config set "//gitlab.com/api/v4/packages/npm/:_authToken=$NPM_TOKEN" && \
    npm config set "//gitlab.com/api/v4/projects/23294368/packages/npm/:_authToken=$NPM_TOKEN" && \
    npm ci --no-audit --production && \
    rm -rf /tmp/auth && \
    strip /usr/bin/node


FROM alpine:3.11
WORKDIR /app
COPY --from=builder /usr/bin/node /usr/bin/
COPY --from=builder /usr/lib/libgcc* /usr/lib/libstdc* /usr/lib/
COPY --from=builder /app /app

RUN apk add --no-cache tini=0.18.0-r0
RUN apk add --no-cache curl=7.67.0-r3

ENV PORT=4444 \
    NODE_ENV=production \
    MAX_EVENT_LOOP_DELAY=1000 \
    MAX_RSS_BYTES=0 \
    MAX_HEAP_USED_BYTES=0 \
    MAX_AGE=86400

EXPOSE $PORT

# an init entrypoint that simplifies signal handling
COPY entryPoint.sh /usr/bin/entrypoint
ENTRYPOINT ["tini", "--"]
CMD ["entrypoint"]
