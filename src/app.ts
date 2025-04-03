import { configuration } from "./config/config";
import server from "./server";

const port = configuration.port || 8080;

server.listen(port, () => console.log(`Server running on port: localhost:${port} `));
