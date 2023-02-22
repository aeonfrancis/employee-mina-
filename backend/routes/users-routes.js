import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

router.get("/",  async (req, res) => {
  try {
    const users = await pool.query("select * from users ");
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:user_id",  async (req, res) => {
  try {
    const users = await pool.query("select * from users where user_id=$1", [
      req.params.user_id,
    ]);
    res.json({ users: users.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// authenticateToken,
router.post("/",  async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
      "insert into users (name,email,password,user_type,status) values ($1,$2,$3,$4,$5)",
      [
        req.body.name,
        req.body.email,
        hashedPassword,
        "staff",
        "Active",
      ]
    );
    res.json({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:user_id", async (req, res) => {
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
      "update users set name=$1, email=$2, user_type=$3, status=$4 where user_id=$5",
      [
        req.body.name,
        req.body.email,
        // hashedPassword,
        req.body.user_type,
        req.body.status,
        req.params.user_id,
      ]
    );
    res.json({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:user_id",  async (req, res) => {
  try {
    const users = await pool.query("delete from users where user_id=$1", [
      req.params.user_id,
    ]);
    return res.status(200).json("Deleted!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
