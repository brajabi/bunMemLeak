import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/download", () => {
    // public
    const filePath = process.cwd() + "/public/RandomFile.zip";
    const randomFile = Bun.file(filePath);
    // const fileBuffer = await randomFile.arrayBuffer()

    // Return subtitle file as response
    return new Response(randomFile.stream(), {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="RandomFile.zip"`,
        "Content-Length": randomFile.size.toString(),
      },
    });
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
