import "express-async-errors"
import express, { NextFunction, Request, Response } from "express"
import { router } from "./routes"
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
        status: "Error",
        message: error.message
    })
})

app.listen(3000, () => console.log("Servidor ONLINE - PORT: 3000 - [ http://localhost:3000/ ]"))