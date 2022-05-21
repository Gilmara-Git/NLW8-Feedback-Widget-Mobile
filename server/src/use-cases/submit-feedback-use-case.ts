// this layer here is dealing with the application
import { MailAdapter } from '../adapter/mail-adapter';
import { FeedbacksRepository} from '../repositories/feedbacks-repository';
interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}


// this function / use case has only one action (execute)
// principio de inversao de dependencia 
export class SubmitFeedbackUseCase{   
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
        ){}

    async execute(request : SubmitFeedbackUseCaseRequest){
        const { type, comment, screenshot } = request;
// validacoes
        if(!comment){
            throw new Error('Comment is required.')
        }
        if(!type){
            throw new Error('Type is required.')
        }


        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format.')
        }
        
      await this.feedbacksRepository.create({
            type,
            comment, 
            screenshot
        })

    
        await this.mailAdapter.sendMail({ 
            subject: 'New feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Feedback type: ${type}</p>`,
                `<p>Comment: ${comment}</p>`, 
                !screenshot ? null : `<img width=400px height=500px src="${screenshot}"/>`,
                `</div>` 
            ].join('\n')
        })
    }
}