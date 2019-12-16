import { Controller } from '../modules/controller';
import { ChatApp } from '../views/ChatView/ChatApp';
import { chat_configs, MODES } from '../modules/chatConfig';

export class ChatController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);
    this.app = new ChatApp(globalEventBus);
  }

  openWithData (data = {}) {
    chat_configs.mode = MODES.chat;
    this.app.renderTo(this._root);
  }

  close () {
    this._root.innerHTML='';
  }
}
