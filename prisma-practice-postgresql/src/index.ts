import { PrismaClient } from "@prisma/client";
import app from "./app";

const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

async function main(){
    app.listen(port, () => {
        console.log(`server is running at ${port}`)
    })
}
main();