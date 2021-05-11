export interface Registration{
    userId: number,
    userName: string,
    userEmail: string,
    userPassword:string,
    userBranch: string,
    userNumber:string,
    status?:string,
    userRole?:string,
    isLogged?:boolean,
    photo?:string
}