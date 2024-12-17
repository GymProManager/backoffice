import {  Imagens } from '../entities/Imagens';
import { MediaImageRepository } from '../interfaces/MediaImageRepository';

export class MediaImageUseCases {
  constructor(private mediaImageRepository: MediaImageRepository) {}

  uploadImage(type: string, id: string, images: Imagens): Promise<void> {
    return this.mediaImageRepository.upload(type, id, images);
  }
}
