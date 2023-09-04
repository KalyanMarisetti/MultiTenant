const express = require('express');
const { getTenantModel } = require('./admindb');
const { getCustomerModel } = require('./tenantdb');
const app = express();

app.get('/tenant', async (req, res) => {
    let tenantNum = req.query.tenantNum;
    let tenantModel = await getTenantModel();                                           
    const tenant = new tenantModel({ tenantNum: tenantNum, name: tenantNum });
    let doc = await tenantModel.findOneAndUpdate({ tenantNum: tenantNum }, { tenantNum: tenantNum, name: tenantNum });
    if (!doc) {
        tenant.save();
    }
    res.send(JSON.stringify(tenant))
});

app.get('/customer', async (req, res) => {
    let tenantNum = req.query.tenantNum;
    let customerName = req.query.customer;
    let tenantModel = await getTenantModel();

    //find tenant
    let tenant = await tenantModel.findOne({ tenantNum: tenantNum });
    if (!tenant) return res.sendStatus(404);

    let customerModel = await getCustomerModel(tenantNum);
    const customer = new customerModel({ customerName });
    let doc = await customerModel.findOneAndUpdate({ customerName }, { customerName });;
    if (!doc) {
        customer.save()
    }
    res.send(JSON.stringify(customer))

})

const server = require('http').createServer(app);

server.listen(3000, () => {
    console.info('###############################################################');
    console.info(`\t\tMAIN SERVER RUNNING ON PORT:  ${3000}`);
    console.info('###############################################################');
})