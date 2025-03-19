import express from "express";
import School from "../models/school.js";

const router = express.Router();

// Add School Data
router.post("/schools/addData", async (req, res) => {
    const { name, desc, urls, boards, fee, uptoStd, mode, phNo, mail, webUrl, state, city, address } = req.body;

    try {
        const school = await School.create({
            name,
            desc,
            urls,
            boards,
            fee,
            uptoStd,
            mode,
            phNo,
            mail,
            webUrl,
            state,
            city,
            address,
        });

        res.status(201).json(school);
    } catch (err) {
        res.status(404).json({ error: "Error " + err });
    }
});

// Get School Data by Email
router.get("/schools/getData/:mail", async (req, res) => {
    const { mail } = req.params;

    try {
        console.log(mail);
        const school = await School.findOne({ mail });

        res.status(200).json(school);
    } catch (err) {
        res.status(500).json({ error: "Error " + err });
    }
});

// Delete School Data by Email
router.delete("/schools/delData/:mail", async (req, res) => {
    const { mail } = req.params;

    try {
        await School.deleteOne({ mail });

        res.status(200).json("Deleted Successfully");
    } catch (err) {
        res.status(500).json({ error: "Error " + err });
    }
});

// Update School Data by Email
router.put("/schools/updateData/:mail", async (req, res) => {
    const { mail } = req.params;
    const updatedData = req.body;

    try {
        const school = await School.findOneAndUpdate({ mail }, { $set: updatedData }, { new: true });

        if (!school) {
            return res.status(404).json({ error: "School not found" });
        }

        res.status(200).json({ message: "Updated Successfully", data: school });
    } catch (err) {
        res.status(500).json({ error: "Error " + err });
    }
});

// Get Schools by State & City
router.get("/schools", async (req, res) => {
    try {
        const { state, city } = req.query;
        const schools = await School.find({ state, city });

        res.json(schools);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

export default router;