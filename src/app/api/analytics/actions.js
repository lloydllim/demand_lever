'use server'

import prisma from '@/app/api/lib/db'
import { getSessionUser } from "@/app/api/auth/actions";

export async function updateOrCreateAnalytics(dateObj) {
    const user_data = await getSessionUser()

    // Format the date to "YYYY-MM-DD"
    const formattedDate = dateObj.toISOString().split('T')[0];

    // Check if a record with the given date exists
    let existingRecord = await prisma.$queryRaw`
      SELECT * 
      FROM "Analytics" 
      WHERE "analytics_user" = ${user_data.user_id} 
      AND DATE("analytics_created_at") = CAST(${formattedDate} AS DATE)
    `;

    if (existingRecord.length != 0) {
        existingRecord = existingRecord[0]
        // If the record exists, increment the analytics_count
        console.info('record existed ?? ', existingRecord)
        await prisma.analytics.update({
            where: {
                analytics_id: existingRecord.analytics_id,
                analytics_user: user_data.user_id
            },
            data: { analytics_count: { increment: 1 } },
        });
        console.log('Record updated: analytics_count incremented by 1.');
    } else {
        // If the record does not exist, create a new one with analytics_count = 0
        await prisma.analytics.create({
            data: {
                analytics_date: formattedDate,
                analytics_user: user_data.user_id,
                analytics_count: 1,
            },
        });
        console.log('New record created with analytics_count = 0.');
    }

}


export async function add_analytics({
    analytics_user, // foreign key
    analytics_date,
    analytics_present,

}) {
}

export async function edit_analytics({
    analytics_user,
    analytics_date,
    analytics_present,

}) {
}

export async function get_analytics(dateObj) {
    const user_data = await getSessionUser()
    const formattedDate = dateObj.toISOString().split('T')[0];


    let existingRecord = await prisma.$queryRaw`
    SELECT * 
    FROM "Analytics" 
    WHERE "analytics_user" = ${user_data.user_id} 
    AND DATE("analytics_created_at") = CAST(${formattedDate} AS DATE)
  `;

return existingRecord[0]

}

export async function is_analytics_exist({
    analytics_user: analytics_user,
    analytics_date: analytics_date
}) {

    const formattedDate = dateObj.toISOString().split('T')[0];

    // Check if a record with the given date exists
    let existingRecord = await prisma.$queryRaw`
  SELECT * 
  FROM "Analytics" 
  WHERE "analytics_user" = ${user_data.user_id} 
  AND DATE("analytics_created_at") = CAST(${formattedDate} AS DATE)
`;
}