'use server'
import prisma from "@/app/api/lib/db"

export async function add_prospect({
	prospect_last_name,
	prospect_first_name,
	prospect_job_title,
	prospect_industry,
	prospect_headcount,
	prospect_important_notes,
	prospect_pitched_campaigns,
	prospect_company_name,
	prospect_company_description,
	prospect_phone_number,
	prospect_email_address,
	prospect_website,
	prospect_frequency,
	prospect_other_services,
	prospect_date_submitted,
	prospect_function,
	prospect_location,
	prospect_linkedin_profile,
	prospect_onboarding_week,
	prospect_timezone,
	prospect_password_hash
}) {
	return await prisma.prospects.create({
		data: {
			prospect_company_description: prospect_company_description,
			prospect_first_name: prospect_first_name,
			prospect_last_name: prospect_last_name,
			prospect_job_title: prospect_job_title,
			prospect_industry: prospect_industry,
			prospect_headcount: prospect_headcount,
			prospect_important_notes: prospect_important_notes,
			prospect_pitched_campaigns: prospect_pitched_campaigns,
			prospect_company_name: prospect_company_name,
			prospect_phone_number: prospect_phone_number,
			prospect_email_address: prospect_email_address,
			prospect_website: prospect_website,
			prospect_frequency: prospect_frequency,
			prospect_other_services: prospect_other_services,
			prospect_date_submitted: prospect_date_submitted,
			prospect_function: prospect_function,
			prospect_location: prospect_location,
			prospect_linkedin_profile: prospect_linkedin_profile,
			prospect_onboarding_week: prospect_onboarding_week,
			prospect_timezone: prospect_timezone,
			prospect_password_hash: prospect_password_hash,
			prospect_processed: false,
			prospect_status: "pending",
			prospect_created: new Date(),
			prospect_last_updated: new Date(),
			prospect_full_name: `${prospect_first_name} ${prospect_last_name}`
		}
	})
}

export async function edit_prospect({
	prospect_id,
	prospect_last_name,
	prospect_first_name,
	prospect_job_title,
	prospect_industry,
	prospect_headcount,
	prospect_important_notes,
	prospect_pitched_campaigns,
	prospect_company_name,
	prospect_company_description,
	prospect_phone_number,
	prospect_email_address,
	prospect_website,
	prospect_frequency,
	prospect_other_services,
	prospect_date_submitted,
	prospect_function,
	prospect_location,
	prospect_linkedin_profile,
	prospect_onboarding_week
}) {
	return await prisma.prospects.update({
		data: {
			prospect_company_description: prospect_company_description,
			prospect_first_name: prospect_first_name,
			prospect_last_name: prospect_last_name,
			prospect_full_name: `${prospect_first_name} ${prospect_last_name}`,
			prospect_job_title: prospect_job_title,
			prospect_industry: prospect_industry,
			prospect_headcount: prospect_headcount,
			prospect_important_notes: prospect_important_notes,
			prospect_pitched_campaigns: prospect_pitched_campaigns,
			prospect_company_name: prospect_company_name,
			prospect_phone_number: prospect_phone_number,
			prospect_email_address: prospect_email_address,
			prospect_website: prospect_website,
			prospect_frequency: prospect_frequency,
			prospect_other_services: prospect_other_services,
			prospect_date_submitted: prospect_date_submitted,
			prospect_function: prospect_function,
			prospect_location: prospect_location,
			prospect_linkedin_profile: prospect_linkedin_profile,
			prospect_onboarding_week: prospect_onboarding_week,
			prospect_last_updated: new Date()
		},
		where: {
			prospect_id: prospect_id
		}
	})
}

export async function delete_prospect({
	prospect_id
}) {
	return await prisma.prospects.delete({
		where: {
			prospect_id: prospect_id
		}
	})
}

export async function get_single_prospect({
	prospect_id: prospect_id
}) {
	return await prisma.prospects.findUnique({
		where: {
			prospect_id: prospect_id
		}
	})
}

export async function get_all_prospect() {
	const records = await prisma.prospects.findMany({
	})
	return records
}
