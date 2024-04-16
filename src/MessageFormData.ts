import { Form, ModalForm } from 'bdsx/bds/form';
import type { Player } from 'bdsx/bds/player';

export class MessageFormData {
  private readonly _form: ModalForm = new ModalForm();

  constructor() {}
  
  public title(text: string): this {
    this._form.setTitle(text);
    return this;
  }

  public body(text: string): this {
    this._form.setContent(text);
    return this;
  }

  public button1(text: string): this {
    this._form.setButtonConfirm(text);
    return this;
  }

  public button2(text: string): this {
    this._form.setButtonCancel(text);
    return this;
  }

  public async show(player: Player): Promise<MessageFormResponse> { 
    const response: Form.Options = {};
    const selection = await Form.sendTo(player.getNetworkIdentifier(), this._form.data, response);
    const canceled = selection === null;
    return new MessageFormResponse(
      canceled,
      response.cancelationReason,
      selection ? 0 : 1
    );
  }
}

export class MessageFormResponse {
  constructor(
    public readonly canceled: boolean,
    public readonly cancelationReason?: Form.CancelationReason,
    public readonly selection?: number
  ) {}
}