const { StatusCodes } = require("http-status-codes");
const placeService = require("../services/service.place");
const { validationResult } = require("express-validator");

async function addPlace(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    const { name, latitude, longitude } = req.body;
    const place = await placeService.addPlace(name, latitude, longitude);
    res.status(StatusCodes.CREATED).json(place);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

async function deletePlace(req, res) {
  try {
    const { id } = req.params;
    await placeService.deletePlace(id);
    res.status(StatusCodes.NO_CONTENT).json({});
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

module.exports = {
  addPlace,
  deletePlace,
};
