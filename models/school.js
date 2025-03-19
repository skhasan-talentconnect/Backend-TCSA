import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    urls: {
        type: String,
        required: false
    },
    boards: {
        type: String,
        required: true
    },
    fee: {
        type: String,
        required: false
    },
    uptoStd: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    phNo: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    webUrl: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

const School = mongoose.model("School", schoolSchema);

export default School;