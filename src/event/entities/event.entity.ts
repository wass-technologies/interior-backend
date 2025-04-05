import { Account } from "src/account/entities/account.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: true })
    accountId:string

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'date' })
    eventDate: Date;

    @Column({ type: 'varchar', length: 50 })
    month: string;

    @Column({ type: 'int' })
    day: number;
    
    @Column({ type: 'text', nullable: true })
    image: string;
  
    @Column({ type: 'text', nullable: true })
    imagePath: string;

    @ManyToOne(() => Account, (account) => account.events, { onDelete: 'CASCADE' })
    account: Account;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
