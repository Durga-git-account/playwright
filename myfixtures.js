const base = require('@playwright/test');
const testdata = require("../tests/testdata.json");
const locators= require("../tests/locators.json");

exports.test = base.test.extend({
    Loginloc: async ({ }, use) => {
        const  loginloc=locators.xpath
        await use(loginloc);
    },
    Studentloc: async({ },use)=>{
            const  studenloc=locators.stcreation
            await use(studenloc);
     },
     Parentloc: async({},use)=>{
         const parentloc=locators.ptcreation
         await use(parentloc);
     },
     Logindata: async({}, use)=>{
        const logindata=testdata.Login
        await use(logindata);
     },
     Stdata: async({}, use)=>{
        const stdata=testdata.stcreate
        await use(stdata)
     },
     Ptdata: async({}, use)=>{
        const ptdata=testdata.ptcreate
        await use(ptdata)
     }
})