import { Page, Locator  } from '@playwright/test'

type flexibleLocator = string | Locator;
export class elementUtil {

    page: Page;
    defaultTimeOut: number = 30000;
    constructor(page: Page, timeout: number = 30000) {
        this.page = page;
        this.defaultTimeOut = timeout;
    }
    /**
     * this function is mainly to get the ele in string or locator and return locator
     * @param locator 
     * @param timeOut 
     * @param index 
     * @returns locator of the element
     */
    private getLocator(locator: flexibleLocator, index?: number, timeOut?: number): Locator {
        if (typeof locator === 'string') {
            if (index) { return this.page.locator(locator).nth(index-1) }
            else { return this.page.locator(locator) };
        }
        else {
            if (index) { return locator.nth(index-1) }
            else { return locator }
        }
    }
    /**
     * This funciton is to send the value in the element / field which is in string or locator form
     * @param locator 
     * @param value 
     * @returns 
     */
    async doFill(locator: flexibleLocator, value: string): Promise<void> {
        return await this.getLocator(locator).fill(value);
    }
    /**
    * This funciton is to send the value in frequently in the element / field which is in string or locator form
    * @param locator 
    * @param value 
    * @returns 
    */
    async doFillSeq(locator: flexibleLocator, value: string, delay: number = 200): Promise<void> {
        return await this.getLocator(locator).pressSequentially(value, { delay: delay, timeout: this.defaultTimeOut })
    }

    /**
    * This funciton is to click the ele wih force and timeout as option
     * @param locator 
    * @param options  force:boolean timeout:number in ms
    */

    async doClick(locator: flexibleLocator,index?:number,options?: {force?: boolean, timeout?: number,}): Promise<void> {
        await this.getLocator(locator,index).click(
            {
                force: options?.force,
                timeout: options?.timeout || this.defaultTimeOut
            }
        )
    }
    /**
     * This funciton is to double click the ele wih force and timeout as option
     * @param locator 
     * @param options 
     */
    async doubleClick(locator: flexibleLocator, options?: { force?: boolean, timeout?: number }): Promise<void> {
        await this.getLocator(locator).dblclick(
            {
                force: options?.force,
                timeout: options?.timeout || this.defaultTimeOut
            }
        )
    }
    /**
     * This funciton is to right click the ele wih force and timeout as option
     * @param locator 
     * @param options 
     */
    async rightClick(locator: flexibleLocator, options?: { force?: boolean, timeout?: number }): Promise<void> {
        await this.getLocator(locator).click({ button: 'right', timeout: this.defaultTimeOut })
    }
    /**
     * This funciton is to check the locator is either visible and return boolean
     * @param locator 
     * @returns boolean value
     */
    async isVisible(locator: flexibleLocator): Promise<boolean> {
        return await this.getLocator(locator).isVisible();
    }
    /**
     * * This funciton is to check the locator is either checked on check box and return boolean
     * @param locator 
     * @returns 
     */
    async isChecked(locator: flexibleLocator): Promise<boolean> {
        return await this.getLocator(locator).isChecked();
    }
    /**
     * This funciton is to check the element is editable.
     * @param locator 
     * @returns 
     */
    async isEditable(locator: flexibleLocator): Promise<boolean> {
        return await this.getLocator(locator).isEditable();
    }
    /**
     * This function check the element is attached and return boolean
     * @param locator 
     * @param timeOut 
     * @returns 
     */
    async waitForEleAttached(locator: flexibleLocator, timeOut?: number) {
        try {
            await this.getLocator(locator).waitFor({ state: 'attached', timeout: timeOut || this.defaultTimeOut })
            return true;
        } catch {
            return false;
        }
    }
    /**
     * This function is to wait until the page get loaded
     * @param state 
     */
    async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load', timeOut?: number): Promise<void> {
        await this.page.waitForLoadState(state, { timeout: timeOut || this.defaultTimeOut });
    }
    /**
     * Based on the provided element will get all the text not repect <br>
     * @param locator 
     * @returns 
     */
    async getText(locator: flexibleLocator): Promise<string | null> {
        return await this.getLocator(locator).textContent({ timeout: this.defaultTimeOut });
    }
    /**
 * Based on the provided element will get only specific text respect <br>
 * @param locator 
 * @returns 
 */
    async getInnerText(locator: flexibleLocator): Promise<string> {
        return await this.getLocator(locator).innerText({ timeout: this.defaultTimeOut });
    }

/**
 * this function is to get multi element text and return the text in array without any logic implement
 * Based on the provided element will get all specific text respect <br>
 * @param locator 
 * @returns 
 */
    async getAllArrayText(locator: flexibleLocator): Promise<string[] > {
        return await this.getLocator(locator).allInnerTexts();
    }
/**
 * this function is to get multi element text and return the text in array without any logic implement
 * Based on the provided element will get all specific not respect the <br>
 * @param locator 
 * @returns 
 */
    async getAllArrayTextContent(locator: flexibleLocator): Promise<string[]> {
        return await this.getLocator(locator).allTextContents();
    }
    /**
     * This funciton is to select the dropdown based on the text displayed
     * @param locator 
     * @param value 
     */
    async selectDropByText(locator:flexibleLocator,value:string){
        await this.getLocator(locator).selectOption({label:value});
    }
    /**
     * 
     * @param locator 
     * @param value 
     */
    async selectDropByValue(locator:flexibleLocator,value:string){
        await this.getLocator(locator).selectOption({value:value});
    }
    /**
     * This function is to select the dropdown by the index value given
     * @param locator 
     * @param index 
     */
    async selectDropByIndex(locator:flexibleLocator,index:number){
        await this.getLocator(locator).selectOption({index:index});
    }
    /**
     * This function is to select the dropdown value which is not select based dropdown.
     * @param dropField 
     * @param dropValue 
     */
    async dropDownSelection(dropField:flexibleLocator,dropValue:flexibleLocator,index?:number){
        await this.doClick(dropField,index,{timeout:this.defaultTimeOut});
        await this.doClick(dropValue,index,{timeout:this.defaultTimeOut});
        }

}