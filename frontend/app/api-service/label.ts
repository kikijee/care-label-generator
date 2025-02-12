import axios from 'axios';


const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const labelAxios = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    "withCredentials": true 
});

export async function get_labels_by_user_id() {
    try {
        const response = await labelAxios.get('/api/label/get-user-labels');
        return response;
    } catch (error: any) {
        console.error("Error during label retrieval:", error);
        return error.response;
    }
}

export async function save_label(body: any) {
    try {
        const response = await labelAxios.post('/api/label',body);
        return response;
    } catch (error: any) {
        console.error("Error during label creation:", error);
        return error.response;
    }
}

export async function update_label(body: any, id: number) {
    try {
        const response = await labelAxios.put(`/api/label/${id}`,body);
        return response;
    } catch (error: any) {
        console.error("Error during label update:", error);
        return error.response;
    }
}

export async function get_label_by_id(id: number) {
    try {
        const response = await labelAxios.get(`/api/label/${id}`);
        return response;
    } catch (error: any) {
        console.error("Error during label get:", error);
        return error.response;
    }
}

export async function delete_label(id: number) {
    try {
        const response = await labelAxios.delete(`/api/label/${id}`);
        return response;
    } catch (error: any) {
        console.error("Error during label deletion:", error);
        return error.response;
    }
}

export async function upload_logo(formData: FormData, labelId: number) {
    try {
        const response = await labelAxios.post(`/api/label/upload-logo/${labelId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error: any) {
        console.error("Error during logo upload:", error);
        return error.response;
    }
}

export async function remove_logo(labelId: number) {
    try {
        const response = await labelAxios.patch(`/api/label/remove-logo/${labelId}`);
        return response;
    } catch (error: any) {
        console.error("Error during label removal:", error);
        return error.response;
    }
}
