import axios from "axios";

const API = process.env.REACT_APP_API_BASE_URL;

export const forumAdminController = {
  async getAllPosts(setLoading) {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/admin/forum`, {
        withCredentials: true,
      });
      return res.data;
    } finally {
      setLoading(false);
    }
  },

  async getPostDetail(id) {
    const res = await axios.get(`${API}/admin/forum/${id}`, {
      withCredentials: true,
    });
    return res.data;
  },

  async approvePost(id) {
    return axios.patch(`${API}/admin/forum/${id}/approve`, {}, {
      withCredentials: true,
    });
  },

  async rejectPost(id) {
    return axios.patch(`${API}/admin/forum/${id}/reject`, {}, {
      withCredentials: true,
    });
  },
};
