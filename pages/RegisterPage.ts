import { Page, Locator } from '@playwright/test'
import { elementUtil } from '../Utility/elementUtil'


export class registerPage {
    private readonly page: Page;
    private readonly eleUtil: elementUtil;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly newsletterYesRadio: Locator;
    private readonly newsletterNoRadio: Locator;
    private readonly agreeCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly successMsg: Locator;


    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new elementUtil(page);

        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.emailInput = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephoneInput = page.getByRole('textbox', { name: 'Telephone' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' }).first();
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Password Confirm' });
        this.newsletterYesRadio = page.getByRole('radio', { name: 'Yes' });
        this.newsletterNoRadio = page.getByRole('radio', { name: 'No' });
        this.agreeCheckbox = page.locator('[name="agree"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.successMsg = page.getByText('Your Account Has Been Created!', { exact: true });

    }

    async doRegister(
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string,
        subscribeNewsletter: string
    ): Promise<string> {
        await this.eleUtil.doFill(this.firstNameInput, firstName);
        await this.eleUtil.doFill(this.lastNameInput, lastName);
        await this.eleUtil.doFill(this.emailInput, email);
        await this.eleUtil.doFill(this.telephoneInput, telephone);
        await this.eleUtil.doFill(this.passwordInput, password);
        await this.eleUtil.doFill(this.confirmPasswordInput, password);

        if (subscribeNewsletter === "Yes") {
            await this.eleUtil.doClick(this.newsletterYesRadio);
        } else {
            await this.eleUtil.doClick(this.newsletterNoRadio);
        }

        await this.eleUtil.doClick(this.agreeCheckbox);
        await this.eleUtil.doClick(this.continueButton);
        return await this.eleUtil.getInnerText(this.successMsg);


    }
}