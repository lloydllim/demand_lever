import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Text, Spinner } from "@chakra-ui/react";

const Stepper = ({ steps, onSubmit, getCurrentStep, loading = false, loadingText = "Saving..." }) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState({}); // Collect data from all steps

	useEffect(() => {
		getCurrentStep( currentStep )
	}, [currentStep])

	const handleNext = () => {
		if (currentStep < steps.length) {
			setCurrentStep((prevStep) => prevStep + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep((prevStep) => prevStep - 1);
		}
	};

	return (
		<Box width="100%" p={5}>
			{/* Stepper Header */}
			<Flex mb={5} justify="space-between">
				{steps.map((step, index) => (
					<Box key={step.id} textAlign="center">
						<Text
							fontWeight="bold"
							color={index + 1 <= currentStep ? "teal.500" : "gray.500"}
						>
							{step.label}
						</Text>
						<Text
							fontSize="sm"
							color={index + 1 <= currentStep ? "teal.300" : "gray.400"}
						>
							{step.description}
						</Text>
					</Box>
				))}
			</Flex>

			{/* Step Content */}
			<Box my={8} p={5} borderWidth="1px" borderRadius="md">
				{
					steps.map( step => step.component )
				}
			</Box>

			{/* Navigation */}
			<Flex justify="space-between">
				<Button onClick={handleBack} isDisabled={currentStep === 1} colorScheme="gray">
					Back
				</Button>
				{currentStep === steps.length ? (
					<Button
						onClick={() => !loading ? onSubmit(formData) : null }
						bgColor={ loading ? 'gray.600' : 'black'}
						colorScheme="teal"
					>
						{
							loading ? <> <Spinner /> {loadingText} </> : 'Finish'
						}
					</Button>
				) : (
					<Button onClick={handleNext} colorScheme="teal">
						Next
					</Button>
				)}
			</Flex>
		</Box>
	);
};

export default Stepper;
