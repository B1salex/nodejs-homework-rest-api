const express = require("express");
const router = express.Router();
const books = require("../../models/books");
const Joi = require("joi");

const { HttpError } = require("../../helpers");

// схема за допомогою якої ми описуємо в якому форматі та що саме юзер може додавати у базу данних. Бо без Joi (обмежувач) від зможе додати не повні дані
const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
});

router.get("/", async (req, res) => {
  try {
    const result = await books.getAll();
    res.json(result);
  } catch (error) {
    // res.status(500).json({
    //   message: "Server error",
    // });
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await books.getById(id);
    if (!result) {
      throw HttpError(404, "Not found");
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;
      // return res.status(404).json({
      //   message: "Not found",
      // });
    }
    res.json(result);
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   message: "Server error",
    // });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    // console.log(error);
    // console.log(req.body);
    const result = await books.add(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/id:", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const { id } = req.params;
    const result = await books.updById(id, req.body);
    if (!result) {
      throw HttpError(404, error.message);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

// test new branch

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await books.delById(id);
    if (!result) {
      throw HttpError(404, "Not found requested file");
    }
    // res.status(204).send()
    res.json({
      message: "Delete succes",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
