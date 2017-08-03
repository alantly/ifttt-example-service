import * as DB from 'mongoose';
import * as Express from 'express';
const router = Express.Router();

interface TriggerRequest {
  trigger_identity: string; // A unique identifier for this set of trigger fields
  triggerFields: object; // map of trigger fields set from the platform UI
  user: object; // user info
  limit?: number;
  ifttt_source?: object; // Applet id and url
}

interface TriggerResponse {
  meta: {
    id: string;
    timestamp: number;
  }
}

interface AlwaysFireTriggerRequest extends TriggerRequest {
  triggerFields: {
    respond_with: string
  }
}

interface AlwaysFireTriggerResponse extends TriggerResponse {
  respond_ingredient: string
}

router.use((req, res, next) => {
  let body: TriggerRequest = req.body;
  if (body.limit <= 0) return res.json({ data: [] });
  body.limit = body.limit || 50;
  next();
});

router.post('/always_fire', (req, res, next) => {
  let body: AlwaysFireTriggerRequest = req.body;

  let result: AlwaysFireTriggerResponse[] = []
  for (let i = body.limit; i > 0; i--) {
    result.push({
      respond_ingredient: body.triggerFields.respond_with,
      meta: {
        id: i.toString(),
        timestamp: Date.now()
      }
    })
  }
  res.json(result)
});


export default router;
