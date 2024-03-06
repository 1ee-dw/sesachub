const express = require("express");
const router = express.Router();
const controller = require("../controller/Cprofile");

/* ----------------- GET ----------------- */
// /profile
router.get("/", controller.main);

// /profile/confirmation
router.get("/confirmation", controller.confirmation);

// /profile/posting
router.get("/posting", controller.posting);

// /profile/deleteAccount
router.get("/deleteAccount", controller.deleteAccount);

// /profile/user
router.get("/user", controller.findOneUser);

// /profile/reservation
router.get("/reservation", controller.findAllReservation);

/* ----------------- PATCH ----------------- */
// /profile
router.patch("/", controller.updateProfile);

/* ----------------- DELETE ----------------- */
// /profile/reservation
router.delete("/reservation", controller.deleteReservation);

module.exports = router;
