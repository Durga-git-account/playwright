//const { expect } = require("@playwright/test");
const { test }= require("../tests/myfixtures");
const {Stptregistration}=require("../tests/Stptregistration");
test('agent student and parent registration', async ({ page, Loginloc,Studentloc,Parentloc,Logindata,Stdata,Ptdata}) => {
        const STPT= new Stptregistration(page, Loginloc,Studentloc,Parentloc,Logindata,Stdata,Ptdata);
        await STPT.Registration();
})

// test('TRP login', async ({ page }) => {
//         await page.goto("https://trp.test.det.nsw.edu.au/");
        
//         // Fill in the username and password
//         await page.fill('input[name="userName"]', 'qa1');
//         await page.fill('[name="password"]', 'M@ntisQA2020!!');
        
//         // Locate and click the "Sign in" button
//         await page.locator("input[type='submit']").click();
//         await expect(page).toHaveTitle("Temporary Residents Portal - DE International");  // Improved way to select by text
//         await page.locator("//input[@aria-label='Select all records']").check();
//         await page.locator("//mat-select[@id='mat-select-0']").click();
//         await page.waitForSelector('mat-option/span[value="Fee Exemption"]', { state: 'visible' });
//         await page.click('mat-option[value="Fee Exemption"]');
// });
// test.only('check', async ({ page }) => {
    
//         async function getRandomString(length) {
//             const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//             let result = '';
//             for (let i = 0; i < length; i++) {
//                 result += chars.charAt(Math.floor(Math.random() * chars.length));
//             }
//             return result;
//         }
    
//         // Correct way to log the random string
//         console.log(await getRandomString(5));
    
//     });
    



