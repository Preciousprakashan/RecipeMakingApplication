const multer = require("multer");
// Multer Configuration for File Uploads (to handle image uploads)
const storage = multer.diskStorage({}); // Configure Multer storage
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
});
 const uploadFields = upload.fields([
    { name: "recipeImage", maxCount: 1 }, // Single recipe image
    { name: "ingredientImages", maxCount: 10 }, // Multiple ingredient images
  ]);

  module.exports = uploadFields;