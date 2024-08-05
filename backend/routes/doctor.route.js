import express from "express";
import { mockData } from "../config/mock-data.js";

const router = express.Router();

router.get("/api/doctor", (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    if (page < 1 || size < 1) {
      return res.status(400).send({
        status: false,
        message: "Page and size must be positive numbers.",
      });
    }

    const skip = (page - 1) * size;
    const filteredData = mockData.slice(skip, skip + size);

    const totalPages = Math.ceil(mockData.length / size);

    res.status(200).send({
      status: true,
      data: filteredData,
      count: filteredData.length,
      totalPages: totalPages,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
