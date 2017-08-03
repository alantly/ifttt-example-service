import * as Express from 'express';
const router = Express.Router();
import actions from './actions';
import triggers from './triggers';

router.use('/actions', actions);
router.use('/triggers', triggers);

router.get('/status', (req, res, next) => {
  res.end();
});

router.post('/test/setup', (req, res, next) => {
  res.json({
    data: {
      samples: {
        triggers: {
          always_fire: {
            respond_with: "sample_slug"
          },
        },
        actions: {
          do_nothing: {
            text: 'sample_slug',
          }
        },
      }
    }
  });
});

export default router;
