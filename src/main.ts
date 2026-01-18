import { createServer } from "http";
import { Registry } from "@coolcinema/registry";

// Получаем конфиг Sales из реестра
const config = Registry.Sales;
const PORT = config.port;

const server = createServer((req, res) => {
  console.log(`[Sales] Received request: ${req.url}`);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      from: "Sales Service",
      message: "I am alive and ready to sell tickets!",
      timestamp: new Date().toISOString(),
    }),
  );
});

server.listen(PORT, () => {
  console.log(`🚀 ${config.name} is running on port ${PORT}`);
});
