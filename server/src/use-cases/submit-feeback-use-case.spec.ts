import { SubmitFeedbackUseCase } from './submit-feedback-use-case'

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback  = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy }, 
    { sendMail: sendMailSpy }

)
describe('Submit feedback', ()=>{
    // first test
    it('should be able to submit a feedback', async ()=>{  
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'It is an example',
            screenshot: 'data:image/png;base64,sdgkajsdgjskldgjakdjglkajdglja'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
   });
   // second test
   it('should not be able to submit a feedback without type', async ()=>{
    await expect(submitFeedback.execute({
        type: '',
        comment: 'It is an example',
        screenshot: 'data:image/png;base64,sdgkajsdgjskldgjakdjglkajdglja'
    })).rejects.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
});
    it('should not be able to submit a feedback without comment', async()=>{
        await expect(submitFeedback.execute({
            type:'IDEA',
            comment: '',
            screenshot: 'data:image/png;base64,sdgkajsdgjskldgjakdjglkajdglja'
        })).rejects.toThrow();
    })
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();

    it('should not be able to submit a feedback if screenshot does not start with format data:image/png;base64', async ()=>{  
        await expect(submitFeedback.execute({
            type: 'OTHER',
            comment: 'It is an example',
            screenshot: 'test.jpeg'
        })).rejects.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
   });
}
 )