import {
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
} from "@/components/ui/select"
import { createListCollection, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export default function SelectDropdown({
	collection,
	label,
	getSelectedChoice,
	isValid,
	labelProp,
	valueProp,
	defaultValue = null,
	placeholder = "Select a choice",
	fieldName = '',
	required = false,
	submitted = false,
	...rest
}) {
	const [selectedChoice, setSelectedChoice] = useState()
	const [errorMsg, setErroMsg] = useState('')

	const collections_mappable = createListCollection({
		items: collection.map(c => {
			return { label: c[labelProp], value: c[valueProp] }
		})
	})

	useEffect(() => {
		if (defaultValue) {
			setSelectedChoice({
				value: [defaultValue],
				items: collections_mappable.items
			})
		}
		console.info('default val is >> ', defaultValue)
	}, [])

	useEffect(() => {
		if (getSelectedChoice) {
			getSelectedChoice(selectedChoice)
			console.info('sected choice >>>>>>>> ', selectedChoice)
		}
	}, [selectedChoice, defaultValue])

	useEffect(() => {
		if (required && isValid) {
			isValid(selectedChoice ? false : true)
		}

		console.info('is it valid ?? ', selectedChoice ? false : true)
	}, [selectedChoice])

	useEffect(() => {
		setErroMsg(selectedChoice ? '' : `• ${fieldName} is a required field`)
	}, [submitted, selectedChoice])

	return <SelectRoot
		value={selectedChoice}
		defaultValue={[ defaultValue ]}
		onValueChange={e => setSelectedChoice(e)}
		collection={collections_mappable}
		{...rest}
	>
		<SelectLabel>{label}</SelectLabel>
		<SelectTrigger>
			<SelectValueText placeholder={placeholder} />
		</SelectTrigger>
		<SelectContent style={{ zIndex: 10000, color: 'white' }}>
			{collections_mappable.items.map((item) => (
				<SelectItem item={item.value} key={item.value} value={item.value}>
					{item.label}
				</SelectItem>
			))}
		</SelectContent>
		{
			required && !errorMsg || !submitted ? <Text fontSize={13} fontWeight="bold">*Required</Text> : null
		}
		{
			errorMsg && submitted ? <Text fontSize={13} color="red" fontWeight="bold"> {errorMsg} </Text> : null
		}

	</SelectRoot>
}