'use server'

import prisma from "@/app/api/lib/db"

export async function create_manager_account({
	manager_email: manager_email,
	manager_password_hash: manager_password_hash,
	manager_name: manager_name
}){
	return await prisma.salesManager.create({
		data: {
			manager_email: manager_email,
			manager_password_hash: manager_password_hash,
			manager_name: manager_name,
		}
	})
}

export async function login_manager({

}){

}