import express, { Request, Response } from 'express';
import webpush, {PushSubscription} from 'web-push';
import path from 'path';
import cors from 'cors';

const subscriptions: PushSubscription[] = [];

const publicVapidKey = 'BFLveoM-kOJFPM6M-_nWrh4_hSDPH_Fm9jIIUAlC58-Pz7jM15K96dFZKlvZ81OKnD7A90TMPfpZVObNuFC1Yaw';
const privateVapidKey = 'puqHF3vjgvdMMwKNRa63Klzqz64zkZGRW3R1v05Dkaw';

webpush.setVapidDetails(
  'mailto:web-push-book@gauntface.com',
  publicVapidKey,
  privateVapidKey
);

const app = express();

app.use(cors());

app.get('/', (request, response) => console.log('teste'));

app.post('/subscribe', (request: Request, response: Response) =>{
  const subscription = request.body;
  subscriptions.push(subscription);
  response.status(200);
  const payload = JSON.stringify({title: 'Section.io Push Notification'});
  webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

app.use(express.static(path.join(__dirname,  "..", "public", "client")))


export {app};

/**
 * Public Key:
BFLveoM-kOJFPM6M-_nWrh4_hSDPH_Fm9jIIUAlC58-Pz7jM15K96dFZKlvZ81OKnD7A90TMPfpZVObNuFC1Yaw

Private Key:
puqHF3vjgvdMMwKNRa63Klzqz64zkZGRW3R1v05Dkaw

 */