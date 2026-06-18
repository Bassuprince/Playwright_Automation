import { test, expect } from '@playwright/test'
//import {login} from '../Util_files_caf/Login_util'
import { LoginPage } from '../Page/LoginPage'
import { ManagerPage } from '../Page/ManagerPage'
import EmployeePage from '../Page/EmployeePage'
import { HRPage } from '../Page/HRPage'
const userCAF = require('../TestData/cafData.json')

test('CAF Happy Flow', async ({ browser }) => {
    test.setTimeout(120000)
    // Create separate contexts // Create pages

 
// ================= MANAGER =================
    const managerContext = await browser.newContext();
    const managerPage = await managerContext.newPage();
    const managerLogin = new LoginPage(managerPage);
    const Managerpage = new ManagerPage(managerPage);

    await managerLogin.lanchURL()
    await managerLogin.logintoKPIapp(userCAF.username_Mng, userCAF.password_Mng)
    await Managerpage.identificationDetails(userCAF.EmployeeName, userCAF.Category)
    await Managerpage.caseSubject(userCAF.CaseSubject, userCAF.Problem_Description, userCAF.Impact, userCAF.CorrectiveActionMeasure)
    const cafID = await Managerpage.captureCAFIDA()
    await managerLogin.Logout()
    await managerContext.close();

  // ================= EMPLOYEE =================
    const employeeContext = await browser.newContext();
    const employeePage = await employeeContext.newPage();
    const employeeLogin = new LoginPage(employeePage);
    const Employee = new EmployeePage(employeePage);

    await employeeLogin.lanchURL()
    await employeeLogin.logintoKPIapp(userCAF.username_Emp, userCAF.password_Emp)
    await Employee.openCAFUsingID(cafID)
    await Employee.employeeactionacknowledge(userCAF.accknowledgecomment)
    await employeeLogin.Logout()
    await employeeContext.close();

 // ================= HR =================
    const hrContext = await browser.newContext();
    const hrPage = await hrContext.newPage();
    const hrLogin = new LoginPage(hrPage);
    const HRmanager = new HRPage(hrPage);

    await hrLogin.lanchURL()
    await hrLogin.logintoKPIapp(userCAF.username_HR,userCAF.password_HR)
    await HRmanager.openCAFUsingID(cafID)
    await HRmanager.HRacknowledgeflow(userCAF.comment)
    await hrLogin.Logout()
    await hrContext.close();


})