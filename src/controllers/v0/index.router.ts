import { Router, Request, Response } from 'express';
import { getCovidDataForIrvine } from '../../http'
import { getSafeEntryQrCodeParams } from '../../qr'
import { WhereisRouter } from '../v0/whereis/routes/whereis.router'

const router: Router = Router();

router.use('/whereis', WhereisRouter);

router.get('/covid', async (req: Request, res: Response) => {
    if(req.query.dataCollection === 'irvine') {
        await getCovidDataForIrvine().then((data) => {
            res.send(data)
        })
    } else {
        res.status(401).send()
    }
})

router.get('/safeentry', async (req: Request, res: Response) => {
    await getSafeEntryQrCodeParams(req.query.filePath.toString()).then((data) => {
        res.send(data)
    })
})

export const IndexRouter: Router = router;