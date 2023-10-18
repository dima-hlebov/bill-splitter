import axios from 'axios';

export default class RoomService {
  authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { 'x-access-token': `Token ${user.token}` };
    } else {
      return {};
    }
  }

  async addRoom(room) {
    return await axios.post(`${process.env.REACT_APP_API_BASE}/rooms/`, room, { headers: this.authHeader() });
  }

  async getRooms() {
    return await axios.get(`${process.env.REACT_APP_API_BASE}/rooms/`, { headers: this.authHeader() });
  }

  async deleteRoom(roomId) {
    return await axios.delete(`${process.env.REACT_APP_API_BASE}/rooms/${roomId}/`, { headers: this.authHeader() });
  }

  async getRoom(roomId) {
    return await axios.get(`${process.env.REACT_APP_API_BASE}/rooms/${roomId}`, { headers: this.authHeader() });
  }

  async addInvitedUser(roomId) {
    return await axios.put(`${process.env.REACT_APP_API_BASE}/rooms/${roomId}/invite`, {}, { headers: this.authHeader() });
  }

  async addItem(roomId, item) {
    return await axios.post(`${process.env.REACT_APP_API_BASE}/rooms/${roomId}/items`, item, { headers: this.authHeader() });
  }

  async deleteItem(roomId, itemId) {
    return await axios.delete(`${process.env.REACT_APP_API_BASE}/rooms/${roomId}/items/${itemId}`, { headers: this.authHeader() });
  }

  async selectItem(roomId, itemId) {
    return await axios.post(`${process.env.REACT_APP_API_BASE}/rooms/${roomId}/items/${itemId}/payee`, {}, { headers: this.authHeader() });
  }

  async unSelectItem(roomId, itemId) {
    return await axios.delete(`${process.env.REACT_APP_API_BASE}/rooms/${roomId}/items/${itemId}/payee`, { headers: this.authHeader() });
  }

  async pay(roomId, isPaid) {
    return await axios.put(`${process.env.REACT_APP_API_BASE}/rooms/${roomId}/payment`, { isSplitterPaid: isPaid }, { headers: this.authHeader() });
  }

};