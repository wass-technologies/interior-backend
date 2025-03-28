import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailSubscriberDto } from './create-email-subscriber.dto';

export class UpdateEmailSubscriberDto extends PartialType(CreateEmailSubscriberDto) {}
