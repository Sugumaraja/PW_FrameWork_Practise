import { test, expect } from '../fixtures/baseFixtures';
import fs from 'fs'
import {parse}from 'csv-parse/sync'
import { LoginPageFixture } from '../pages/LoginPageFixture';
import{registerPage} from '../pages/RegisterPage'




type users = {
    firstName: string,
    lastName: string,
    telephone: string,
    password: string,
    subscribeNewsletter: string
}
const content=fs.readFileSync('./DataProvider/csvData.csv','utf-8');
const data:users[]=parse(content,{
    columns:true,
    skip_empty_lines:true
})
for(let user of data){
test(`Registration page test${user.firstName}`,async({page,baseURL})=>{

    const loginPage = new LoginPageFixture(page);
    await loginPage.home(baseURL);
    const registerPage: registerPage = await loginPage.navigateToRegisterPage();
    const isUserRegistered: string = await registerPage.doRegister(
        user.firstName,
        user.lastName,
        getRandomEmail(),
        user.telephone,
        user.password,
        user.subscribeNewsletter);
        console.log(isUserRegistered+'**************************');
    expect(isUserRegistered).toBe('Your Account Has Been Created!');
})}

function getRandomEmail(): string {
    // randomUUID
    const val=Math.random().toString(36).substring(5);
    return (`pw${val}@nal.com`)
}
