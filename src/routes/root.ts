import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const root: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.route({
    method: "GET",

    url: "/",

    handler: async (request, reply) => {
      reply.send({ root: true });
    },
  });
};

export default root;
