import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Item } from "../models/item.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createItem = asyncHandler(async (req, res) => {
    const { title, description, category, condition, location } = req.body

    if (!title || !description) {
        throw new ApiError(400, "Title and description is required")
    }

    const item = await Item.create({
        title,
        description,
        category,
        condition,
        location,
        owner: req.user._id
    })

    if (!item) {
        throw new ApiError(500, "Item cannot be created")
    }
    return res.status(201).json(new ApiResponse(200, item, "Item created successfully"))
})

const updateItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params
    const { title, description } = req.body
    const item = await Item.findByIdAndUpdate(itemId, {
        $set: {
            title,
            description
        }
    },
        {
            new: true
        })

    if (!item) {
        throw new ApiError(500, "Api Cannot be updated")
    }

    return res.status(202).json(new ApiResponse(200, item, "Item is successfully updated"))
})

const deleteItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params

    const item = await Item.findByIdAndDelete(itemId)
    if (!item) {
        throw new ApiError(500, "Item cannot be deleted, please send correct itemID")
    }

    return res.status(200).json(new ApiResponse(200, item, "Item deleted successfully"))
})

const getItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params
    const item = await Item.findById(itemId)
    if (!item) {
        throw new ApiError(500, "Please enter correct Item id")
    }

    return res.status(200).json(new ApiResponse(200, item, "Item fetched successfully"))
})


export { createItem, deleteItem, updateItem, getItem }