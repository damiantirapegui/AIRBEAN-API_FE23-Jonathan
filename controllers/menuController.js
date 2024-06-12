import db from "../db/database.js";
import Joi from "joi";
import menu from "../services/menu.js";

const productSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  desc: Joi.string().required(),
  price: Joi.number().required(),
});

const updateProductSchema = Joi.object({
  title: Joi.string().required(),
  desc: Joi.string().required(),
  price: Joi.number().required(),
});

// Add new product to menu.
const addProduct = async (req, res) => {
  try {
    const { id, title, desc, price } = req.body;
    const newProduct = {
      _id: id,
      title,
      desc,
      price,
      createdAt: new Date().toISOString(),
    };
    menu.push(newProduct);

    await db["company"].update({ type: "menu" }, { $set: { data: menu } }, {});
    return res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    return res.status(500).send({ error: "Could not add product" });
  }
};

// Update product from menu.
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, price } = req.body;

    const { error } = updateProductSchema.validate({ title, desc, price });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const menuData = await db["company"].findOne({ type: "menu" });

    if (!menuData) {
      return res.status(404).json({ error: "Menu not found" });
    }

    const productIndex = menuData.data.findIndex(
      (product) => product._id === parseInt(id, 10)
    );
    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedProduct = {
      ...menuData.data[productIndex],
      title,
      desc,
      price,
      modifiedAt: new Date().toISOString(),
    };
    menuData.data[productIndex] = updatedProduct;

    await db["company"].update(
      { type: "menu" },
      { $set: { data: menuData.data } },
      {}
    );
    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ error: "Could not update product" });
  }
};

const deleteProductFromMenu = async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);

    const menuData = await db["company"].findOne({ type: "menu" });
    const productIndex = menuData.data.findIndex(
      (product) => product._id === productId
    );

    if (productIndex != -1) {
      menuData.data.splice(productIndex, 1);
      await db["company"].update(
        { type: "menu" },
        { $set: { data: menuData.data } },
        {}
      );
      return res.status(200).json({ message: "Product removed successfully" });
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error removing prdouct from menu", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { addProduct, updateProduct, deleteProductFromMenu };
