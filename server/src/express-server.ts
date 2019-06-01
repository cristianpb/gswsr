import { createServer, Server } from 'http';
import { Request, Response } from 'express';
import express from 'express';
import path from 'path';
//import { environment } from './environment';

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
    //this.static_content();
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


  private static_content(): void {
    this.app.use(require('cors')());
    this.app.use(require('body-parser').json());
    this.app.use(express.static(path.join(__dirname, '../../dist')));
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });
    this.app.get('/dashboard', (req, res) => {
      res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });
    this.app.get('/news', (req, res) => {
      res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });
  }

  private routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
        res.json({'data': 'hello world'});
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
}
