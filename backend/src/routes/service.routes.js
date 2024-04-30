import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { createService, updateService, deleteService, getService } from '../controllers/service.controller.js'

const router = Router()

router.use(verifyJWT)

router.route("/create").post(createService)
router.route("/:serviceId").patch(updateService).delete(deleteService).get(getService)

export default router