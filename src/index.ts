import { fastifyAutoload } from "@fastify/autoload";
import Fastify from "fastify";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({
  logger:
    process.env.NODE_ENV === "production" ?
      true
    : {
        transport: {
          target: "pino-pretty",
          options: {
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          },
        },
      },
});

// This loads all plugins defined in plugins
fastify.register(fastifyAutoload, {
  dir: join(__dirname, "plugins"),
});

// This loads all plugins defined in routes
fastify.register(fastifyAutoload, {
  dir: join(__dirname, "routes"),
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
