
'use client'

import { getSessionUser } from '@/app/api/auth/actions'
import { get_user, update_user_password, update_user_profile } from '@/app/api/users/actions';
import { EmailField } from '@/components/ui/forms/email-field';
import { PasswordField } from '@/components/ui/forms/password-field';
import { TextField } from "@/components/ui/forms/text-field"
import { Button, Card, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import { login as login_action } from '@/app/api/auth/actions'
import bcrypt from 'bcryptjs'

export default function SettingsDashboard() {

    
	const [ submitted, setSubmitted ] = useState( false );
	const [ loading, setLoading ] = useState( false );

    const [ user, setUser ] = useState(null);

    const [ userForm, setUserForm ] = useState({
        user_email: { value: '', error: true },
        user_name: { value: '', error: true },
    });

    const [ passwordForm, setPasswordForm ] = useState({
        old_password: { value: '', error: true },
        user_password: { value: '', error: true },
		confirm_password: { value: '', error: true }
    });

    useEffect(() => {
        getUserInfo();
    },[])

    const getUserInfo = async() => {
		const user_data = await getSessionUser();

        const userInfo = await get_user({user_email: user_data.user_email});
        setUser(userInfo);


        setUserForm( prevState => ({
            ...prevState,
            user_email: {
                ...prevState.user_email,
                value: userInfo.user_email
            },
            user_name: {
                ...prevState.user_name,
                value: userInfo.user_name
            },
        }))

    }

    const fieldsHasError = ( form ) => {
		return Object.values(form).some(item => item.error === true)
	}

    const updateProfile = async(ev) => {
        ev.preventDefault()
		setSubmitted( true )

        if (!fieldsHasError(userForm)) {
            setLoading( true )
            try {
                const userRecord = await update_user_profile({
                    user_id: user.user_id,
                    user_email: userForm.user_email.value,
                    user_name: userForm.user_name.value,
                })
                console.log(userForm.user_email.value,user.user_password);
                const resp = await login_action(userForm.user_email.value , user.user_password,user.user_password);
                console.log("resp",resp,);
            } catch ( err ) {
                console.error( 'error in updating account ' , err )
            }
            setLoading( false )
        }
    }

    const updatePassword = async(ev) => {
        ev.preventDefault()
		setSubmitted( true )

      

        
        if (!fieldsHasError(passwordForm)) {    
            setLoading( true )
            try {
                const oldPassword_isMatch = await bcrypt.compare(passwordForm.old_password.value, user.user_password);
                const newPassword_isMatch = passwordForm.user_password.value === passwordForm.confirm_password.value;
        
                if(oldPassword_isMatch && newPassword_isMatch){
                const hash_pass = await bcrypt.hash( passwordForm.user_password.value, 10 )

                const userRecord = await update_user_password({
                    user_id: user.user_id,
                    user_password: hash_pass,
                })
                await login_action( userForm.user_email.value , passwordForm.user_password.value )
                } else {
                    console.log("error"); //Display error message
                }

            } catch ( err ) {
                console.error( 'error in updating password ' , err )
            }
            setPasswordForm( prevState => ({
                ...prevState,
 
    }))
            setLoading( false )
        }
    }


    return <Card.Root
                            variant="elevated"
                            borderRadius="2px"
                            size="lg"
                            w={{ base: "100%", md: "800px" }}
                            mt={5}
                        >
                            <form w={'100%'} onSubmit={updateProfile}>
                                <Card.Body>
                                    <Flex
                                        flexDirection={{ base: "column", md: "row" }}
                                        gap={2}
                                    >
                                        <EmailField
                                            label={"What's your email address"}
                                            name={'user_email'}
                                            placeholder='Enter your email'
                                            fieldName={'Email Address'}
                                            submitted={submitted}
                                            required
                                            defaultValue={ userForm?.user_email?.value }
                                            isValid={e => setUserForm(prevState => ({
                                                ...prevState,
                                                user_email: {
                                                    ...prevState.user_email,
                                                    error: e
                                                }
                                            }))}
                                            getEmailValue={e => setUserForm(prevState => ({
                                                ...prevState,
                                                user_email: {
                                                    ...prevState.user_email,
                                                    value: e
                                                }
                                            }))}
                                        />
                                        <TextField
                                            label={"What's your name"}
                                            name={'user_name'}
                                            placeholder='Enter your name'
                                            fieldName={'User Name'}
                                            required
                                            submitted={submitted}
                                            defaultValue={ userForm?.user_name.value }
                                            isValid={e => setUserForm(prevState => ({
                                                ...prevState,
                                                user_name: {
                                                    ...prevState.user_name,
                                                    error: e
                                                }
                                            }))}
                                            getTextValue={e => setUserForm(prevState => ({
                                                ...prevState,
                                                user_name: {
                                                    ...prevState.user_name,
                                                    value: e
                                                }
                                            }))}
                                        />
                                    </Flex>
                                  
                                   
                                 
    
                                    <Button
                                        variant="subtle"
                                        mt={5}
                                        type="submit"
                                        disabled={loading}
                                    >
                                    {
                                        loading ? "Updating Profile..." : 'Update Profile'
                                    }
                                    </Button>
                                </Card.Body>
    
                            </form>

                            <form w={'100%'} onSubmit={updatePassword}>
                            <Card.Body>
                            <Flex flexDirection={{ base: "column", md: "row" }}
                                                                        gap={2}
                                                                        mt={5}
                                                                    >
                                                                        <PasswordField
                                                                            label={"What's your old password"}
                                                                            name={'old_password'}
                                                                            placeholder='Type your old password'
                                                                            submitted={submitted}
                                                                            fieldName={'Old Password'}
                                                                            isValid={e => setPasswordForm(prevState => ({
                                                                                ...prevState,
                                                                                old_password: {
                                                                                    ...prevState.old_password,
                                                                                    error: e
                                                                                }
                                                                            }))}
                                                                            getPasswordValue={e => setPasswordForm(prevState => ({
                                                                                ...prevState,
                                                                                old_password: {
                                                                                    ...prevState.old_password,
                                                                                    value: e
                                                                                }
                                                                            }))}
                                                                        />

                                                                        <PasswordField
                                                                            label={"What's your password"}
                                                                            name={'password'}
                                                                            placeholder='Type your password'
                                                                            submitted={submitted}
                                                                            fieldName={'Password'}
                                                                            isValid={e => setPasswordForm(prevState => ({
                                                                                ...prevState,
                                                                                user_password: {
                                                                                    ...prevState.user_password,
                                                                                    error: e
                                                                                }
                                                                            }))}
                                                                            getPasswordValue={e => setPasswordForm(prevState => ({
                                                                                ...prevState,
                                                                                user_password: {
                                                                                    ...prevState.user_password,
                                                                                    value: e
                                                                                }
                                                                            }))}
                                                                        />
                                                                        <PasswordField
                                                                            label={"Confirm your password"}
                                                                            name={'confirm_password'}
                                                                            submitted={submitted}
                                                                            placeholder='Retype your password'
                                                                            fieldName={'Confirm password'}
                                                                            isValid={e => setPasswordForm(prevState => ({
                                                                                ...prevState,
                                                                                confirm_password: {
                                                                                    ...prevState.confirm_password,
                                                                                    error: e
                                                                                }
                                                                            }))}
                                                                            getPasswordValue={e => setPasswordForm(prevState => ({
                                                                                ...prevState,
                                                                                confirm_password: {
                                                                                    ...prevState.confirm_password,
                                                                                    value: e
                                                                                }
                                                                            }))}
                                                                        />
                                                                    </Flex>
                                                                    <Button
                                                                        variant="subtle"
                                                                        mt={5}
                                                                        type="submit"
                                                                        disabled={loading}
                                                                    >
                                                                    {
                                                                        loading ? "Updating Password..." : 'Update Password'
                                                                    }
                                                                    </Button>
                                                                    </Card.Body>
    
                                        </form>
                        </Card.Root>
}