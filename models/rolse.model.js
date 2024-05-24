const mongoose = require("mongoose")


const RolseShema = new mongoose.Schema({
    title: String,
    description: String,
    permissions:{
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false, 
    },
    deletedAt: Date
},{ timestamps: true })

const roles = mongoose.model("roles", RolseShema, "roles")

module.exports = roles;