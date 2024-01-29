import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAll = async ( id_event:number ) =>{
    try{
        return await prisma.eventGroup.findMany({ where: { id_event }})
    }catch{
        return false;
    }
}

type GetOneFilters = {id: number; id_event?:number }
export const getOne = async (filters: GetOneFilters) =>{
    try{
        return await prisma.eventGroup.findFirst({ where: filters})
    }catch{ return false}
}