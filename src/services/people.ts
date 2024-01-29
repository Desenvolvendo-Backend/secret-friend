import { PrismaClient ,Prisma } from "@prisma/client";
import * as events from '../services/events'
import * as groups from '../services/groups'

const prisma = new PrismaClient()

type GetAllFilters ={
    id_group?: number,
    id_event: number
}
export const getAll = async (filters : GetAllFilters) =>{
    try{
        return await prisma.enventPeople.findMany({ where: filters })
    }catch (err) {return false}
}

type GetOneFilters ={
    id?: number,
    id_event: number,
    id_group?: number,
    cpf?: string
}
export const getOne = async( filters: GetOneFilters) =>{
    try{
        if(!filters.id && !filters.cpf) return false
        return await prisma.enventPeople.findFirst({ where: filters})
    }catch (err) { return false}
}

type PersonCreateData = Prisma.Args<typeof prisma.enventPeople, 'create'>['data']
export const add = async (data: PersonCreateData ) => {
    try{
        if(!data.id_event || !data.id_group) return false

        const group = await groups.getOne({
            id: data.id_group,
            id_event: data.id_event
        })
        if(!group) return false

        const eventItem = await events.getOne(data.id_event)
        if(!eventItem) return false

        return await prisma.enventPeople.create({ data })

    }catch (err) { return false}
}

type UpdateFilters = {id?: number, id_event: number, id_group?:number}
type PeopleUpdateData = Prisma.Args<typeof prisma.enventPeople, 'update'>['data']
export const update = async (filters: UpdateFilters, data: PeopleUpdateData) => {
    try{
        return await prisma.enventPeople.updateMany({ where:filters, data})
    }catch (err) { return false}
}

type DeleteFilters = {id: number, id_event: number, id_group: number}
export const remove = async (filters: DeleteFilters) => {
    try{
        return await prisma.enventPeople.delete({ where: filters})

    }catch{ return false}
}