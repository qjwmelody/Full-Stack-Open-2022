import axios from 'axios'

const baseurl = 'http://localhost:3001/persons'

const sendData = (sendData) => {
    return axios.post(baseurl, sendData)
}

const deleteData = (deleteID) => {
    return axios.delete(`${baseurl}/${deleteID}`)
}

const updateData = (newData, updateID) => {
    return axios.put(`${baseurl}/${updateID}`, newData)
}

export default{sendData, deleteData, updateData}