'use server'

import prisma from '@/app/api/lib/db'

export async function create_scheduler({
    scheduler_user_id: scheduler_user_id,
    scheduler_first_name: scheduler_first_name,
    scheduler_last_name: scheduler_last_name,
    scheduler_job_title: scheduler_job_title,
    scheduler_company: scheduler_company,
    scheduler_linkedin_url: scheduler_linkedin_url,
    scheduler_linkedin_keyowrds: scheduler_linkedin_keyowrds,
    scheduler_bad_data: scheduler_bad_data,
    scheduler_invite: scheduler_invite,
    scheduler_accepted: scheduler_accepted,
    scheduler_message_1: scheduler_message_1,
    scheduler_message_2: scheduler_message_2,
    scheduler_message_3: scheduler_message_3,
    scheduler_reply: scheduler_reply,
    scheduler_track: scheduler_track,
    scheduler_review_posted: scheduler_review_posted,
    scheduler_invite_date: scheduler_invite_date,
    scheduler_accepted_date: scheduler_accepted_date,
    scheduler_m1_date: scheduker_m1_date,
    scheduler_m2_date: scheduler_m2_date,
    scheduler_m3_date: scheduler_m3_date,
    scheduler_reply_date: scheduler_reply_date,
    scheduler_location: scheduler_location,
}) {
    return await prisma.scheduler.create({
        data: {
            scheduler_user_id: scheduler_user_id,
            scheduler_first_name: scheduler_first_name,
            scheduler_last_name: scheduler_last_name,
            scheduler_job_title: scheduler_job_title,
            scheduler_company: scheduler_company,
            scheduler_linkedin_url: scheduler_linkedin_url,
            scheduler_linkedin_keyowrds: scheduler_linkedin_keyowrds,
            scheduler_bad_data: scheduler_bad_data,
            scheduler_invite: scheduler_invite,
            scheduler_accepted: scheduler_accepted,
            scheduler_message_1: scheduler_message_1,
            scheduler_message_2: scheduler_message_2,
            scheduler_message_3: scheduler_message_3,
            scheduler_reply: scheduler_reply,
            scheduler_track: scheduler_track,
            scheduler_review_posted: scheduler_review_posted,
            scheduler_invite_date: scheduler_invite_date,
            scheduler_accepted_date: scheduler_accepted_date,
            scheduler_m1_date: scheduker_m1_date,
            scheduler_m2_date: scheduler_m2_date,
            scheduler_m3_date: scheduler_m3_date,
            scheduler_reply_date: scheduler_reply_date,
            scheduler_location: scheduler_location
        }
    })
}

export async function get_schedulers({
    user_id: user_id
}) {
    return await prisma.scheduler.findMany({
        where: {
            scheduler_user_id: user_id
        }
    })
}