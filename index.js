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
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the house" });
  }
});
app.get("/house", async (req, res) => {
  const allHouses = await prisma.house.findMany({
    include: {
      owner: true,
      builtby: true,
    },
  });
  res.json(allHouses);
});

//  getting a specific a house by its id
app.get("/house/:id", async (req, res) => {
  const id = req.params.id;
  const allHouses = await prisma.house.findUnique({
    where: { id: id },
    include: {
      owner: true,
      builtby: true,
    },
  });
  res.json(allHouses);
});

app.post("/school", async (req, res) => {
  try {
    const cre_sch_dat = await prisma.school.create({ data: req.body });
    res.json(cre_sch_dat);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the school" });
  }
});
app.post("/child", async (req, res) => {
  try {
    const { names, child_school_id, father_names_id } = req.body;

    const cre_chil_dat = await prisma.userchild.create({
      data: {
        names: names,
        child_school_id: { connect: { id: child_school_id } },
        father_names_id: { connect: { id: father_names_id } },
      },
    });

    res.json(cre_chil_dat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
