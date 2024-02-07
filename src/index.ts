import { app } from "./infra/http/app";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[App]: Server listening on ${PORT}`)
});