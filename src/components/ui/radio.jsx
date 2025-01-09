import { RadioGroup as ChakraRadioGroup } from '@chakra-ui/react'
import * as React from 'react'

export const Radio = React.forwardRef(function Radio(props, ref) {
  const { children, inputProps, rootRef, ...rest } = props
  return (
    <ChakraRadioGroup.Item ref={rootRef} {...rest}>
      <ChakraRadioGroup.ItemHiddenInput  ref={ref} {...inputProps} />
      <ChakraRadioGroup.ItemIndicator border="2px solid #c4c4c4" />
      {children && (
        <ChakraRadioGroup.ItemText fontSize="md">{children}</ChakraRadioGroup.ItemText>
      )}
    </ChakraRadioGroup.Item>
  )
})

export const RadioGroup = ChakraRadioGroup.Root
