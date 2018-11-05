const Clarifai = require("clarifai");

const app =
  process.env.NODE_ENV === "production"
    ? new Clarifai.App({
        apiKey: process.env.CLARIFAI_API_KEY
      })
    : new Clarifai.App({
        apiKey: "replace with an API key"
      });

const handleApiCall = () => (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(
    function(response) {
      res.json(response);
    },
    function(err) {
      res.status(400).json("Ooops something went wrong with the Clarifai API");
    }
  );
};

const handleImage = db => (req, res) => {
  const { id, count } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", count)
    .returning("entries")
    .then(
      entries => {
        res.json(entries[0]);
      },
      err => {
        res.status(400).json("Couldn't increment entries for that user.");
      }
    );
};

// const test = () => (req, res) => {
//   app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(
//     function(response) {
//       res.json(response);
//     },
//     function(err) {
//       res.status(401).json(err);
//     }
//   );
// };

// const simpletest = () => (req, res) => {
//   app.models
//     .predict(
//       Clarifai.FACE_DETECT_MODEL,
//       "https://samples.clarifai.com/face-det.jpg"
//     )
//     .then(
//       function(response) {
//         res.json(response);
//       },
//       function(err) {
//         res.status(400).json(err);
//       }
//     );
// };

module.exports = {
  handleImage,
  handleApiCall
  // test,
  // simpletest
};
