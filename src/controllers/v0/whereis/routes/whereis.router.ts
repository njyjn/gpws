import { Router, Request, Response } from 'express';
import { Whereis } from '../models/Whereis';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    res.status(401).send({error: 'invalid endpoint'})
});

router.get('/:chatId', async (req: Request, res: Response) => {
    const { chatId } = req.params
    const user = await Whereis.findByPk(chatId);
    if(user) {
        res.send({user: user})
    } else {
        res.status(404).send({error: 'user not found'})
    }
})

router.post('/', async (req: Request, res: Response)=> {
    const body = req.body
    if(body.chatId) {
        const user = await Whereis.create(body)
        res.status(201).send({user: user})
    } else {
        res.status(401).send({error: 'chat id must be included'})
    }
})

router.patch('/:chatId', async (req: Request, res: Response) => {
    const { chatId }  = req.params
    const { patchType, status, source, lattitude, longitude } = req.body
    if(chatId) {
        var user:Whereis
        var updated_user:Whereis
        if (patchType === 'heatbeat' && status && source) {
            user = await Whereis.findByPk(chatId)
            updated_user = await user.update({
                status: status,
                source: source
            })
        } else if (patchType === 'locupdate' && lattitude && longitude) {
            user = await Whereis.findByPk(chatId)
            updated_user = await user.update({
                lattitude: lattitude,
                longitude: longitude
            })
        }
        if(user) {
            res.send({user: updated_user})
        } else {
            res.status(201).send({user: defaultUser(chatId)})
        }
    } else {
        res.status(201).send({
            user: defaultUser(chatId)
        })
    }
})

function defaultUser(chatId: string): Object {
    return {
        'chatId': chatId,
        'name': '',
        'lattitude': ((Math.random() * 180) - 90).toFixed(6),
        'longitude': ((Math.random() * 180) - 90).toFixed(6),
        'status': 'OK',
        'source': 'unknown',
        'updatedAt': 'unknown'
    }    
} 

export const WhereisRouter: Router = router;