import Immutable from "immutable";

interface PlainObject {
  [key: string]: unknown;
}

/**
 * id is only available after data fetch, not required when defining the model
 */
interface BaseAttributes {
  id: string;
}

type WithBaseAttributes<A> = BaseAttributes & A;

interface ModelConstructorAttribute<A> {
  type: string;
  new (
    attributes: WithBaseAttributes<A>
  ): Model<A> & Readonly<A>
}

export class Model<A> {
  id: string;
  attributes: Immutable.Map<keyof A, unknown>;
  static type = "unknown";

  static getFetchOneUrl(id: string = null): string {
    return `/${this.type}/${id? id : ""}`;
  }

  static getFetchManyUrl(): string {
    return `/${this.type}/`;
  }
}

export default function ModelCreator<A extends PlainObject>(
  defaultAttributes: { type: string } & Required<A>
): ModelConstructorAttribute<A> {
  if (!defaultAttributes.type) {
    throw new Error("Type required when defining a model!")
  }

  class Constructor<A> extends Model<A>{
    static type = defaultAttributes.type;
  }

  return Constructor as unknown as ModelConstructorAttribute<A>;
}