import { createServer, Server } from 'http';
import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import express from 'express';
import path from 'path';
import { environment } from './environment';

export class ExpressServer {
  public static readonly PORT: number = 3001;
  private app: express.Application;
  private server: Server;
  private port: string | number;
  private db: any;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.mongoConnect();
    this.static_content();
    this.routes();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private config(): void {
    this.port = process.env.PORT || ExpressServer.PORT;
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private mongoConnect(): void {
    console.log('Connected');
    MongoClient.connect(environment.mongourl, { useNewUrlParser: true }).then(
      connection => {
      this.db = connection.db(environment.mongoDatabase);
      }
    );
  }

  private static_content(): void {
    this.app.use(require('cors')());
    this.app.use(require('body-parser').json());
    this.app.use(express.static(path.join(__dirname, '../../dist')));
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });
    this.app.get('/tweets', (req, res) => {
      res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });
  }

  private routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
        res.json({data: 'hello world'});
    });

    this.app.get('/api/tweets/:page', (req: Request, res: Response) => {
      this.getTweets(Number(req.params.page), 0).then(( tweets ) => {
        res.json({data: tweets});
      });
    });

    this.app.get('/api/postInsta/:page', (req: Request, res: Response) => {
      this.getPostInsta(Number(req.params.page), 0).then(( posts ) => {
        res.json({data: posts});
      });
    });

  }


  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });
  }

  public getApp(): express.Application {
    return this.app;
  }

  private async getTweets(page: number, skip: number) {
    const start = (page * 9) + (skip * 1);
    const docs = await this.db.collection('tweets')
      .find({}, {skip: start})
      .sort({twid: -1})
      .limit(9)
      .toArray();
    return docs;
  }

  private async getPostInsta(page: number, skip: number) {
    const start = (page * 9) + (skip * 1);
    const docs = await this.db.collection('postInsta')
      .find({}, {skip: start})
      .sort({twid: -1})
      .limit(9)
      .toArray();
    return docs;
  }

}
