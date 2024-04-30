import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Service } from "../models/service.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createService = asyncHandler(async (req, res) => {
    const { title, description, category, condition, location } = req.body

    if (!title || !description) {
        throw new ApiError(400, "Please enter Title and Description")
    }

    const service = await Service.create({
        title,
        description,
        category,
        location,
        provider: req.user._id
    })

    if (!service) {
        throw new ApiError(500, "Service cannot be created")
    }

    return res.status(201).json(new ApiResponse(200, service, "Service created successfully"))

})

const updateService = asyncHandler(async (req, res) => {
    const { serviceId } = req.params
    const { title, description } = req.body
    const service = await Service.findByIdAndUpdate(serviceId, {
        $set: {
            title,
            description
        }
    },
        {
            new: true
        })

    if (!service) {
        throw new ApiError(500, "Api Cannot be updated")
    }

    return res.status(202).json(new ApiResponse(200, service, "Service is successfully updated"))
})

const deleteService = asyncHandler(async (req, res) => {
    const { serviceId } = req.params

    const service = await Service.findByIdAndDelete(serviceId)
    if (!service) {
        throw new ApiError(500, "Service cannot be deleted, please send correct serviceId")
    }

    return res.status(200).json(new ApiResponse(200, service, "Service deleted successfully"))
})

const getService = asyncHandler(async (req, res) => {
    const { serviceId } = req.params
    const service = await Service.findById(serviceId)
    if (!service) {
        throw new ApiError(500, "Please enter correct service id")
    }

    return res.status(200).json(new ApiResponse(200, service, "Service fetched successfully"))
})

export { createService, updateService, deleteService, getService }