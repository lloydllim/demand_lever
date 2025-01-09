"use client"

import {
	DialogActionTrigger,
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
	DialogTrigger,

} from "@/components/ui/dialog"
import { Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"

export const Modal = ({
	toggleModal = false,
	title,
	children,
	getModalState,
	onSubmit,
	submitText,
	cancelText = "Cancel"
}) => {
	const [open, setOpen] = useState(toggleModal)

	useEffect(() => {
		setOpen(toggleModal)
	}, [toggleModal])

	useEffect(() => {
		if ( getModalState ) {
			getModalState( open )
		}
	}, [ open ])

	return (
		<DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle> {title || "Dialog Title"} </DialogTitle>
				</DialogHeader>
				<DialogBody>
					{children}
				</DialogBody>
				<DialogFooter>
					<DialogActionTrigger asChild>
						<Button variant="outline">{cancelText}</Button>
					</DialogActionTrigger>
					{
						onSubmit ? <Button onClick={() => onSubmit()}> { submitText ? submitText : 'Save' } </Button> : null
					}
					
				</DialogFooter>
				<DialogCloseTrigger />
			</DialogContent>
		</DialogRoot>
	)
}
