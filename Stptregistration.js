exports.Stptregistration=class Stptregistration{

        constructor(page, Loginloc,Studentloc,Parentloc,Logindata,Stdata,Ptdata){
                this.page=page;
                this.loginloc=Loginloc;
                this.Data=Logindata;
                this.stlocator=Studentloc;
                this.stdata=Stdata
                this.ptcreateloc=Parentloc;
                this.ptdata=Ptdata;
        }
        async Registration(){
                await this.login();
                const gdprnationality=await this.Stcreate();
                await this.Ptcreate(gdprnationality);
        } 
        async login(){
                await this.page.goto(this.Data.URL);
                await expect(this.page).toHaveTitle(/Online Application Portal - DE International - Agent/);
                await this.page.fill(this.loginloc.username ,this.Data.username);
                await this.page.fill(this.loginloc.password ,this.Data.password);
                await this.page.locator(this.loginloc.signin).click(); 
                await this.page.waitForSelector(this.loginloc.login);
                await expect(this.page,{timeout:60000}).toHaveTitle(/Online Application Portal - DE International - Dashboard - Agent/);
        }

        async  Stcreate() {    

        await this.page.click(this.loginloc.stmanagement);
        await this.page.click(this.stlocator.create);
                if(this.stdata.studentnum!=null){
                        await this.page.click(this.stlocator.Nswpastyes);
                        await this.page.fill(this.stlocator.stnumber, this.stdata.studentnum);
                }else{
                        await this.page.click(this.stlocator.NSWpaststd);
                }
        const stname = this.stdata.givenName + await this.getRandomString(5);
        await this.page.fill(this.stlocator.givenname, stname);
        await this.page.fill(this.stlocator.familyname, this.stdata.familyName);
        await this.page.click(this.stlocator.calendericon);
        await this.page.click(this.stlocator.month);
        await this.page.locator(this.stdata.Dyear).click();
        await this.page.locator(this.stdata.Dmonth).click();
        await this.page.locator(this.stdata.Ddate).click();
        await this.page.click(this.stlocator.gender);
        await this.page.click(this.stlocator.countryofbirth);
        await this.page.click(this.stlocator.countryname);
        await this.page.click(this.stlocator.nationality);
        //await this.page.click(this.stlocator.nationalityname);
        await this.page.click(this.stlocator.gdpr);
        const gdprnationality = await this.page.locator(this.stlocator.nationality).innerText();
        console.log("student nationality:",gdprnationality);
            
        await this.page.click(this.stlocator.passport);
        const path = require('path');
        await this.page.locator(this.stlocator.uploadfile).setInputFiles(path.join('D:/DEI-Automation/Agent-ST PR creation', 'file-sample_150kB.pdf'));
        await this.page.click(this.stlocator.program);
        await this.page.click(this.stlocator.createstudent); 
        const Message = await this.page.locator('h1#dialogtitle').textContent();

                if (Message === ' Success ') {
                        
                        await this.page.click(this.stlocator.success);
                        console.log("Student record is created and parent screen is displayed");
                        const createParentPopup = this.page.locator(this.stlocator.parentpage);
                        await expect(createParentPopup).toHaveText(/Create Parent Account/);   
                } else{
                        console.log("student is not created")
                }   
                return gdprnationality;
        }

        async  Ptcreate(gdprnationality){
        await this.page.click(this.ptcreateloc.relation);
        await this.page.click(this.ptcreateloc.parent1);
        await this.page.fill(this.ptcreateloc.p1givenname, this.ptdata.p1givenname);
        await this.page.fill(this.ptcreateloc.p1familyname, this.ptdata.p1familyname);
        await this.page.fill(this.ptcreateloc.p1dob, this.ptdata.p1dob);
        await this.page.click(this.ptcreateloc.p1gender);
        await this.page.click(this.ptcreateloc.p1countryofbirth);
        await this.page.locator(this.ptcreateloc.country,{ hasText: 'Canada' }).click();
        await this.page.click(this.ptcreateloc.p1currentpassport);
        const path = require('path');
        await this.page.locator(this.ptcreateloc.p1uploadfile).nth(0).setInputFiles(path.join('D:/DEI-Automation/Agent-ST PR creation', 'file-sample_150kB.pdf'));
        await this.page.locator(this.ptcreateloc.p1mobilecountrycode).click();
        await this.page.locator(this.ptcreateloc.countrycode,{ hasText: 'Canada' }).click();
        await this.page.fill(this.ptcreateloc.p1mobile,this.ptdata.p1mobile );
        await this.page.fill(this.ptcreateloc.p1email, this.ptdata.p1email);
        await this.page.fill(this.ptcreateloc.p1verifyemail, this.ptdata.p1email);
        await this.page.locator(this.ptcreateloc.p2relation).click();
        await this.page.locator(this.ptcreateloc.parent2,{hasText: ' Mother '}).click();
        await this.page.fill(this.ptcreateloc.p2givenname,this.ptdata.p2givenname);
        await this.page.fill(this.ptcreateloc.p2familyname,this.ptdata.p2familyname);
        await this.page.fill(this.ptcreateloc.p2dob,this.ptdata.p2dob);
        await this.page.click(this.ptcreateloc.p2gender);
        await this.page.locator(this.ptcreateloc.p2countryofbirth).click();
        await this.page.locator(this.ptcreateloc.country,{ hasText: 'Canada' }).click();
        await this.page.click(this.ptcreateloc.p2currentpassport);
        const path1 = require('path');
        await this.page.locator(this.ptcreateloc.p2uploadfile).nth(1).setInputFiles(path1.join('D:/DEI-Automation/Agent-ST PR creation', 'file-sample_150kB.pdf'));
        await this.page.locator(this.ptcreateloc.p2mobilecountrycode).click();
        await this.page.locator(this.ptcreateloc.countrycode,{hasText: 'Canada' }).click();
        await this.page.fill(this.ptcreateloc.p2mobile, this.ptdata.p2mobile);
        await this.page.fill(this.ptcreateloc.p2email,this.ptdata.p2email);
        await this.page.fill(this.ptcreateloc.p2verifyemail,this.ptdata.p2email);
        console.log("student nationality:", gdprnationality);
                const gdprRequiredCountries = ['Italy', 'Belgium'];
                if (gdprRequiredCountries.includes(gdprnationality.trim())) {
                const path2 = require('path');
                 await this.page.locator(this.ptcreateloc.gdprfile).nth(2).setInputFiles(path2.join('D:/DEI-Automation/Agent-ST PR creation', 'file-sample_150kB.pdf'));
                }

        await this.page.click(this.ptcreateloc.parents);
        await this.page.click(this.ptcreateloc.Nominateparent);        
        await this.page.click(this.ptcreateloc.createparent);
        await this.page.waitForSelector(this.ptcreateloc.successpopup, { timeout: 6000000 }); 
        const successPopup = this.page.locator(this.ptcreateloc.successpopup); 
        await expect(successPopup).toHaveText(/Success/); 

                if (await successPopup.textContent() === " Success ") {
                        if(await this.ptdata.gotostvisa==="Yes"){
                                await this.page.click(this.ptcreateloc.clickyes);
                                console.log("parent is created");
                                await expect(this.page).toHaveTitle("Online Application Portal - DE International - Student visa - Study program")}
                        else{
                                       await this.page.click(this.ptcreateloc.successno);
                                       await this.page.fill("[id='search_student-application-name']",this.stdata.givenName); 
                                       await this.page.locator(this.ptcreateloc.createnewapplication).click();
                                       await expect(this.page).toHaveTitle("Online Application Portal - DE International - Student visa - Study program")
                        }
                }else {  
                console.log("parent is not created for this student");
                }
                }
                async getRandomString(length) {
                        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                        let result = '';
                        for (let i = 0; i < length; i++) {
                            result += chars.charAt(Math.floor(Math.random() * chars.length));
                        }
                        return result;
                    }               
                                                       
                                 

   

           }     
const { expect } = require('@playwright/test');