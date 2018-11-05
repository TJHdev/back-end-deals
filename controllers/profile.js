const handleProfileGet = db => (req, res) => {
  const { userId } = req.params;

  db.select("*")
    .from("users")
    .where({ id: userId })
    .then(
      user => {
        if (user.length) {
          res.json(user[0]);
        } else {
          res.status(400).json("Couldn't find a user with that ID");
        }
      },
      err => {
        res.status(400).json("Couldn't find a user with that ID");
      }
    );
};

module.exports = {
  handleProfileGet
};
