var express = require('express');
var router = express.Router();

let users = [
  { id: 1, name: "Jose" },
  { id: 2, name: "Leidys" },
  { id: 3, name: "Antonio" },
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.status(200).json(users)
});

router.get('/:id', function(req, res, next) {
  const { id = null } = req.params
  if (!id) return res.status(400).json({"message": "Bad request"})
  const user = users.find(user => user.id === Number(id))
  if (!user) return res.status(404).json({"message": "User not found"})
  return res.status(200).json(user)
});

router.post('/', function(req, res, next) {
  const { name = null } = req.body
  if (!name) return res.status(422).json({"message": "name field is required"})
  const user = {
    id: Math.max(...users.map(user => user.id)) + 1,
    name
  }
  users.push(user)
  return res.status(201).json(user)
});

router.put('/:id', function(req, res, next) {
  const { id = null } = req.params
  const { name = null } = req.body
  if (!id) return res.status(400).json({"message": "Bad request"})
  if (!name) return res.status(422).json({"message": "name field is required"})
  const user = users.find(user => user.id === Number(id))
  if (!user) return res.status(404).json({"message": "User not found"})
  const updatedUser = {
    id: Number(id),
    name,
  }
  users.forEach((user, index) => {
    if (user.id === Number(id)) {
      users[index] = updatedUser
    }
  })
  return res.status(200).json(updatedUser)
});

router.delete('/:id', function(req, res, next) {
  const { id = null } = req.params
  if (!id) return res.status(400).json({"message": "Bad request"})
  const user = users.find(user => user.id === Number(id))
  if (!user) return res.status(404).json({"message": "User not found"})
  users = users.filter(user => user.id !== Number(id))
  return res.status(200).json(user)
});

module.exports = router;
