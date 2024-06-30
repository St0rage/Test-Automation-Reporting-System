import { Web } from "./application/web";
import { container } from "./inversify.config";

const app = container.get<Web>(Web);
app.start(7000);
