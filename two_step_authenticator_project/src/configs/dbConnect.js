import { connect } from "mongoose";

const dbConnect = async () => {
    try {
        const mongodbConnect = await connect(process.env.MONGODB_KEY)
        console.log(`Database connected successfully ${mongodbConnect.connection.host}`)
    } catch (err) {
        console.log(`database connection error ${err}`)
        process.exit(1)
    }

}

export default dbConnect