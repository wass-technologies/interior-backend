import { Account } from "src/account/entities/account.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Setting {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ type: 'uuid', nullable: true })
    accountId:string

    @Column({ type: 'varchar', length: 255, nullable: true })
    fbLink: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    twLink: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    instaLink: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    linkdinLink: string;
    
    @Column({ type: 'text', nullable: true })
    file: string;
  
    @Column({ type: 'text', nullable: true })
    fileName: string;

    @ManyToOne(() => Account, (admin) => admin.settings)
    account: Account;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
