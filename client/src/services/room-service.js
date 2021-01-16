import axios from 'axios';

export default class RoomService{
    constructor(){
        this._apiBase = 'http://localhost:8000/api/rooms'
    }

    authHeader() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
          return { 'x-access-token': `Token ${user.token}`};
        } else {
          return {};
        }
    }

    async addRoom(room){
      return await axios.post(`${this._apiBase}/`, room, { headers: this.authHeader() });
    }
    
    async getRooms(){
      return await axios.get(`${this._apiBase}/`, { headers: this.authHeader() });
    }

    async deleteRoom(roomId){
      return await axios.delete(`${this._apiBase}/${roomId}/`, { headers: this.authHeader() });
    }

    async getRoom(roomId){
      return await axios.get(`${this._apiBase}/${roomId}`, { headers: this.authHeader() });
    }

    async addInvitedUser(roomId){
      return await axios.put(`${this._apiBase}/${roomId}/invite`, {}, { headers: this.authHeader() });
    }

    async addItem(roomId, item){
      return await axios.post(`${this._apiBase}/${roomId}/items`, item, { headers: this.authHeader() });
    }

    async deleteItem(roomId, itemId){
      return await axios.delete(`${this._apiBase}/${roomId}/items/${itemId}`, { headers: this.authHeader() });
    }
    
    async selectItem(roomId, itemId){
      return await axios.post(`${this._apiBase}/${roomId}/items/${itemId}/payee`, {}, { headers: this.authHeader() });
    }

    async unSelectItem(roomId, itemId){
      return await axios.delete(`${this._apiBase}/${roomId}/items/${itemId}/payee`, { headers: this.authHeader() });
    }

    async pay(roomId){
      return await axios.get(`${this._apiBase}/${roomId}/payment`, { headers: this.authHeader() });
    }

    async liqPay(){
      return await axios.post(`https://www.liqpay.ua/api/3/checkout`, {
          data: 'eyJhY3Rpb24iOiJwMnAiLCJhbW91bnQiOiIxIiwiY3VycmVuY3kiOiJVQUgiLCJkZXNjcmlwdGlvbiI6ImRlc2NyaXB0aW9uIHRleHQiLCJvcmRlcl9pZCI6Im9yZGVyX2lkXzEiLCJ2ZXJzaW9uIjoiMyIsInB1YmxpY19rZXkiOiJzYW5kYm94X2k2MjA1MjI1MzYzOSJ9',
          signature: 'qdhsIEDMd6mKNZ7ueXVIvpeH2Xg='
        });
    }
};