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

app.post("/create_user_data", async (req, res) => {
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

app.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const deleteuser = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.json(deleteuser);
});

app.post("/house", async (req, res) => {
  try {
    const cre_hu_user = await prisma.house.create({ data: req.body });
    res.json(cre_hu_user);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ error: "An error occurred while creating the house" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
