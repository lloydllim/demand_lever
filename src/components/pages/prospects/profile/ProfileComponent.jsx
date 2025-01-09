'use client'

import { TextField } from "@/components/ui/forms/text-field"
import { Flex, Card, Textarea, Text, Spinner } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { CheckboxList } from '@/components/ui/checkbox-list'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { get_single_prospect, edit_prospect } from "@/app/api/prospects/actions"
import { getSessionUser } from '@/app/api/auth/actions'

export default function ProspectProfileComponent() {
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const [prospectInfo, setProspectInfo] = useState({
        prospect_id: {
            value: '',
            error: false
        },
        prospect_first_name: {
            value: '',
            error: true
        },
        prospect_last_name: {
            value: '',
            error: true
        },
        prospect_email_address: {
            value: '',
            error: true
        },
        prospect_linkedin_profile: {
            value: '',
            error: true
        }
    })

    const [companyInfo, setCompanyInfo] = useState({
        prospect_company_name: {
            value: '',
            error: true
        },
        prospect_website: {
            value: '',
            error: true
        },
        prospect_phone_number: {
            value: '',
            error: true
        },
        prospect_headcount: {
            value: '',
            error: true
        },
        prospect_job_title: {
            value: '',
            error: true
        },
    })
    
    const [hyperVendorForm, setHyperVendorForm] = useState({
        prospect_phone_number: {
            value: '',
            error: true
        },
        prospect_important_notes: {
            value: '',
            error: true
        },
        prospect_frequency: {
            value: '',
            error: true
        },
        prospect_other_services: {
            value: '',
            error: true
        },
        prospect_important_notes: {
            value: '',
            error: true
        }

    })

    useEffect(() => {
        getProfile()
    }, [ ])

    const getProfile = async () => {
		const session_data = await getSessionUser()

        const rec = await get_single_prospect({
            prospect_id: session_data.id
        })


        setHyperVendorForm( prevState => ({
            ...prevState,
            prospect_other_services: {
                ...prevState.prospect_other_services,
                value: rec.prospect_other_services
            },
            prospect_frequency: {
                ...prevState.prospect_frequency,
                value: rec.prospect_frequency
            },
            prospect_important_notes: {
                ...prevState.prospect_important_notes,
                value: rec.prospect_important_notes
            }
        }))

        setCompanyInfo( prevState => ({
            ...prevState,
            prospect_company_name: {
                ...prevState.prospect_company_name,
                value: rec.prospect_company_name
            },
            prospect_website: {
                ...prevState.prospect_website,
                value: rec.prospect_website
            },
            prospect_phone_number: {
                ...prevState.prospect_phone_number,
                value: rec.prospect_phone_number
            },
            prospect_headcount: {
                ...prevState.prospect_headcount,
                value: rec.prospect_headcount
            },
            prospect_job_title: {
                ...prevState.prospect_job_title,
                value: rec.prospect_job_title
            }
        }))
        

        setProspectInfo( prevState => ({
            ...prevState,
            prospect_id: {
                ...prevState.prospect_id,
                value: rec.prospect_id
            },
            prospect_first_name: {
                ...prevState.prospect_first_name,
                value: rec.prospect_first_name
            },
            prospect_last_name: {
                ...prevState.prospect_last_name,
                value: rec.prospect_last_name
            },
            prospect_linkedin_profile: {
                ...prevState.prospect_linkedin_profile,
                value: rec.prospect_linkedin_profile
            },
            prospect_email_address: {
                ...prevState.prospect_email_address,
                value: rec.prospect_email_address
            }
        }))

    }

    const fieldsHasError = ( form ) => {
		return Object.values(form).some(item => item.error === true)
	}

    const saveChanges = async (ev) => {
        ev.preventDefault()

        setSubmitted( true )
        console.info( 'hyperVendorForm info >> ', hyperVendorForm )

        if ( !fieldsHasError (prospectInfo) || !fieldsHasError(companyInfo) || !fieldsHasError(hyperVendorForm) ) {
            setLoading( true )
            await edit_prospect({
                prospect_id: prospectInfo.prospect_id.value,
                prospect_first_name: prospectInfo.prospect_first_name.value,
                prospect_last_name: prospectInfo.prospect_last_name.value,
                prospect_email_address: prospectInfo.prospect_email_address.value,
                prospect_linkedin_profile: prospectInfo.prospect_linkedin_profile.vaue,
                prospect_company_name: companyInfo.prospect_company_name.value,
                prospect_website: companyInfo.prospect_website.value,
                prospect_phone_number: companyInfo.prospect_phone_number.value,
                prospect_headcount: companyInfo.prospect_headcount.value,
                prospect_job_title: companyInfo.prospect_job_title.value,
                prospect_other_services: hyperVendorForm.prospect_other_services.value.join(','),
                prospect_frequency: hyperVendorForm.prospect_frequency.value.join(','),
                prospect_important_notes: hyperVendorForm.prospect_important_notes.value
            })
            await getProfile()
            setLoading( false )
        }
    }

    const getDefaultChecklists = ( defaultList ) => {
        return defaultList.includes(',') ? defaultList.split(',') : [defaultList]
    }

    return <Flex w={'100%'}>
        <form onSubmit={saveChanges} style={{ width: '100%' }}>
            <Text fontSize={24} py={3}> Personal Information </Text>
            <Card.Root>
                <Card.Body>
                    <Flex flexDirection="row" w={'100%'} gap={3}>
                        <TextField
                            fieldName={'first name'}
                            label={"What's your first name"}
                            name={'first_name'}
                            placeholder="Enter your first name"
                            required
                            defaultValue={ prospectInfo?.prospect_first_name?.value }
                            isValid={ e => setProspectInfo( prevState => ({
                                ...prevState,
                                prospect_first_name: {
                                    ...prevState.prospect_first_name,
                                    error: e 
                                }
                            }))}
                            getTextValue={ e => setProspectInfo( prevState => ({
                                ...prevState,
                                prospect_first_name: {
                                    ...prevState.prospect_first_name,
                                    value: e 
                                }
                            }))}
                            submitted={submitted}
                        />
                        <TextField
                            fieldName={'last name'}
                            label={"What's your last name"}
                            name={'last_name'}
                            placeholder="Enter your last name"
                            required
                            defaultValue={ prospectInfo?.prospect_last_name?.value }
                            submitted={submitted}
                            isValid={ e => setProspectInfo( prevState => ({
                                ...prevState,
                                prospect_last_name: {
                                    ...prevState.prospect_last_name,
                                    error: e 
                                }
                            }))}
                            getTextValue={ e => setProspectInfo( prevState => ({
                                ...prevState,
                                prospect_last_name: {
                                    ...prevState.prospect_last_name,
                                    value: e 
                                }
                            }))}
                        />
                        <TextField
                            fieldName={'linkedin profile'}
                            label={"What's your linkedin profile link"}
                            name={'last_name'}
                            placeholder="Enter your linkedin profile"
                            required
                            defaultValue={ prospectInfo?.prospect_linkedin_profile?.value }
                            submitted={submitted}
                            isValid={ e => setProspectInfo( prevState => ({
                                ...prevState,
                                prospect_linkedin_profile: {
                                    ...prevState.prospect_linkedin_profile,
                                    error: e 
                                }
                            }))}
                            getTextValue={ e => setProspectInfo( prevState => ({
                                ...prevState,
                                prospect_linkedin_profile: {
                                    ...prevState.prospect_linkedin_profile,
                                    value: e 
                                }
                            }))}
                        />
                    </Flex>

                    <Flex>

                        <Flex mt={5} w="100%">
                            <TextField
                                fieldName={'email address'}
                                label={"Your email address to receive a calendar invite ? This information is only shared between DealForce, Pipelinear and the Client. No one else."}
                                name={'email_address'}
                                placeholder="Enter your email address"
                                required
                                defaultValue={ prospectInfo?.prospect_email_address?.value }
                                submitted={submitted}
                                isValid={ e => setProspectInfo( prevState => ({
                                    ...prevState,
                                    prospect_email_address: {
                                        ...prevState.prospect_email_address,
                                        error: e 
                                    }
                                }))}
                                getTextValue={ e => setProspectInfo( prevState => ({
                                    ...prevState,
                                    prospect_email_address: {
                                        ...prevState.prospect_email_address,
                                        value: e 
                                    }
                                }))}
                            />
                        </Flex>

                    </Flex>
                </Card.Body>
            </Card.Root>

            <Text fontSize={24} py={3} mt={5}> Company Information </Text>
            <Card.Root>
                <Card.Body>
                    <Flex flexDirection="row" w={'100%'} gap={3}>
                        <TextField
                            fieldName={'Company name'}
                            label={"What is your company name"}
                            name={'company_name'}
                            placeholder="Enter your company name"
                            defaultValue={ companyInfo.prospect_company_name.value }
                            required
                            isValid={ e => setCompanyInfo( prevState => ({
                                ...prevState,
                                prospect_company_name: {
                                   ...prevState.prospect_company_name,
                                   error: e
                                }
                               }))
                           }
                            getTextValue={ e => setCompanyInfo( prevState => ({
                                ...prevState,
                                prospect_company_name: {
                                   ...prevState.prospect_company_name,
                                   value: e
                                }
                               }))
                           }
                            submitted={submitted}
                        />
                        <TextField
                            fieldName={'Company position'}
                            label={"What is your company position"}
                            name={'last_name'}
                            placeholder="Enter your company position"
                            required
                            defaultValue={ companyInfo.prospect_job_title.value }
                            isValid={ e => setCompanyInfo( prevState => ({
                                ...prevState,
                                prospect_job_title: {
                                   ...prevState.prospect_job_title,
                                   error: e
                                }
                               }))
                           }
                            getTextValue={ e => setCompanyInfo( prevState => ({
                                ...prevState,
                                prospect_job_title: {
                                   ...prevState.prospect_job_title,
                                   value: e
                                }
                               }))
                           }
                            submitted={submitted}
                        />
                        <TextField
                            fieldName={'Company website'}
                            label={"What's your company's website"}
                            name={'last_name'}
                            placeholder="Enter your company website"
                            required
                            defaultValue={ companyInfo.prospect_website.value }
                            isValid={ e => setCompanyInfo( prevState => ({
                                ...prevState,
                                prospect_website: {
                                   ...prevState.prospect_website,
                                   error: e
                                }
                               }))
                           }
                            getTextValue={ e => setCompanyInfo( prevState => ({
                                ...prevState,
                                prospect_website: {
                                   ...prevState.prospect_website,
                                   value: e
                                }
                               }))
                           }
                            submitted={submitted}
                        />
                    </Flex>

                    <Flex>
                        <Flex mt={5} w="100%">
                            <TextField
                                fieldName={'Employee count'}
                                label={"How many full time, part time, and contractors work at your organization?"}
                                name={'emplyoee_count'}
                                placeholder="Enter # of employees"
                                required
                                defaultValue={ companyInfo.prospect_headcount.value }
                                isValid={ e => setCompanyInfo( prevState => ({
                                    ...prevState,
                                    prospect_headcount: {
                                       ...prevState.prospect_headcount,
                                       error: e
                                    }
                                   }))
                               }
                                getTextValue={ e => setCompanyInfo( prevState => ({
                                    ...prevState,
                                    prospect_headcount: {
                                       ...prevState.prospect_headcount,
                                       value: e
                                    }
                                   }))
                               }
                                submitted={submitted}
                            />
                        </Flex>

                    </Flex>
                </Card.Body>
            </Card.Root>

            <Text fontSize={24} py={3} mt={5}> Hyper Vendor Information </Text>
            <Card.Root>
                <Card.Body>
                    <Flex flexDirection="row" w={'100%'} gap={3}>
                        <TextField
                            fieldName={'Phone number'}
                            label={"TEXTING: What is the best phone number to text you"}
                            name={'phone_number'}
                            placeholder="Enter your preferred phone number"
                            required
                            defaultValue={ companyInfo?.prospect_phone_number?.value }
                            isValid={ e => setCompanyInfo( prevState => ({
                                    ...prevState,
                                    prospect_phone_number: {
                                        ...prevState.prospect_phone_number,
                                        error: e
                                    }
                                }))
                            }
                            getTextValue={ e => setCompanyInfo( prevState => ({
                                 ...prevState,
                                 prospect_phone_number: {
                                    ...prevState.prospect_phone_number,
                                    value: e
                                 }
                                }))
                            }
                            submitted={submitted}
                        />
                    </Flex>

                    <Flex>
                        <CheckboxList
                            mt={5}
                            header="What type of company (services/products) do you want to have meetings with?"
                            defaultValues={ getDefaultChecklists( hyperVendorForm?.prospect_other_services?.value ) }
                            items={
                                [
                                    { label: "Growth Marketing agencies", value: "Growth Marketing agencies" },
                                    { label: "Recruiting and staffing firms", value: 'Recruiting_and_staffing_firms' },
                                    { label: "Productivity software or consultants", value: "Productivity software or consultants" },
                                    { label: "Software or SaaS companies", value: "Software or SaaS companies" },
                                    { label: "Business growth software or consultants", value: "Business growth software or consultants" },
                                    { label: "CRM, Outreach software or services", value: "CRM Outreach software or services" },
                                    { label: "Accounting and financial for taxes or cash flow growth", value: "Accounting and financial for taxes or cash flow growth" },
                                    { label: "General business consulting", value: "General business consulting" },
                                    { label: "Other", value: "Other" }
                                ]
                            }
                            getSelectedChoices={ e => setHyperVendorForm( prevState => ({
                                ...prevState,
                                prospect_other_services: {
                                    ...prevState.prospect_other_services,
                                    value: e
                                }
                            }))}
                        />

                    </Flex>
                    <CheckboxList
                        mt={5}
                        header="How frequently would you like to have 30-min demo calls?"
                        defaultValues={ getDefaultChecklists ( hyperVendorForm?.prospect_frequency?.value )}
                        items={
                            [
                                { label: "1 per week for $100 Amazon eCard", value: "1 per week for $100 Amazon eCard" },
                                { label: "2 per week for $200 Amaznon eCard", value: "2 per week for $200 Amaznon eCard" },
                                { label: "3 per week for $300 Amazon eCard", value: "3 per week for $300 Amazon eCard" },
                            ]
                        }
                        getSelectedChoices={ e => setHyperVendorForm( prevState => ({
                            ...prevState,
                            prospect_frequency: {
                                ...prevState.prospect_frequency,
                                value: e
                            }
                        }))}
                    />

                    <Field
                        mt={5}
                        label="Additional Notes"
                    >
                        <Textarea
                            variant="outline"
                            p={2}
                            placeholder='Enter additional notes'
                            value={hyperVendorForm.prospect_important_notes?.value}
                            onChange={ e => setHyperVendorForm( prevState => ({
                                ...prevState,
                                prospect_important_notes: {
                                    ...prevState.prospect_important_notes,
                                    value: e.target.value
                                }
                            }))}
                            border="1px solid #c4c4c4"
                        ></Textarea>
                    </Field>
                </Card.Body>
            </Card.Root>

            <Flex flex={1} w={'100%'} py={5} justifyContent='center'>
                <Button
                    backgroundColor="black"
                    w="49%"
                    bgColor={loading ? 'gray.600' : 'black'}
                    color="white"
                    py={5}
                    type="submit"
                    variant="subtle"
                    fontSize="12px"
                >
                    {
                        loading ? <> <Spinner /> Saving Changes... </> : "Save Changes"
                    }
                </Button>
            </Flex>
        </form>
    </Flex>
}