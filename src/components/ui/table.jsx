import React, { useState } from "react";
import { Table, Button, Box, HStack, Flex, Text } from "@chakra-ui/react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { Checkbox } from '@/components/ui/checkbox'

export const ResizableTable = ({
	data = [],
	columns = [],
	editAction = false,
	deleteAction = false,
	...rest
}) => {
	const [currentPage, setCurrentPage] = useState(1); // Current page
	const [rowsPerPage, setRowsPerPage] = useState(15); // Rows per page

	// Calculate pagination details
	const totalPages = Math.ceil(data.length / rowsPerPage);
	const startIndex = (currentPage - 1) * rowsPerPage;
	const currentData = data.slice(startIndex, startIndex + rowsPerPage);

	// Handlers
	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const getValue = ( value, real_value, isCheckboxField, toggled ) => {
		if (value == "FALSE" || value == "TRUE" || isCheckboxField) {
			let boolean_value = value?.toLowerCase() === 'true' ? true : false;
				return <Checkbox
				cursor="pointer"
				onChange={() => toggled ? toggled({ value, real_value }) : null }
				defaultChecked={boolean_value}
			> </Checkbox>
		}
		if ( real_value ) {
			return real_value
		}
		if ( !value ) {
			return 'None'
		}
		if ( value instanceof Date ) {
			return Date( value )
		}
		else {
			return value
		}
		
	}

	return (
		<Box bgColor={'white'} w={'100%'} p={3} borderRadius={2} {...rest}>
			{
				data.length == 0 ? 'Empty Records' :
					<>
						<Table.ScrollArea borderWidth="1px" maxW="100%">
							<Table.Root size="sm" variant="outline" showColumnBorder>
								<Table.Header>
									<Table.Row>
										{columns.map((column, index) => (
											<Table.ColumnHeader
												key={index}
												textTransform={'capitalize'}
											>
												{column.label}
											</Table.ColumnHeader>
										))}
										{editAction ? <Table.ColumnHeader> Edit </Table.ColumnHeader> : null}
										{deleteAction ? <Table.ColumnHeader> Delete </Table.ColumnHeader> : null}

									</Table.Row>
								</Table.Header>
								{
									data.length == 0 ? 'Empty Records' :
										<Table.Body>
											{currentData.map((item, rowIndex) => (
												<Table.Row key={rowIndex}>
													{columns.map((column, index) => {
														let real_value = ""
														const parts = column?.value?.split(".")

														if (parts.length > 1) {
															real_value = item[parts[0]][parts[1]] || "None"
														} else {
															real_value = item[column.value] || "None"
														}

														return <Table.Cell key={index}>
															{/* {
																typeof item[column.value] == 'object' ? new Date(item[column.value]).toLocaleString() : real_value
															} */}
															{
																getValue( item[column.value], real_value, column?.checkboxField, column?.toggled )
															}
														</Table.Cell>
													}
													)}
													{
														editAction ?
															<Table.Cell w={65}>
																<Button onClick={() => editAction(item)} size={'sm'}> <FiEdit2 /> </Button>
															</Table.Cell> : null
													}
													{
														deleteAction ?
															<Table.Cell w={65}>
																<Button onClick={() => deleteAction(item)} size={'sm'}> <FiTrash /> </Button>
															</Table.Cell> : null
													}

												</Table.Row>
											))}
										</Table.Body>
								}
							</Table.Root>
						</Table.ScrollArea>

						{/* Pagination Controls */}
						<Flex justifyContent="center" w='100%'>
							<HStack mt={3}>
								{/* Previous Button */}
								<Button
									onClick={() => handlePageChange(currentPage - 1)}
									disabled={currentPage === 1} // Disable when on the first page
								>
									Previous
								</Button>
								<Text>
									Page {currentPage} of {totalPages}
								</Text>
								{/* Next Button */}
								<Button
									onClick={() => handlePageChange(currentPage + 1)}
									disabled={currentPage === totalPages} // Disable when on the last page
								>
									Next
								</Button>
							</HStack>
						</Flex>
					</>
			}
		</Box>
	);
};
