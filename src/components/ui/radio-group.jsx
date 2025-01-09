import { Flex } from "@chakra-ui/react"
import { Radio, RadioGroup as ComponentRadioGroup } from "@/components/ui/radio"
import { useState, useEffect } from "react"

export const RadioGroup = ({ defaultValue, options, getSelectedChoice, orientation = "horizontal", ...rest }) => {
	const [ selectedChoice, setSelectedChoice ] = useState( defaultValue || '' )

	useEffect(() => {
		if ( getSelectedChoice ) {
			getSelectedChoice( selectedChoice )
		}
	}, [ selectedChoice ])
	


	return (
		<ComponentRadioGroup
			onValueChange={ e => setSelectedChoice( e ) }
			value={defaultValue}
			defaultValue={defaultValue}
			{...rest}>
			{
				<Flex
					gap={6}
					alignItems={'start'}
					cursor={'pointer'}
					flexDirection={{ base: "column", md: "row"}}
				>
					{
						options.map(option =>
							<Radio
								key={option.value}
								value={option.value}> {option.label} </Radio>
						)
					}
				</Flex>
			}
		</ComponentRadioGroup>
	)
}