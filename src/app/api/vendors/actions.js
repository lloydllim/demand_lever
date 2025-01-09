'use server'

import prisma from '@/app/api/lib/db'

export async function add_vendor({
	client_full_name: client_full_name,
	client_company_name: client_company_name,
	client_phone_number: client_phone_number,
	client_email: client_email,
	client_company_website: client_company_website,
	client_calendly: client_calendly,
	client_preferred_job_titles: client_preferred_job_titles,
	client_preferences: client_preferences,
	client_linkedin_profile: client_linkedin_profile,
	client_value_proposition: client_value_proposition,
	client_industry: client_industry,
	client_personal_email: client_personal_email,
	client_password_hash: client_password_hash,
	client_referral_for: client_referral_for
}) {
	return await prisma.clients.create({
		data: {
			client_full_name: client_full_name,
			client_company_name: client_company_name,
			client_email: client_email,
			client_phone_number: client_phone_number,
			client_company_website: client_company_website,
			client_calendly: client_calendly,
			client_value_proposition: client_value_proposition,
			client_preferred_job_titles: client_preferred_job_titles,
			client_preferences: client_preferences,
			client_linkedin_profile: client_linkedin_profile,
			client_industry: client_industry,
			client_personal_email: client_personal_email,
			client_password_hash: client_password_hash,
			client_referral_for: Number( client_referral_for )
		}
	})
}

export async function edit_vendor({
	client_full_name: client_full_name,
	client_company_name: client_company_name,
	client_phone_number: client_phone_number,
	client_email: client_email,
	client_company_website: client_company_website,
	client_calendly: client_calendly,
	client_preferred_job_titles: client_preferred_job_titles,
	client_preferences: client_preferences,
	client_linkedin_profile: client_linkedin_profile,
	client_value_proposition: client_value_proposition,
	client_industry: client_industry,
	client_id: client_id,
	client_referral_for: client_referral_for,
}) {
	return await prisma.clients.update({
		data: {
			client_full_name: client_full_name,
			client_company_name: client_company_name,
			client_email: client_email,
			client_phone_number: client_phone_number,
			client_company_website: client_company_website,
			client_calendly: client_calendly,
			client_preferred_job_titles: client_preferred_job_titles,
			client_preferences: client_preferences,
			client_value_proposition: client_value_proposition,
			client_linkedin_profile: client_linkedin_profile,
			client_industry: client_industry,
			client_referral_for: Number( client_referral_for ),
		},
		where: {
			client_id: client_id
		}
	})
}

export async function delete_vendor({
	client_id
}) {
	return await prisma.clients.delete({
		where: {
			client_id: client_id
		}
	})
}
export async function get_single_vendor({
	client_id: client_id
}) {
	return await prisma.clients.findUnique({
		where: {
			client_id: client_id
		}
	})
}

export async function get_all_vendor() {
	return await prisma.clients.findMany()
}