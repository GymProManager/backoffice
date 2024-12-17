import axios from 'axios'; 
import { MediaImageRepository } from '@/core/interfaces/MediaImageRepository';
import {  Imagens } from '@/core/entities/Imagens';
import { CONFIG } from '@/Config';

export class ApiMediaRepository implements MediaImageRepository {
    async upload( entity: string, id: string, _images: Imagens): Promise<void> {
        const formData = new FormData();
        formData.append("type", entity);
        formData.append("image", _images.miniature);
        formData.append("miniature", _images.miniature);
        formData.append("cover", _images.cover);

        if (id === '') {
            await axios.post(`${CONFIG.API_URL}/media`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }});
        } else {
            await axios.put(`${CONFIG.API_URL}/media/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }});
        }
    }
 }