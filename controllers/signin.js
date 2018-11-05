const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);

      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then(data => {
            res.json(data[0]);
          })
          .catch(err => {
            res.status(400).json(err.detail);
          });
      } else {
        res.status(400).json("Credential don't match");
      }
    })
    .catch(err => {
      res.status(400).json("Credentials don't match");
    });
};

module.exports = {
  handleSignin: handleSignin
};
