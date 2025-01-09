'use server'

import prisma from '@/app/api/lib/db'

export async function get_proposals() {
    return await prisma.proposal.findMany({
        include: {
            clients: true,
            prospects: true,
            sales_manager: true
        }
    })
}

export async function get_approved_proposals() {
    return await prisma.proposal.findMany({
        include: {
            clients: true,
            prospects: true,
            sales_manager: true
        },
        where: {
            proposal_status: 'approved'
        }
    })
}

export async function add_proposal({
    proposal_prospect_paragraph: proposal_prospect_paragraph,
    proposal_client_id: proposal_client_id,
    proposal_manager_id: proposal_manager_id,
    proposal_client_second_email: proposal_client_second_email,
    proposal_prospect_id: proposal_prospect_id
}) {
    return await prisma.proposal.create({
        data: {
            proposal_prospect_paragraph: proposal_prospect_paragraph,
            proposal_client_id: proposal_client_id,
            proposal_manager_id: proposal_manager_id,
            proposal_prospect_id: proposal_prospect_id,
            proposal_client_second_email: proposal_client_second_email
        }
    })
}

export async function delete_proposal({
    proposal_id: proposal_id
}) {
    return await prisma.proposal.delete({
        where: {
            proposal_id: proposal_id
        }
    })
}

export async function edit_proposal({
    proposal_id: proposal_id,
    proposal_prospect_paragraph: proposal_prospect_paragraph,
    proposal_client_id: proposal_client_id,
    proposal_manager_id: proposal_manager_id,
    proposal_client_second_email: proposal_client_second_email,
    proposal_status: proposal_status = 'pending',
}) {
    return await prisma.proposal.update({
        where: {
            proposal_id: proposal_id
        },
        data: {
            proposal_prospect_paragraph: proposal_prospect_paragraph,
            proposal_client_id: proposal_client_id,
            proposal_manager_id: proposal_manager_id,
            proposal_client_second_email: proposal_client_second_email,
            proposal_status: proposal_status,
        }
    })
}