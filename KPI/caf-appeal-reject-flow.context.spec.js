import {test,expect} from '@playwright/test'
import {login,logout} from '../Util_files_caf/Login_util'
import { ManagerPage } from '../Page/ManagerPage'
import EmployeePage from '../Page/EmployeePage'
import { HRPage } from '../Page/HRPage'
import { faker } from '@faker-js/faker'
const userCAF = require('../TestData/cafData.json')

test('CAF Happy Flow', async ({ browser }) => {
    test.setTimeout(120000)

    const randomProblem_Description = faker.lorem.lines(4)
    const randomCaseSubject = faker.lorem.paragraph()


    //========= manager ============
    const managerContext = await browser.newContext();
    const managerPage = await managerContext.newPage();
    const manager = new ManagerPage(managerPage);

    await login(managerPage,userCAF.username_Mng, userCAF.password_Mng);

    await manager.identificationDetails(userCAF.EmployeeName, userCAF.Category);
    await manager.caseSubject(userCAF.CaseSubject, userCAF.Problem_Description, userCAF.Impact, userCAF.CorrectiveActionMeasure);
    const CafID = await manager.captureCAFIDA();
    await logout(managerPage);
    await managerContext.close();

    //==============Employee==============
    const employeeContext = await browser.newContext();
    const employeepage = await employeeContext.newPage();
    const employee = new EmployeePage(employeepage);

    await login(employeepage,userCAF.username_Emp, userCAF.password_Emp);
    await employee.openCAFUsingID(CafID);
    await employee.employeeactionappeal(userCAF.accknowledgecomment)
    await logout(employeepage);
    await employeeContext.close()

    //==============HR=================
    const HRContext = await browser.newContext()
    const HRpages = await HRContext.newPage()
    const HR = new HRPage(HRpages)
    await login(HRpages,userCAF.username_HR,userCAF.password_HR)
    await HR.openCAFUsingID(CafID)
    await HR.HRrejectflow(userCAF.commentR,userCAF.CommentRsolution)
    await logout(HRpages)
    await HRContext.close()

})