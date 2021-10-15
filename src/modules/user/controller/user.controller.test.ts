import * as user_controller from "./user.controller"
// @ponicode
describe("getUserRepositories", () => {
    let inst: any

    beforeEach(() => {
        inst = new user_controller.UserController()
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.getUserRepositories("user-name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            inst.getUserRepositories(123)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            inst.getUserRepositories("user name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            inst.getUserRepositories("username")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            inst.getUserRepositories("user_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            inst.getUserRepositories("")
        }
    
        expect(callFunction).not.toThrow()
    })
})
