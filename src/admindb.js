const { connect } = require('./db-connection');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/admindb';

let db;
const tenantSchema = new mongoose.Schema({
    tenantNum: {
        type: Number
    },
    name: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
}, { timestamps: true });

const tenantModel = mongoose.model('tenants', tenantSchema);

const getDb = async () => {
    return db ? db : await connect(url)
};
const getTenantModel = async () => {
    const adminDb = await getDb();
    return adminDb.model('tenants', tenantSchema)
};

module.exports = { getTenantModel };