const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    // be sure to include its associated Products
    const categoryData = await Category.findAll(
      {
        include: [{ model: Product }]
      }
    );

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id,
      {
        include: [{ model: Product }]
      }
    );

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new category using data provided in the body of the request
    const categoryData = await Category.create(req.body);

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value using data provided in the body of the request
    //  'update' method returns an array
    const categoryData = await Category.update(req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (!categoryData[0]) { // Check if first element of the returned array is falsy
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const categoryData = await Category.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
