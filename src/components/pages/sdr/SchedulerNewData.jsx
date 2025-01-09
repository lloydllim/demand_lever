'use client'
import { Flex, Box } from "@chakra-ui/react"
import { create_scheduler } from "@/app/api/scheduler/actions"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function SchedulerNewData() {
    const [status, setStatus] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [csvData, setCsvData] = useState(null);

     const handleFileUpload = (event) => {
            console.info('uploading >> ')
            const file = event.target.files[0];
            if (!file) {
                alert('Please upload a valid CSV file!');
                return;
            }
    
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                setCsvData(parseCSV(text)); // Parse and set the data
            };
            reader.readAsText(file);
        }

    async function processInBatches(user_data, data, batchSize) {
        for (let i = 0; i < data.length; i += batchSize) {
            const batch = data.slice(i, i + batchSize);

            // Process the batch
            await Promise.all(
                batch.map(async (item) => {
                    try {
                        await create_scheduler({
                            scheduler_user_id: user_data.user_id,
                            scheduler_first_name: item['FirstName'] || item["First name"],
                            scheduler_last_name: item['Last Name'] || item["Last name"],
                            scheduler_accepted: item['Accepted'],
                            scheduler_accepted_date: item['Accepted Date'],
                            scheduler_bad_data: item['Bad Data'],
                            scheduler_company: item['Company'] || item['Company Name'],
                            scheduler_invite: item['Invite'],
                            scheduler_invite_date: item['Invite Date'],
                            scheduler_job_title: item['Job Title'] || item['Title'],
                            scheduler_linkedin_keyowrds: item['LinkedIn Keywords Search'],
                            scheduler_linkedin_url: item['LinkedIn URL'] || item['Linkedin'],
                            scheduler_m1_date: item['M1 Date'],
                            scheduler_m2_date: item['M2 Date'],
                            scheduler_m3_date: item['M3 Date'],
                            scheduler_message_1: item['Message 1'],
                            scheduler_message_2: item['Message 2'],
                            scheduler_message_3: item['Message 3'],
                            scheduler_reply: item['Reply'],
                            scheduler_reply_date: item['Reply Date'],
                            scheduler_review_posted: item['Review Posted'],
                            scheduler_track: item['Track'],
                            scheduler_location: item['Location']
                        });
                    } catch (error) {
                        console.error('Error processing item:', item, error);
                    }
                })
            );

            // Add a 2-second delay before processing the next batch
            if (i + batchSize < data.length) {
                setStatus(`Processed batch ${i / batchSize + 1} of ${Math.trunc(Number(data.length / batchSize))}. Waiting 2 seconds before next batch...`)
                console.log(`Processed batch ${i / batchSize + 1}. Waiting 2 seconds before next batch...`);
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }
    }

    const uploadCsvData = async () => {
        const user_data = await getSessionUser()
        setUploading(true)

        console.info('uploading csv data >>> ', csvData)
        await processInBatches(user_data, csvData, 50);
        await getSchedulerData()
        setUploading(false)
    }

    return <Flex flexDirection="column" w='100%'>
        <Box>
            <input
                type="file"
                id="fileInput"
                onChange={handleFileUpload}
                accept=".csv" />
            <Button
                variant='subtle'
                ml={3}
                onClick={() => uploadCsvData()}
                disabled={!csvData}
            >
                {
                    uploading ? "Uploading..." : "Upload CSV Data"
                }
            </Button>

        </Box>
        {
            status ? <Box>
                {status}
            </Box> : null
        }
    </Flex>
}