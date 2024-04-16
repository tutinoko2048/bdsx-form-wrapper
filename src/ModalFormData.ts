import { CustomForm, Form, FormDropdown, FormInput, FormSlider, FormToggle } from 'bdsx/bds/form';
import type { Player } from 'bdsx/bds/player';

export class ModalFormData {
  private readonly _form: CustomForm = new CustomForm();

  constructor() {}
  
  public title(text: string): this {
    this._form.setTitle(text);
    return this;
  }

  public toggle(label: string, defaultValue?: boolean): this {
    this._form.addComponent(new FormToggle(label, defaultValue));
    return this;
  }

  public textField(label: string, placeholderText?: string, defaultValue?: string): this {
    this._form.addComponent(new FormInput(label, placeholderText, defaultValue));
    return this;
  }

  public slider(label: string, minimumValue: number, maximumValue: number, valueStep: number, defaultValue?: number): this {
    this._form.addComponent(new FormSlider(label, minimumValue, maximumValue, valueStep, defaultValue));
    return this;
  }

  public dropdown(label: string, options: string[], defaultValueIndex?: number): this {
    this._form.addComponent(new FormDropdown(label, options, defaultValueIndex));
    return this;
  }

  public async show(player: Player): Promise<ModalFormResponse> { 
    const response: Form.Options = {};
    const formValues = await Form.sendTo(player.getNetworkIdentifier(), this._form.data, response);
    const canceled = formValues === null;
    return new ModalFormResponse(
      canceled,
      response.cancelationReason,
      formValues ?? undefined,
    );
  }
}

export class ModalFormResponse {
  constructor(
    public readonly canceled: boolean,
    public readonly cancelationReason?: Form.CancelationReason,
    public readonly formValues?: (string | number | boolean)[]
  ) {}
}