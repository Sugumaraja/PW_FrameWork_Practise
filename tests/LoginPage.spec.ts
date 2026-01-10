import { test, expect ,BrowserContext} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage"



test('Login page test', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.goToLogin();
    let hp= await loginPage.doLogin('tester@yopmail.com', 'Pass');
    let retVal= await hp.getTitle();
      await expect(page).toHaveTitle(retVal);
})