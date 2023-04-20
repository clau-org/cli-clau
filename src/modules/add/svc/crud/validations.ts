export function getValidationCode({ props }: { props: any[] }) {
  let propsCode = "";

  for (const propConfig of props) {
    const { name, validation: configValidation, type, required } = propConfig;
    const isRelation = type === "relation";

    // Get type key
    const typeKey = `${type}${required ? "-required" : ""}`;

    // Set validation
    const validation = configValidation ?? mapPropToValidationCode.get(typeKey);

    // Set prop name
    const propName = isRelation ? `${name}_id` : name;

    // Create prop code
    const propCode = `${propName}: ${validation},\n`;

    // Add code
    propsCode += propCode;
  }

  return propsCode;
}

const mapPropToValidationCode = new Map(
  Object.entries({
    string: "z.string().nullish()",
    "string-required": "z.string()",

    email: "z.string().email().nullish()",
    "email-required": "z.string().email()",

    boolean: "z.boolean().nullish()",
    "boolean-required": "z.boolean()",

    datetime: "z.date().nullish()",
    "datetime-required": "z.date()",

    relation: "z.string().min(12).nullish()",
    "relation-required": "z.string().min(12)",

    uuid: "z.string().uuid().nullish()",
    "uuid-required": "z.string().uuid()",
  }),
);

export function replaceValidationCode({
  validationCode,
  routerCode,
}: {
  validationCode: string;
  routerCode: string;
}) {
  const searchString = "email: z.string().email(),";
  return routerCode.replace(searchString, validationCode);
}

export function generateValidations(path: string) {}
