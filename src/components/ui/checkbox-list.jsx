import { CheckboxGroup, Fieldset } from "@chakra-ui/react"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"

export const CheckboxList = ({ 
	items,
	header,
	getSelectedChoices,
	defaultValues = '',
	...rest }) => {

	const [checkedItems, setCheckedItems] = useState( [] )

	useEffect(() => {
		if ( getSelectedChoices ) {
			getSelectedChoices( checkedItems )
		}
	}, [checkedItems])

	useEffect(() => {
		if (defaultValues.length != 0 && defaultValues[0] != '' && checkedItems.length == 0 ) {
			setCheckedItems( prevstate => [ ...prevstate, ...defaultValues] )
		}
	}, [ defaultValues ])

	const handleCheckboxChange = (e, value) => {
		console.info( 'unceching >>> ', e  , value )
		
		if (e.checked) {
			setCheckedItems((prev) => [...prev, value]);
		} else {
			setCheckedItems((prev) => prev.filter((item) => item !== value));
		}
	};

	return (
		<Fieldset.Root {...rest}>
			<CheckboxGroup
			    // {...(defaultValues && defaultValues.length > 0 && { value: defaultValues })}
				value={ checkedItems }
				name="framework"
				>
				<Fieldset.Legend fontSize="sm" mb="2" color="black">
					{header}
				</Fieldset.Legend>
				<Fieldset.Content>
					{
						items.map(item =>
							<Checkbox
								key={item.value}
								cursor="pointer"
								onCheckedChange={(e) => handleCheckboxChange(e, item.value)}
								value={item.value}> {item.label} </Checkbox>)
					}
				</Fieldset.Content>
			</CheckboxGroup>
		</Fieldset.Root>
	)
}