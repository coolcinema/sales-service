import { createServer } from "nice-grpc";
import { SalesService } from "@coolcinema/catalog";

class SalesImpl implements SalesService.SalesServiceImplementation {
  async getPrice(req: SalesService.GetPriceRequest) {
    console.log(`[Sales] Calculating price for ${req.showtimeId}`);
    return { amount: 999, currency: "RUB" };
  }
}

async function main() {
  const server = createServer();
  server.add(SalesService.SalesServiceDefinition, new SalesImpl());
  await server.listen("0.0.0.0:5001");
  console.log("🚀 Sales Service listening on 5001");
}
main();
