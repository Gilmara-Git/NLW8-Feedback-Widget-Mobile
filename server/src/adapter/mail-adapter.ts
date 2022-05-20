// contract/interface 
export interface SendMailAdapter{
    subject: string;
    body: string |string[] ;
}

export interface MailAdapter {
    sendMail:(data: SendMailAdapter)=>Promise<void>;
}