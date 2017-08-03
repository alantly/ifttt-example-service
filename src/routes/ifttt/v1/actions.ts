import * as Twilio from 'twilio';
import * as Express from 'express';
const router = Express.Router();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = Twilio(accountSid, authToken);

interface ActionRequest {
  actionFields: object
  user: object;
  ifttt_source?: object;
}

interface ActionResponse {
  data: { id: string }[]
}

interface DoNothingActionRequest extends ActionRequest {
  actionFields: {
    text: string
  }
}

router.post('/do_nothing', (req, res, next) => {
  let body: DoNothingActionRequest = req.body;
  let result: ActionResponse = {
    data: [{ id: Date.now().toString() }]
  }
  res.json(result);
});

export default router;
