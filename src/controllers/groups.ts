import { RequestHandler } from "express";
import * as groups from '../services/groups'

export const getAll : RequestHandler = async (req, res) =>{
    const { id_event } = req.params

    const items = await groups.getAll(parseInt(id_event))
    if(items) return res.json({ groups: items})

    res.json({ error: 'Ocorreu um erro'})

}

export const getGroup : RequestHandler = async (req, res) =>{
    const { id, id_event } = req.params

    const group = await groups.getOne({
        id: parseInt(id),
        id_event: parseInt(id_event)
    })

    if(group) return res.json({ group: group})

    res.json({ error: 'Ocorreu um erro'})
}