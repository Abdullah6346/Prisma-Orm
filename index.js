const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const port = 3000;
const prisma = PrismaClient();

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
