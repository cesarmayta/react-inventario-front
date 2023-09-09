import axios from 'axios'
import { API_URL } from '../lib/Enviroments'

class AlmacenService{

    constructor(){
        this.table_name = 'almacen/'
    }
    
    getAll(){
        return axios.get(API_URL+"/"+this.table_name)
        .then(res=>{
            return res.data;
        })
    }

    setNew(data){
        return axios.post(API_URL+"/"+this.table_name,data)
        .then(res=>{
            return res.data;
        })
    }

    getOne(id){
        return axios.get(API_URL+"/"+this.table_name+id+'/')
        .then(res=>{
            return res.data;
        })
    }

    updateOne(id,data){
        return axios.put(API_URL+"/"+this.table_name+id+'/',data)
        .then(res=>{
            return res.data;
        })
    }

    deleteOne(id){
        return axios.delete(API_URL+"/"+this.table_name+id+'/')
        .then(res=>{
            return res.status
        })
    }

}

export default new AlmacenService();