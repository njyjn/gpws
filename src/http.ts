import https from 'https'
import { readQrCode } from './qr'

interface CovidData {
    total?: string;
    dayCount?: number;
    dayAsOf?: string;
    delta?: number;
}

export async function getCovidDataForIrvine(): Promise<CovidData> {
    return new Promise(resolve => {
        https.get(
            'https://opendata.arcgis.com/datasets/772f5cdbb99c4f6689ed1460c26f4b05_0/FeatureServer/0/query?where=1%3D1&outFields=Irvine,DateSpecCollect,OBJECTID&outSR=4326&f=json',
            (res) => {
                let body = ''
                res.on('data', d => {
                    body += d
                })
                res.on('end', () => {
                    let json = JSON.parse(body);
                    let sortedJson = json.features.sort((a: any, b: any) => {
                        return a.attributes.OBJECTID - b.attributes.OBJECTID
                    })
                    const total = sortedJson.pop().attributes.Irvine
                    const day = sortedJson.pop().attributes
                    const dayCount = parseInt(day.Irvine)
                    const dayAsOf = day.DateSpecCollect.replace(/-/gi, '\\-')
                    const delta = parseInt(sortedJson.pop().attributes.Irvine) - dayCount
                    resolve({ total, dayCount, dayAsOf, delta })
                })
            }
        )
    })

}