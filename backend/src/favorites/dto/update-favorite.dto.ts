import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto'; // ✅ คราวนี้จะไม่แดงแล้ว

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {}