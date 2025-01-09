'use server'

import prisma from '@/app/api/lib/db'

export async function add_linkedIn_profile({
    linkedin_title,
    linkedin_employment_type,
    linkedin_company_name,
    linkedin_location,
    linkedin_start_date,
    linkedin_description,
    linkedin_profile_headline,
    linkedin_skills,
    linkedin_media_link,
    linkedin_media_title,
    linkedin_media_description
},  linkedin_user_id) {
    return await prisma.linkedIn.create({
        data: {
            linkedin_title,
            linkedin_user_id,
            linkedin_employment_type,
            linkedin_company_name,
            linkedin_location,
            linkedin_start_date,
            linkedin_description,
            linkedin_profile_headline,
            linkedin_skills,
            linkedin_media_link,
            linkedin_media_title,
            linkedin_media_description
        }
    })
}

export async function update_linkedIn_profile({
    linkedin_title,
    linkedin_employment_type,
    linkedin_company_name,
    linkedin_location,
    linkedin_start_date,
    linkedin_description,
    linkedin_profile_headline,
    linkedin_skills,
    linkedin_media_link,
    linkedin_media_title,
    linkedin_media_description
},  linkedin_user_id) {
    return await prisma.linkedIn.update({
        data: {
            linkedin_title,
            linkedin_employment_type,
            linkedin_company_name,
            linkedin_location,
            linkedin_start_date,
            linkedin_description,
            linkedin_profile_headline,
            linkedin_skills,
            linkedin_media_link,
            linkedin_media_title,
            linkedin_media_description
        },
        where: {
			linkedin_user_id: linkedin_user_id
		}
    })
}

export async function get_single_linkedIn(
    user_id
) {
    
    const linkedIn = await prisma.linkedIn.findUnique({
        where: {
            linkedin_user_id: user_id
        }
    })
    return linkedIn
}