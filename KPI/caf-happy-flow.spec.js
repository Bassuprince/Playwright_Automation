import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
//import {login} from '../Util_files_caf/Login_util'
import { LoginPage } from '../Page/LoginPage'
import { ManagerPage } from '../Page/ManagerPage'
import  EmployeePage  from '../Page/EmployeePage'
import { HRPage } from '../Page/HRPage'
const userCAF = require('../TestData/cafData.json')


test.describe('KPI for CAF', () => {
     test.setTimeout(200000)

test.describe.configure({ mode: 'serial' });

test('CAF Happy Flow', async ({ page }) => {

    const randomProblem_Description = faker.lorem.lines(6)
    const randomCaseSubject = faker.lorem.paragraph()


    const Login = new LoginPage(page)
    const Managerpage = new ManagerPage(page)
    const Employee = new EmployeePage(page)
    const HRmanager = new HRPage(page)

    // ================= MANAGER =================
    //await login(page, userCAF.username_Mng,userCAF.password_Mng)
    await Login.lanchURL()
    await Login.logintoKPIapp(userCAF.username_Mng, userCAF.password_Mng)
    
    await Managerpage.identificationDetails(userCAF.EmployeeName, userCAF.Category)
    await Managerpage.caseSubject(randomCaseSubject,randomProblem_Description , userCAF.Impact, userCAF.CorrectiveActionMeasure)
    const cafID = await Managerpage.captureCAFIDA()
    await Login.Logout()
   
    // ================= EMPLOYEE =================
    // await login(page,userCAF.username_Emp,userCAF.password_Emp)
    await Login.logintoKPIapp(userCAF.username_Emp, userCAF.password_Emp)
    await Employee.openCAFUsingID(cafID)
   // await Employee.employeeactionappeal(userCAF.appealID)
    await Employee.employeeactionacknowledge(userCAF.accknowledgecomment)
    await Login.Logout()
    

    // ================= HR =================
    //await login(page,userCAF.username_HR,userCAF.password_HR)
    await Login.logintoKPIapp(userCAF.username_HR,userCAF.password_HR)
    await HRmanager.openCAFUsingID(cafID)
    await HRmanager.HRacknowledgeflow(userCAF.commentA)
    await Login.Logout()

})
test('CAF Appeal-Reject Flow', async ({ page }) => {


    const Login = new LoginPage(page)
    const Managerpage = new ManagerPage(page)
    const Employee = new EmployeePage(page)
    const HRmanager = new HRPage(page)


    //manager login    
    // ================= MANAGER =================
    await Login.lanchURL()
    await Login.logintoKPIapp(userCAF.username_Mng, userCAF.password_Mng)
    await Managerpage.identificationDetails(userCAF.EmployeeName, userCAF.Category)
    await Managerpage.caseSubject(userCAF.CaseSubject, userCAF.Problem_Description, userCAF.Impact, userCAF.CorrectiveActionMeasure)
    const cafID = await Managerpage.captureCAFIDA()
    await Login.Logout()

    // Employee Login

    // ================= EMPLOYEE =================
    await Login.logintoKPIapp(userCAF.username_Emp, userCAF.password_Emp)
    await Employee.openCAFUsingID(cafID)
    await Employee.employeeactionappeal(userCAF.appealID)
    await Login.Logout()

    // HR Login
     // ================= HR =================
    await Login.logintoKPIapp(userCAF.username_HR, userCAF.password_HR)
    await HRmanager.openCAFUsingID(cafID)
    await HRmanager.HRrejectflow(userCAF.commentR,userCAF.CommentRsolution)
    await Login.Logout()

})
test('CAF Appeal-Approve Flow', async ({ page }) => {

    const Login = new LoginPage(page)
    const Managerpage = new ManagerPage(page)
    const Employee = new EmployeePage(page)
    const HRmanager = new HRPage(page)

    //manager login    
    // ================= MANAGER =================
    await Login.lanchURL()
    await Login.logintoKPIapp(userCAF.username_Mng, userCAF.password_Mng)
    await Managerpage.identificationDetails(userCAF.EmployeeName, userCAF.Category)
    await Managerpage.caseSubject(userCAF.CaseSubject, userCAF.Problem_Description, userCAF.Impact, userCAF.CorrectiveActionMeasure)
    const cafID = await Managerpage.captureCAFIDA()
    await Login.Logout()

    // Employee Login
    // ================= EMPLOYEE =================
    await Login.logintoKPIapp(userCAF.username_Emp, userCAF.password_Emp)
    await Employee.openCAFUsingID(cafID)
    await Employee.employeeactionappeal(userCAF.appealID)
    await Login.Logout()

    // HR Login
     // ================= HR =================
    await Login.logintoKPIapp(userCAF.username_HR, userCAF.password_HR)
    await HRmanager.openCAFUsingID(cafID)
    await HRmanager.HRapproveflow(userCAF.comment)
    await Login.Logout()

})

})