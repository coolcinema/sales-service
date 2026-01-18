import * as path from "path";
import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import { PlatformGrpcServer, getCurrentContext } from "@coolcinema/foundation";
import { Registry } from "@coolcinema/registry";

// 1. Загружаем Proto файл
const PROTO_PATH = path.join(__dirname, "proto/sales.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const salesService = protoDescriptor.coolcinema.sales.SalesService;

// 2. Реализация бизнес-логики
const implementation = {
  getPrice: (call: any, callback: any) => {
    // ПРОВЕРКА: Достаем контекст, который распаковала Foundation
    const ctx = getCurrentContext();

    console.log("--- [Sales] gRPC Request Received ---");
    console.log("Trace ID:", ctx?.traceId);
    console.log("Routing Headers:", ctx?.routingHeaders);

    // Эмуляция работы
    callback(null, { amount: 500, currency: "RUB" });
  },
};

// 3. Запуск сервера через Foundation
async function bootstrap() {
  const server = new PlatformGrpcServer();

  // Добавляем сервис (Foundation сама обернет методы в контекст)
  server.addService(salesService.service, implementation);

  await server.listen(Registry.Sales.port);
}

bootstrap();
