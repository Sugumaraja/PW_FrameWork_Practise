import {test, expect} from '../fixtures/baseFixtures'
import { isPromise } from "util/types";
import { LoginPage } from "../pages/LoginPage"
import { LoginPageFixture } from '../pages/LoginPageFixture';



test('Login page test', async ({ homePage }) => {
  let retVal=await homePage.getTitle();
    // let lpf = new LoginPageFixture(page);
    // await loginPage.goToLogin();
    // let hp= await loginPage.doLogin('tester@yopmail.com', 'Pass');
    // = await hp.getTitle();
      expect(retVal).toBe('My Account');
})