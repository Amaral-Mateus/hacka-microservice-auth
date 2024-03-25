export class User {
    nick_name: string;
    email: string;
    password: string;
  
    constructor(nick_name: string, password: string, email?: string) {
      this.nick_name = nick_name;
      this.password = password
      this.email = email;
    }
  }