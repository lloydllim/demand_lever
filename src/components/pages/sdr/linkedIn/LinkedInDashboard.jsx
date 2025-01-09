'use client'

import { useEffect, useState } from 'react'
import { Card, Flex, Text, Spinner } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { TextField } from "@/components/ui/forms/text-field"
import { add_linkedIn_profile, get_single_linkedIn, update_linkedIn_profile } from '@/app/api/linkedin/action'
import { getSessionUser } from '@/app/api/auth/actions'


export default function LinkedInDashboard() {
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)


    const [ linkedinForm, setLinkedinForm ] = useState({
            title: { value: '', error: true },
            employment_type: { value: '', error: true },
            company_name: { value: '', error: true },
            location: { value: '', error: true },
            start_date: { value: '', error: true },
            description: { value: '', error: true },
            profile_headline: { value: '', error: true },
            skills: { value: '', error: true },
            media_link: { value: '', error: true },
            media_title: { value: '', error: true },
            media_description: { value: '', error: true }
        });


    useEffect(() => {
         getLinkedProfile()
    }, [])
        
const getLinkedProfile = async () => {
		const session_data = await getSessionUser()

        const result = await get_single_linkedIn(session_data.user_id);

        if(result){
            setEditMode(true);
            setLinkedinForm( prevState => ({
                ...prevState,
                title: {
                    ...prevState.title,
                    value: result.linkedin_title
                },
                employment_type: {
                    ...prevState.title,
                    value: result.linkedin_employment_type
                },
                company_name: {
                    ...prevState.title,
                    value: result.linkedin_company_name
                },
                location: {
                    ...prevState.title,
                    value: result.linkedin_company_name
                },
                start_date: {
                    ...prevState.start_date,
                    value: result.linkedin_start_date
                },
                description: {
                    ...prevState.description,
                    value: result.linkedin_description
                },
                profile_headline: {
                    ...prevState.profile_headline,
                    value: result.linkedin_profile_headline
                },
                skills: {
                    ...prevState.skills,
                    value: result.linkedin_skills
                },
                media_link: {
                    ...prevState.media_link,
                    value: result.linkedin_media_link
                },
                media_title: {
                    ...prevState.media_title,
                    value: result.linkedin_media_title
                },
                media_description: {
                    ...prevState.media_description,
                    value: result.linkedin_media_description
                },
            }));
    
        }

     
    }

    const fieldsHasError = ( form ) => {
		return Object.values(form).some(item => item.error === true)
	}

	const submitForm = async (ev) => {
        ev.preventDefault();

        setSubmitted( true )
        console.info( 'linkedInForm info >> ', linkedinForm )

        if ( !fieldsHasError (linkedinForm)) {
            setLoading( true )

            const user_data = await getSessionUser()

            if (editMode) {
                update_linkedIn_profile({
                    linkedin_title: linkedinForm.title.value,
                    linkedin_employment_type: linkedinForm.employment_type.value,
                    linkedin_company_name: linkedinForm.company_name.value,
                    linkedin_location: linkedinForm.location.value,
                    linkedin_start_date: linkedinForm.start_date.value,
                    linkedin_description: linkedinForm.description.value,
                    linkedin_profile_headline: linkedinForm.profile_headline.value,
                    linkedin_skills: linkedinForm.skills.value,
                    linkedin_media_link: linkedinForm.media_link.value,
                    linkedin_media_title: linkedinForm.media_title.value,
                    linkedin_media_description: linkedinForm.media_description.value,
                }, user_data.user_id);
            } else {
                add_linkedIn_profile({
                    linkedin_title: linkedinForm.title.value,
                    linkedin_employment_type: linkedinForm.employment_type.value,
                    linkedin_company_name: linkedinForm.company_name.value,
                    linkedin_location: linkedinForm.location.value,
                    linkedin_start_date: linkedinForm.start_date.value,
                    linkedin_description: linkedinForm.description.value,
                    linkedin_profile_headline: linkedinForm.profile_headline.value,
                    linkedin_skills: linkedinForm.skills.value,
                    linkedin_media_link: linkedinForm.media_link.value,
                    linkedin_media_title: linkedinForm.media_title.value,
                    linkedin_media_description: linkedinForm.media_description.value,
                }, user_data.user_id);

                setEditMode(true);
            }
           

            // await getLinkedProfile()
            setLoading( false )
        }

    }

 return <Flex w={'100%'}>
         <form onSubmit={submitForm} style={{ width: '100%' }}>
             <Text fontSize={24} py={3}> LinkedIn Profile Form </Text>
             <Card.Root>
                 <Card.Body>
                     <Flex flexDirection="column" w={'100%'} gap={2}>
                         <TextField
                             fieldName={'Title'}
                             label={"Title"}
                             name={'title'}
                             placeholder="Enter your title"
                             required
                             defaultValue={ linkedinForm?.title?.value }
                             isValid={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 title: {
                                     ...prevState.title,
                                     error: e 
                                 }
                             }))}
                             getTextValue={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 title: {
                                     ...prevState.title,
                                     value: e 
                                 }
                             }))}
                             submitted={submitted}
                         />
                         <TextField
                             fieldName={'Employment Type'}
                             label={"Employment Type"}
                             name={'employment_type'}
                             placeholder="Enter your employment type"
                             required
                             defaultValue={ linkedinForm?.employment_type?.value }
                             isValid={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 employment_type: {
                                     ...prevState.employment_type,
                                     error: e 
                                 }
                             }))}
                             getTextValue={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 employment_type: {
                                     ...prevState.employment_type,
                                     value: e 
                                 }
                             }))}
                             submitted={submitted}
                         />
                          <TextField
                             fieldName={'Company Name'}
                             label={"Company Name"}
                             name={'company_name'}
                             placeholder="Enter your company name"
                             required
                             defaultValue={ linkedinForm?.company_name?.value }
                             isValid={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 company_name: {
                                     ...prevState.company_name,
                                     error: e 
                                 }
                             }))}
                             getTextValue={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 company_name: {
                                     ...prevState.company_name,
                                     value: e 
                                 }
                             }))}
                             submitted={submitted}
                         />
                          <TextField
                             fieldName={'Location'}
                             label={"Location"}
                             name={'location'}
                             placeholder="Enter your location"
                             required
                             defaultValue={ linkedinForm?.location?.value }
                             isValid={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 location: {
                                     ...prevState.location,
                                     error: e 
                                 }
                             }))}
                             getTextValue={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 location: {
                                     ...prevState.location,
                                     value: e 
                                 }
                             }))}
                             submitted={submitted}
                         />
                           <TextField
                             fieldName={'Start Date'}
                             label={"Start Date"}
                             name={'start_date'}
                             placeholder="Enter your start date"
                             required
                             defaultValue={ linkedinForm?.start_date?.value }
                             isValid={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 start_date: {
                                     ...prevState.start_date,
                                     error: e 
                                 }
                             }))}
                             getTextValue={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 start_date: {
                                     ...prevState.start_date,
                                     value: e 
                                 }
                             }))}
                             submitted={submitted}
                         />
                          <TextField
                             fieldName={'Description'}
                             label={"Description"}
                             name={'description'}
                             placeholder="Enter your description"
                             required
                             defaultValue={ linkedinForm?.description?.value }
                             isValid={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 description: {
                                     ...prevState.description,
                                     error: e 
                                 }
                             }))}
                             getTextValue={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 description: {
                                     ...prevState.description,
                                     value: e 
                                 }
                             }))}
                             submitted={submitted}
                         />
                          <TextField
                             fieldName={'Profile Headline'}
                             label={"Profile Headline"}
                             name={'profile_headline'}
                             placeholder="Enter your profile headline"
                             required
                             defaultValue={ linkedinForm?.profile_headline?.value }
                             isValid={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 profile_headline: {
                                     ...prevState.profile_headline,
                                     error: e 
                                 }
                             }))}
                             getTextValue={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 profile_headline: {
                                     ...prevState.profile_headline,
                                     value: e 
                                 }
                             }))}
                             submitted={submitted}
                         />
                            <TextField
                             fieldName={'Skills'}
                             label={"Skills"}
                             name={'skills'}
                             placeholder="Enter your skills"
                             required
                             defaultValue={ linkedinForm?.skills?.value }
                             isValid={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 skills: {
                                     ...prevState.skills,
                                     error: e 
                                 }
                             }))}
                             getTextValue={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 skills: {
                                     ...prevState.skills,
                                     value: e 
                                 }
                             }))}
                             submitted={submitted}
                         />
                         <TextField
                             fieldName={'Media Link'}
                             label={"Media Link"}
                             name={'media_link'}
                             placeholder="Enter your media link"
                             required
                             defaultValue={ linkedinForm?.media_link?.value }
                             isValid={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 media_link: {
                                     ...prevState.media_link,
                                     error: e 
                                 }
                             }))}
                             getTextValue={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 media_link: {
                                     ...prevState.media_link,
                                     value: e 
                                 }
                             }))}
                             submitted={submitted}
                         />
                          <TextField
                             fieldName={'Media Title'}
                             label={"Media Title"}
                             name={'media_title'}
                             placeholder="Enter your media title"
                             required
                             defaultValue={ linkedinForm?.media_title?.value }
                             isValid={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 media_title: {
                                     ...prevState.media_title,
                                     error: e 
                                 }
                             }))}
                             getTextValue={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 media_title: {
                                     ...prevState.media_title,
                                     value: e 
                                 }
                             }))}
                             submitted={submitted}
                         />
                          <TextField
                             fieldName={'Media Description'}
                             label={"Media Description"}
                             name={'media_description'}
                             placeholder="Enter your media description"
                             required
                             defaultValue={ linkedinForm?.media_description?.value }
                             isValid={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 media_description: {
                                     ...prevState.media_description,
                                     error: e 
                                 }
                             }))}
                             getTextValue={ e => setLinkedinForm( prevState => ({
                                 ...prevState,
                                 media_description: {
                                     ...prevState.media_description,
                                     value: e 
                                 }
                             }))}
                             submitted={submitted}
                         />
                     </Flex>
 
                     <Flex>
 
                     
 
                     </Flex>
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

                         loading ? <> <Spinner /> Submiting Form... </> : editMode ? "Save Changes" : "Submit Form"
                     }
                 </Button>
             </Flex>
         </form>
     </Flex>
}