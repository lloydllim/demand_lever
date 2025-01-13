import { Field as ChakraField } from "@chakra-ui/react";
import * as React from "react";

export interface FieldProps extends Omit<ChakraField.RootProps, "label"> {
  label?: React.ReactNode;
  labelAdditionalText?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const {
      label,
      labelAdditionalText,
      children,
      helperText,
      errorText,
      optionalText,
      ...rest
    } = props;
    return (
      <ChakraField.Root
        ref={ref}
        {...rest}
      >
        <div className="flex flex-row justify-between items-center w-full">
          {label && (
            <ChakraField.Label className="text-lg font-semibold">
              {label}
              <ChakraField.RequiredIndicator fallback={optionalText} />
            </ChakraField.Label>
          )}
          {labelAdditionalText && (
            <ChakraField.HelperText className="text-black text-md font-semibold">
              {labelAdditionalText}
            </ChakraField.HelperText>
          )}
        </div>
        {helperText && (
          <ChakraField.HelperText className="text-gray-500 text-sm -mt-1">
            {helperText}
          </ChakraField.HelperText>
        )}

        <div className="mt-2 w-full">{children}</div>

        {errorText && (
          <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
        )}
      </ChakraField.Root>
    );
  }
);
