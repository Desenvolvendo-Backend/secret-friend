import { RequestHandler } from "express";
import * as people from '../services/people'
import { z } from "zod";

export const getAll: RequestHandler = async(req, res) =>{
    const { id_group, id_event } = req.params

    const items = await people.getAll({
        id_group: parseInt(id_group),
        id_event: parseInt(id_event)
    })

    if(items) return res.json({
        people: items
    })

    res.json({ error: 'Ocorreu um erro'})
}

export const getPerson: RequestHandler = async (req, res) =>{
    const { id_event, id_group, id } = req.params

    const personItem = await people.getOne({
        id_event: parseInt(id_event),
        id_group: parseInt(id_group),
        id: parseInt(id)
    })

    if(personItem) res.json({
        person: personItem
    })

    res.json({ error : 'Ocorreu um erro'})
}

export const addPerson: RequestHandler = async (req, res) =>{
    const { id_event , id_group} = req.params

    const addPersonSchema = z.object({
        name: z.string(),
        cpf: z.string().transform(val => val.replace(/\.|-/gm,""))
    })

    const body = addPersonSchema.safeParse(req.body)
    if(!body.success) return res.json({ error: "Dados inválidos"})

    const newPerson = await people.add({
        id_event: parseInt(id_event),
        id_group: parseInt(id_group),
        name: body.data.name,
        cpf: body.data.cpf,
    })
    
    if(newPerson) return res.status(201).json({ person: newPerson})
    res.json({ error: 'Ocorreu um erro'})
}

export const updatePerson: RequestHandler = async (req, res) =>{
    const {id, id_event, id_group} = req.params

    const updatePersonSchema = z.object({
        name: z.string().optional(),
        cpf: z.string().transform(val => val.replace(/\.|-/gm,"")).optional(),
        matched: z.string().optional()
    })

    const body = updatePersonSchema.safeParse(req.body)
    if(!body.success) return res.json({ eroor: 'Dados inválidos'})

    const updatePerson = await people.update({
        id: parseInt(id),
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    }, body.data)

    if(updatePerson){
        const personItem = await people.getOne({
            id: parseInt(id),
            id_event: parseInt(id_event)
        })
        return res.json({ person: personItem})
    } 

    res.json({ error: 'Ocorreu um erro'})

}

export const deletePerson: RequestHandler = async (req, res) =>{
    const { id, id_event, id_group } = req.params

    const deletedPerson = await people.remove({
        id: parseInt(id),
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    })

    if(deletedPerson) return res.json({ person: deletedPerson})

    res.json({ error: 'Ocorreu um erro'})

}