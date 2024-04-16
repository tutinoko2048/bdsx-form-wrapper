import { Form, FormButton, SimpleForm } from 'bdsx/bds/form';
import type { Player } from 'bdsx/bds/player';

export class ActionFormData<T = any> {
  private readonly _form: SimpleForm = new SimpleForm();
  public readonly ids: (T | undefined)[] = [];

  constructor() {}
  
  public title(text: string): this {
    this._form.setTitle(text);
    return this;
  }

  public body(text: string): this {
    this._form.setContent(text);
    return this;
  }

  public button(text: string, icon?: { type: 'path' | 'url', path: string }, id?: T): this {
    this._form.addButton(new FormButton(text, icon?.type, icon?.path));
    this.ids.push(id);
    return this;
  }

  public async show(player: Player): Promise<ActionFormResponse<T>> { 
    const response: Form.Options = {};
    const selection = await Form.sendTo(player.getNetworkIdentifier(), this._form.data, response);
    const canceled = selection === null;
    return new ActionFormResponse<T>(
      canceled,
      response.cancelationReason,
      selection ?? undefined,
      canceled ? undefined : this.ids[selection]
    );
  }
}

export class ActionFormResponse<T> {
  constructor(
    public readonly canceled: boolean,
    public readonly cancelationReason?: Form.CancelationReason,
    public readonly selection?: number,
    public readonly buttonId?: T
  ) {}
}