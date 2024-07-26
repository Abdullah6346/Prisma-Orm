const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const port = 3000;
const prisma = new PrismaClient();
app.use(express.json());

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/", async (req, res) => {
  try {
    const createdata = await prisma.user.create({ data: req.body });
    res.json(createdata);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "failed to crete data", error: err.message });
  }
});

app.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const age = req.body.age;
  const updatedage = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      age: age,
    },
  });
  res.json(updatedage);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
