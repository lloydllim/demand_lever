'use client'

import { getSessionUser } from "@/app/api/auth/actions"
import { Button } from "@/components/ui/button"
import { ResizableTable } from "@/components/ui/table"
import { Box, Flex, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { get_schedulers } from "@/app/api/scheduler/actions"
import { updateOrCreateAnalytics } from '@/app/api/analytics/actions'

export default function SchedulerDashboard() {
    const [data, setData] = useState([])
    const [ loading, setLoading ] = useState( false )

    let uuid = null

    useEffect(() => {
        uuid = uuidv4()
        getSchedulerData()
    }, [])

    const getSchedulerData = async () => {
        setLoading( true )
        const user_data = await getSessionUser()

        const rec = await get_schedulers({ user_id: user_data.user_id })
        console.info(rec)
        setData(rec)
        setLoading( false )
    }

    const parseCSV = (data) => {
        console.info('import csv')

        const lines = data.trim().split('\n');
        const headers = lines[0].split(',');
        const rows = lines.slice(1);

        return rows.map((row) => {
            // Split by comma, while keeping quotes in mind
            const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

            // Remove double quotes from the elements that were inside quotes
            const finalValues = values.map(item => item.replace(/^"(.*)"$/, '$1'));

            return headers.reduce((acc, header, index) => {
                acc[header] = finalValues[index] || ''; // Default to empty string if no value
                return acc;
            }, {});
        });
    }

    // Usage: Process data in batches of 50 with a 2-second interval between batches
    // Process 50 records at a time

    return <Flex flexDirection="column" w='100%'>
        <Box mt={3}>
            {
                loading ? <Flex justifyContent="center"> <Spinner /> <span ml={5}> Loading Data... </span> </Flex> :  <ResizableTable
                data={data}
                columns={
                    [
                        { label: "First Name", value: "scheduler_first_name" },
                        { label: "Last Name", value: "scheduler_last_name" },
                        { label: "Job Title", value: "scheduler_job_title" },
                        { label: "Company", value: "scheduler_company" },
                        { label: "Location", value: "scheduler_location" },
                        { label: "Linkedin Url", value: "scheduler_linkedin_url" },
                        { label: "Linkedin keywords", value: "scheduler_linkedin_keyowrds" },
                        { label: "Bad Data", value: "scheduler_bad_data", checkboxField: true },
                        { label: "Invite", value: "scheduler_invite" , checkboxField: true, toggled: (e) => updateOrCreateAnalytics( new Date() ) },
                        { label: "Accepted", value: "scheduler_accepted", checkboxField: true  },
                        { label: "Message 1", value: "scheduler_message_1", checkboxField: true, toggled: (e) => updateOrCreateAnalytics( new Date() ) },
                        { label: "Message 2", value: "scheduler_message_2", checkboxField: true, toggled: (e) => updateOrCreateAnalytics( new Date() ) },
                        { label: "Message 3", value: "scheduler_message_3", checkboxField: true, toggled: (e) => updateOrCreateAnalytics( new Date() ) },
                        { label: "Reply", value: "scheduler_reply", checkboxField: true  },
                        { label: "Track", value: "scheduler_track", checkboxField: true },
                        { label: "Review Posted", value: "scheduler_review_posted", checkboxField: true },
                        { label: "Invite Date", value: "scheduler_invite_date" },
                        { label: "Accepted Date", value: "scheduler_accepted_date" },
                        { label: "M1 Date", value: "scheduler_m1_date" },
                        { label: "M2 Date", value: "scheduler_m2_date" },
                        { label: "M3 Date", value: "scheduler_m3_date" },
                        { label: "Reply Date", value: "scheduler_reply_date" },
                        { label: "Review Posted", value: "scheduler_review_posted" },
                    ]
                }
            />
            }
           
        </Box>

    </Flex>
}