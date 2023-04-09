import {
  middlewareRequestData,
  Service,
  ServiceContext,
  ServiceRouter,
} from "./deps.ts";

const service = new Service();

const serviceRouter = new ServiceRouter();

serviceRouter.all("/", middlewareRequestData(), async (ctx) => {
  const { logger, config } = ctx.app.state as ServiceContext;
  const { requestData } = ctx.state;

  logger.debug("some");

  ctx.response.body = {
    message: "hello",
    requestData,
    config,
  };
});

service.addRouter(serviceRouter);

export { service };
