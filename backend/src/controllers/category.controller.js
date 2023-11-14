import Category from "../models/Category.js"
const createCategory = async (req, res) => {
    const name = req.body.name.toUpperCase()
    try {
        const categoryDB = await Category.findOne({ name })
        if (categoryDB) {
            return res.status(400).json({
                msg: `The category ${categoryDB.name} already exists`
            })
        }

        // create slug

        const slug = name.split(" ").join("-")

        const data = {
            name,
            slug,
            user: req.user._id
        }

        const category = new Category(data)
        await category.save()
        res.status(201).json(category)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Something went wrong"
        })
    }
}

const getCategories = async (req, res) => {
    const { limit = 5, from = 0 } = req.query
    const query = { status: true }
    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate("user", "name")
            .skip(Number(from))
            .limit(Number(limit))
    ])
    res.json({
        total,
        categories
    })
}

const getCategory = async (req, res) => {
    const { id } = req.params
    try {
        const category = await Category.findById(id).populate("user", "name")
        res.json(category)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Something went wrong"
        })
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params

    try {
        const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true })
        res.json(category)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Something went wrong"
        })
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params
    const { status, user, ...data } = req.body
    try {
        data.name = data.name.toUpperCase()
        data.slug = data.name.split(" ").join("-")
        data.user = req.user._id

        const category = await Category.findByIdAndUpdate(id, data, { new: true })
        res.json(category)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Something went wrong"
        })  
    }

}

export {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}