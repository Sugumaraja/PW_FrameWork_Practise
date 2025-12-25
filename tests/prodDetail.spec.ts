import { test, expect } from '@playwright/test'
import { productListPage } from '../pages/ProductListPage';
import { LoginPage } from '../pages/LoginPage';
import { productDetailPage } from '../pages/ProductDetailPage'
let users=[
    {uName:'sugu@nal.com',pwd:'Pass'},
    {uName:'sang@nal.com',pwd:'Pass'}
]
for (let login of users){
test(`product validation of ${login.uName}`, async ({ page }) => {
    let lp = new LoginPage(page);
    await lp.goToLogin();
    await lp.doLogin(login.uName, login.pwd);
    let plp: productListPage = await lp.doSearchProduct('mac')
    let dp: productDetailPage = await plp.selectProduct(1);
    let actual = await dp.getProdDetails('exPrice');
    expect(actual).toBe('$100.00');
})
}