let puppeteer = require("puppeteer");
let { password, userId } = require("./secrets");
let { from,to,date,passenger,paymentDetails,otherDetails } = require("./code");
(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized",]
        });
        let newTab = await browserInstance.newPage();
        await newTab.goto("https://www.irctc.co.in/nget/train-search",{waitUntil:'load',timeout:0});
        await waitAndClick("button.btn.btn-primary",newTab);

        await newTab.type("input[aria-controls='pr_id_1_list']", from, { delay: 200 });
        await newTab.type("input[aria-controls='pr_id_2_list']", to, { delay: 200 });
        await waitAndClick(".ng-tns-c59-10.ui-calendar",newTab);
        await  newTab.keyboard.down("Control");
        await newTab.keyboard.press("a");
        await  newTab.keyboard.up("Control");
        await newTab.type(".ng-tns-c59-10.ui-calendar", date, { delay: 200 });
        await waitAndClick(".ui-dropdown-trigger-icon.ui-clickable.ng-tns-c66-11.pi.pi-chevron-down",newTab);
        await waitAndClick("label[for='availableBerth']",newTab);
        await waitAndClick(".search_btn.train_Search",newTab);

        await waitAndClick("#divMain > div > app-train-list > div.col-sm-9.col-xs-12 > div > div.ng-star-inserted > div:nth-child(1) > div.form-group.no-pad.col-xs-12.bull-back.border-all > app-train-avl-enq > div.ng-star-inserted > div:nth-child(5) > div > table > tr > td:nth-child(1) > div > div:nth-child(1) > strong",newTab);
        await waitAndClick("#divMain > div > app-train-list > div.col-sm-9.col-xs-12 > div > div.ng-star-inserted > div:nth-child(1) > div.form-group.no-pad.col-xs-12.bull-back.border-all > app-train-avl-enq > div.col-xs-12 > div > span > span > button.btnDefault.train_Search.ng-star-inserted",newTab);
        await waitAndClick(".ng-tns-c57-14.ui-confirmdialog-acceptbutton.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-icon-left.ng-star-inserted",newTab);
        
        await waitAndClick("#userId",newTab);
        await newTab.type("#userId", userId, { delay: 200 });
        await waitAndClick("#pwd",newTab);
        await newTab.type("#pwd", password, { delay: 200 });
        console.log("Enter Captcha.");
        setTimeout(() => {
            waitAndClick(".search_btn.train_Search",newTab);
        }, 10000);
         
        for(let i=1;i<passenger.length;i++){
            await waitAndClick("#ui-panel-12-content > div > div.form-group.col-xs-12.padding.ng-tns-c79-60 > div.pull-left.ng-star-inserted > a > span",newTab);
        }

        for(let i=0;i<passenger.length;i++){
            let val=i+1;
            await waitAndClick("#ui-panel-12-content > div > div:nth-child("+`${val}`+") > div.col-sm-11.col-xs-12.remove-padding.pull-left > div > app-passenger > div > div:nth-child(1) > span > div.Layer_7.col-sm-3.col-xs-12 > p-autocomplete > span > input",newTab);
            await newTab.type("#ui-panel-12-content > div > div:nth-child("+`${val}`+") > div.col-sm-11.col-xs-12.remove-padding.pull-left > div > app-passenger > div > div:nth-child(1) > span > div.Layer_7.col-sm-3.col-xs-12 > p-autocomplete > span > input",passenger[i].name, { delay: 200 });
            await waitAndClick("#ui-panel-12-content > div > div:nth-child("+`${val}`+") > div.col-sm-11.col-xs-12.remove-padding.pull-left > div > app-passenger > div > div:nth-child(1) > span > div.Layer_7.col-sm-1.col-xs-6 > input",newTab);
            await newTab.type("#ui-panel-12-content > div > div:nth-child("+`${val}`+") > div.col-sm-11.col-xs-12.remove-padding.pull-left > div > app-passenger > div > div:nth-child(1) > span > div.Layer_7.col-sm-1.col-xs-6 > input", passenger[i].age, { delay: 200 });
            await waitAndClick("#ui-panel-12-content > div > div:nth-child("+`${val}`+") > div.col-sm-11.col-xs-12.remove-padding.pull-left > div > app-passenger > div > div:nth-child(1) > span > div.Layer_7.col-sm-2.col-xs-6 > select",newTab);
            await newTab.type("#ui-panel-12-content > div > div:nth-child("+`${val}`+") > div.col-sm-11.col-xs-12.remove-padding.pull-left > div > app-passenger > div > div:nth-child(1) > span > div.Layer_7.col-sm-2.col-xs-6 > select",passenger[i].gender);
            await newTab.keyboard.press("Enter");
        }

        await waitAndClick("input[formcontrolname='mobileNumber']",newTab);
        await newTab.type("input[formcontrolname='mobileNumber']", otherDetails.contact, { delay: 200 });
        await newTab.type("#aaa1", otherDetails.address, { delay: 200 });
        await newTab.type("input[formcontrolname='pinCode']", otherDetails.pin, { delay: 400 });
        await waitAndClick("#address-postOffice",newTab);
        await newTab.type("#address-postOffice","Bhali",{delay:500});
        await newTab.keyboard.press("Enter");

        await waitAndClick("label[for='autoUpgradation']",newTab);
        await waitAndClick(".ui-radiobutton-icon.ui-clickable.pi.pi-circle-on",newTab);
        await waitAndClick(".train_Search.btnDefault",newTab);

        console.log("Enter Captcha.");

        setTimeout(() => {
            waitAndClick(".train_Search.btnDefault",newTab);
        }, 15000);
        
        await waitAndClick("div.col-pad.col-xs-12.bank-text",newTab);
        await waitAndClick(".btn.btn-primary.hidden-xs.ng-star-inserted",newTab);

        await waitAndClick(".userCardNumber",newTab,{waitUntil:'load',timeout:0});
        await newTab.type(".userCardNumber",paymentDetails.cardNo,{delay:400});
        await waitAndClick("#validity",newTab);
        await newTab.type("#validity",paymentDetails.expiry,{delay:400});
        await waitAndClick("#divCvv",newTab);
        await newTab.type("#divCvv",paymentDetails.cvv,{delay:400});
        await waitAndClick("input[name='cardName']",newTab);
        await newTab.type("input[name='cardName']",paymentDetails.name,{delay:400});
        await waitAndClick("#confirm-purchase",newTab);
        
        let newPage = await browserInstance.newPage();
        await newPage.goto("https://web.whatsapp.com/");
        for(let i=0;i<passenger.length;i++){
            console.log(passenger[i].name);
            await sendWhatsappNotification(newPage,passenger[i].name);
        }
    } catch (err) {
        console.log(err);
    }
})();
async function waitAndClick(selector, newTab) {
    await newTab.waitForSelector(selector, { visible: true });
    let selectorClickPromise = newTab.click(selector);
    return selectorClickPromise;
}

async function sendWhatsappNotification(newPage,name){
    console.log(name);
    await waitAndClick("._2_1wd.copyable-text.selectable-text",newPage);
    await newPage.type("._2_1wd.copyable-text.selectable-text", name);
    await waitAndClick(".matched-text._3-8er",newPage);
    await waitAndClick("#main > footer > div.vR1LG._3wXwX.copyable-area > div._2A8P4 > div > div._2_1wd.copyable-text.selectable-text",newPage);
    await newPage.type("#main > footer > div.vR1LG._3wXwX.copyable-area > div._2A8P4 > div > div._2_1wd.copyable-text.selectable-text",
    `Congratulations ${name} !! Your ticket from ${from} to ${to} has been successfully booked. Please check your registered email.`,{delay:200})
    await waitAndClick("span[data-testid='send']",newPage);
}