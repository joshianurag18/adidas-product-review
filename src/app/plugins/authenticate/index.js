"use-strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
    fastify.register(require("fastify-jwt"), {
        // Sample Code , Need to put in gitlab secure variable with Admin Access only
        secret: "asecretthatsverylongandimportedfromanenvfile"
    }) 

    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })
})