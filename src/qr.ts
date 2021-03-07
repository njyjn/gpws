var QrCode = require('qrcode-reader')

import Jimp from 'jimp'

interface QrImageResult {
    ok: boolean,
    result: string
}

export async function getSafeEntryQrCodeParams(url: string): Promise<QrImageResult> {
    const result = await readQrCode(url)
    return new Promise(resolve => {
        resolve(result)
    })
}

export async function readQrCode(url: string): Promise<QrImageResult> {
    let qrImageRes: QrImageResult = {
        ok: true,
        result: ''
    }
    await Jimp.read(url).then(image => {
        image.getBuffer('AUTO', (err, res) => {
            let qrcode = new QrCode();
            qrcode.callback = (err: Error, value: any) => {
                if(err) {
                    console.error(err)
                }
                qrImageRes.result = value.result
            }
            qrcode.decode(image.bitmap)
        })
    }, error => {
        qrImageRes.ok = false
    })
    return qrImageRes
}
