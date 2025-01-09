'use server'

import prisma from '@/app/api/lib/db'

export async function add_sales_post({
    client_id: client_id
}) {
    return await prisma.salesPost.create({
        data: {
            sales_client_id: client_id,
        }
    })
}

export async function edit_sales_post({
    sales_post_id: sales_post_id,
    client_id: client_id
}) {
    return await prisma.salesPost.update({
        data: {
            sales_client_id: client_id,
        },
        where: {
            sales_post_id: sales_post_id
        }
    })
}

export async function delete_sales_post({
    sales_post_id: sales_post_id
} ) {
    return await prisma.salesPost.delete({
        where: {
            sales_post_id: sales_post_id
        }
    })
}

export async function get_all_sales_post(){
    return await prisma.salesPost.findMany({
        include: {
            clients: true
        },
    })
}
