'use server'

import prisma from '@/app/api/lib/db'

export async function add_meeting({
	meetings_appointment_date: meetings_appointment_date,
	meetings_screenshot: meetings_screenshot,
	meetings_client_id: meetings_client_id, // foreign key
	meetings_prospect_id: meetings_prospect_id, // foregin key
	meetings_notes: meetings_notes,
	meetings_team: meetings_team,
	meetings_timezone: meetings_timezone,
	meetings_campaign: meetings_campaign,
}) {
	return await prisma.meetings.create({
		data: {
			meetings_timezone: meetings_timezone,
			meetings_appointment_date: meetings_appointment_date,
			meetings_client_id: meetings_client_id,
			meetings_prospect_id: meetings_prospect_id,
			meetings_notes: meetings_notes,
			meetings_team: meetings_team,
			meetings_campaign: Number( meetings_campaign ),
			meetings_screenshot: meetings_screenshot,
			meetings_value: 0,
			meetings_p4499_incentive: '499',
		}
	})
}

export async function edit_meeting({
	meeetings_id: meetings_id,
	meetings_client_id: meetings_client_id, // foreign key
	meetings_prospect_id: meetings_prospect_id, // foregin key
	meetings_notes: meetings_notes,
	meetings_appointment_date: meetings_appointment_date,
	meetings_team: meetings_team,
	meetings_timezone: meetings_timezone,
	meetings_campaign: meetings_campaign,
	meetings_screenshot: meetings_screenshot
}) {
	return await prisma.meetings.update({
		data: {
			meetings_client_id: meetings_client_id,
			meetings_prospect_id: meetings_prospect_id,
			meetings_team: meetings_team,
			meetings_notes: meetings_notes,
			meetings_timezone: meetings_timezone,
			meetings_campaign: meetings_campaign,
			meetings_appointment_date: meetings_appointment_date,
			meetings_screenshot: meetings_screenshot
		},
		where: {
			meetings_id: meetings_id
		}
	})
}

export async function delete_meeting({
	meetings_id: meetings_id
}) {
	return await prisma.meetings.delete({
		where: {
			meetings_id: meetings_id
		}
	})
}

export async function get_all_meeting(){
	return await prisma.meetings.findMany({
		include: {
			clients: true,
			prospects: true
		}
	})
}