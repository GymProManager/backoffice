import { Imagens } from '../entities/Imagens';

export interface MediaImageRepository {
     upload(type: string, id: string, images: Imagens): Promise<void>;
}

