const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    // be sure to include its associated Product data
    const tagData = await Tag.findAll(
      {
        include: [
          { 
            model: Product,
            through: {
              attributes: []  // Remove attributes from the relational model/table from output
            }
          }
        ]
      }
    );

    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    const tagData = await Tag.findByPk(req.params.id,
      {
        include: [
          { 
            model: Product,
            through: {
              attributes: []  // Remove attributes from the relational model/table from output
            }
          }
        ]
      }
    );

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new tag using data provided in the body of the request
    const tagData = await Tag.create(req.body);

    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a tag's name by its `id` value using data provided in the body of the request
    //  'update' method returns an array
    const tagData = await Tag.update(req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (!tagData[0]) { // Check if first element of the returned array is falsy
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete on tag by its `id` value
    const tagData = await Tag.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
