import db from "../db/database.js";
import Joi from "joi";

const addPromotionSchema = Joi.object({
  id: Joi.number().required(),
  products: Joi.string().required(),
  price: Joi.number().required(),
});

const addPromotion = async (req, res) => {
  try {
    const { products, price, id } = req.body;
    const newPromotion = {
      _id: id,
      price: price,
      products: products,
    };

    const insertedPromotion = await db.promotions.insert(newPromotion);
    return res.status(201).json({
      message: "Promotion added successfully",
      promotion: insertedPromotion,
    });
  } catch (error) {
    console.error("Error adding promotion:", error);
    return res.status(500).json({ error: "Could not add promotion" });
  }
};

const getPromotions = 

export { addPromotion };
